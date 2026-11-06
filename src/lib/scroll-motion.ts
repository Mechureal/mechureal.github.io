export function cityMotion(top: number, height: number, viewport: number, header: number) {
 const progress = Math.max(0, Math.min(1, (header - top) / Math.max(1, height - viewport + header)));
 return { far: progress * viewport * .1, near: progress * viewport * .025, rider: -progress * viewport * .035, title: 1 - progress * .9 };
}
