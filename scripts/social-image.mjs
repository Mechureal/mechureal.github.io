import sharp from 'sharp';

const width = 1200;
const height = 630;
const pink = '#fbe2f2';
const logo = await sharp('public/images/mechureal-egg.png')
  .resize(420, 420, { kernel: 'nearest' })
  .png()
  .toBuffer();

await sharp({
  create: {
    width,
    height,
    channels: 3,
    background: pink,
  },
})
  .composite([{ input: logo, left: 390, top: 105 }])
  .png()
  .toFile('public/images/social.png');
