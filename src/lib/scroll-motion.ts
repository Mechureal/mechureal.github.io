export function cityMotion(top: number, height: number, header: number) {
 const distance = Math.max(1, height);
 const progress = Math.max(0, Math.min(1, (header - top) / distance));
 const street = -progress * distance * .16;
 return { far: progress * distance * .68, middle: progress * distance * .35, near: street, rider: street, title: 1 - progress * .8 };
}
