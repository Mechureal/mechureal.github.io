export function cityMotion(top: number, height: number, header: number) {
 const distance = Math.max(1, height);
 const progress = Math.max(0, Math.min(1, (header - top) / distance));
 return { far: progress * distance * .16, near: progress * distance * .045, rider: -progress * distance * .015, title: 1 - progress * .8 };
}
