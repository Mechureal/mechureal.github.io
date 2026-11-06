export const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function eggProgress(top: number, height: number, viewport: number, header: number) {
  return clamp((header - top) / Math.max(1, height - viewport + header));
}

export function scooterProgress(top: number, height: number, viewport: number) {
  return clamp((viewport * .2 - top) / Math.max(1, height - viewport * .6));
}
