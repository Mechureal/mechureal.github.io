import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
const background = await sharp(await readFile('public/images/city-grid.svg')).resize(1200, 630).png().toBuffer();
const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#18151a" opacity=".83"/><rect x="70" y="68" width="8" height="34" fill="#f0b8dc"/><g font-family="Arial, sans-serif"><text x="95" y="95" font-size="22" font-weight="bold" fill="#f6dbec" letter-spacing="4">MECHUREAL / INDEPENDENT GAME STUDIO</text><text x="75" y="275" font-size="72" font-weight="bold" fill="#f8e4c6">SMALL EGG.</text><text x="75" y="365" font-size="72" font-weight="bold" fill="#f0b8dc">BIG WORLDS.</text><text x="80" y="480" font-size="24" fill="#e2c9d8">Games from the everyday.</text></g></svg>`);
const egg = await sharp('public/images/mechureal-egg.png').resize(300, 300, { kernel: 'nearest' }).png().toBuffer();
await sharp(background).composite([{ input: overlay }, { input: egg, left: 820, top: 180 }]).png().toFile('public/images/social.png');
