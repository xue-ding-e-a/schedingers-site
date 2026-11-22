export function preferLightMotion() {
  const { connection } = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  return /MicroMessenger/i.test(navigator.userAgent) ||
    matchMedia('(pointer: coarse), (max-width: 760px)').matches ||
    !!(connection?.saveData || /^(slow-2g|2g|3g)$/.test(connection?.effectiveType ?? ''));
}
