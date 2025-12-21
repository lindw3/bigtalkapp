import sharp from 'sharp';

const sizes = [192, 512, 180];

sizes.forEach(async size => {
  await sharp('src/assets/bta_logotype.svg')
    .resize(size, size)
    .png()
    .toFile(`public/icons/icon-${size}.png`);
  console.log(`icon-${size}.png created`);
});
