export function cityMotion(top: number, height: number, header: number) {
 const distance = Math.max(1, height);
 const progress = Math.max(0, Math.min(1, (header - top) / distance));
 return { far: progress * distance * .68, middle: progress * distance * .35, near: -progress * distance * .16, rider: -progress * distance * .28, title: 1 - progress * .8 };
}
