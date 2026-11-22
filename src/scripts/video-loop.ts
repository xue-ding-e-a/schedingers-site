// The fragmented MP4 contains one cycle with an opening keyframe (avc1 High@4.2).
const loopType = 'video/mp4; codecs="avc1.64002a"';
const secondsToKeep = 4;
const secondsToBuffer = 4;

export function attachVideoLoop(
  video: HTMLVideoElement,
  sourceUrl: string,
  onInterrupted: (file?: Blob) => void,
): boolean {
  const { ManagedMediaSource, MediaSource } = window as Window & typeof globalThis & {
    ManagedMediaSource?: typeof MediaSource;
  };
  const Source = MediaSource?.isTypeSupported(loopType) ? MediaSource : ManagedMediaSource;
  if (!Source?.isTypeSupported(loopType)) return false;

  const mediaSource = new Source();
  const url = URL.createObjectURL(mediaSource);
  const listeners = new AbortController();
  const { signal } = listeners;
  const useManagedSource = Source === ManagedMediaSource;
  const remotePlaybackWasDisabled = video.disableRemotePlayback;
  let buffer: SourceBuffer | undefined;
  let file: Blob | undefined;
  let segment: ArrayBuffer | undefined;
  const openTimeout = window.setTimeout(fallback, 2500);

  function fallback() {
    if (signal.aborted) return;
    clearTimeout(openTimeout);
    listeners.abort();
    URL.revokeObjectURL(url);
    if (useManagedSource) video.disableRemotePlayback = remotePlaybackWasDisabled;
    if (video.getAttribute('src') === url) onInterrupted(file);
  }

  function fillBuffer() {
    if (!segment || !buffer || buffer.updating || mediaSource.readyState !== 'open') return;
    try {
      const time = video.currentTime;
      const ranges = buffer.buffered;
      if (ranges.length && time - ranges.start(0) > secondsToKeep * 2) {
        buffer.remove(0, time - secondsToKeep);
      } else if (!ranges.length || ranges.end(ranges.length - 1) - time < secondsToBuffer) {
        buffer.appendBuffer(segment);
      }
    } catch {
      fallback();
    }
  }

  mediaSource.addEventListener('sourceopen', () => {
    clearTimeout(openTimeout);
    URL.revokeObjectURL(url);
    try {
      const cycleBuffer = mediaSource.addSourceBuffer(loopType);
      // Append each copy immediately after the previous one to avoid a seek.
      cycleBuffer.mode = 'sequence';
      cycleBuffer.addEventListener('error', fallback, { signal });
      cycleBuffer.addEventListener('updateend', fillBuffer, { signal });
      buffer = cycleBuffer;
      fillBuffer();
    } catch {
      fallback();
    }
  }, { once: true, signal });
  mediaSource.addEventListener('sourceclose', fallback, { signal });
  if (useManagedSource) mediaSource.addEventListener('startstreaming', fillBuffer, { signal });
  for (const event of ['timeupdate', 'waiting']) {
    video.addEventListener(event, fillBuffer, { signal });
  }
  video.addEventListener('error', fallback, { signal });
  // Managed Media Source requires a local-only video or an AirPlay source.
  if (useManagedSource) video.disableRemotePlayback = true;
  // Attach synchronously so a click can still authorize video.play().
  video.loop = false;
  video.src = url;

  void fetch(sourceUrl, { cache: 'force-cache', signal }).then(async (response) => {
    if (!response.ok) throw new Error(`Video request failed (${response.status})`);
    file = await response.blob();
    segment = await file.arrayBuffer();
    fillBuffer();
  }).catch(fallback);
  return true;
}
