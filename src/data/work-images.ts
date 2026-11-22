import type { Work } from './works';
import { withBase } from '../i18n/utils';

export const SMALL_PREVIEW_WIDTH = 480;
export const THUMB_WIDTH = 1100;

export function previewImage(work: Work) {
  const src = withBase(work.thumb);
  const small = src.replace(/-thumb\.webp$/, `-${SMALL_PREVIEW_WIDTH}.webp`);
  return { src: small, srcset: `${small} ${SMALL_PREVIEW_WIDTH}w, ${src} ${THUMB_WIDTH}w` };
}

export function fullImage(work: Work) {
  const preview = previewImage(work);
  const sources = [preview.srcset];
  if (work.width > 1600) sources.push(`${withBase(work.image.replace(/\.webp$/, '-1600.webp'))} 1600w`);
  if (work.width > THUMB_WIDTH) sources.push(`${withBase(work.image)} ${work.width}w`);
  return { src: withBase(work.thumb), srcset: sources.join(', ') };
}
