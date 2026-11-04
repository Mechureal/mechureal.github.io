import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
const background = await sharp(await readFile('public/images/city-grid.svg')).resize(1200, 630).png().toBuffer();
const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#101217" opacity=".7"/><g font-family="Arial, sans-serif"><text x="80" y="135" font-size="26" fill="#b7c6de" letter-spacing="5">MECHUREAL</text><text x="75" y="280" font-size="84" font-weight="bold" fill="#f2f4f8">BROKE RIDER</text><text x="75" y="375" font-size="84" font-weight="bold" fill="#79a6ff">SIMULATOR</text><text x="80" y="490" font-size="24" fill="#c0cad9">IN DEVELOPMENT / WINDOWS + macOS</text><text x="80" y="565" font-size="15" fill="#a9b1c0">CONCEPT GRAPHIC / NOT AN IN-GAME SCREENSHOT</text></g></svg>`);
await sharp(background).composite([{ input: overlay }]).png().toFile('public/images/social.png');
