import sharp from 'sharp';

async function perfectEEC() {
  const { data, info } = await sharp('public/brands/eec-education.jpg')
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rawData = Buffer.from(data);
  const whiteData = Buffer.from(data);

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * 4;
      const r = rawData[idx];
      const g = rawData[idx + 1];
      const b = rawData[idx + 2];

      // Remove top and bottom borders (y < 45 or y > 595) or side borders (x < 15 or x > 625)
      if (y < 45 || y > 595 || x < 15 || x > 625) {
        rawData[idx + 3] = 0;
        whiteData[idx + 3] = 0;
        continue;
      }

      // Check if it's the gray line or near-white
      const isGrayBorder = Math.abs(r - g) < 10 && Math.abs(g - b) < 10 && r < 180 && (y < 60 || y > 580);
      const isWhite = r > 215 && g > 215 && b > 215;

      if (isGrayBorder || isWhite) {
        rawData[idx + 3] = 0;
        whiteData[idx + 3] = 0;
      } else {
        whiteData[idx] = 255;
        whiteData[idx + 1] = 255;
        whiteData[idx + 2] = 255;
      }
    }
  }

  await sharp(rawData, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim()
    .png()
    .toFile('public/brands/eec-clean.png');

  await sharp(whiteData, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim()
    .png()
    .toFile('public/brands/eec-white.png');

  console.log('✓ Perfected EEC logo');
}

perfectEEC().catch(console.error);
