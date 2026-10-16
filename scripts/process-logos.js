import sharp from 'sharp';

async function processLogos() {
  console.log('Processing logos...');

  // 1. EEC Logo (Crop 40px top/bottom to remove screenshot gray borders, transparent background)
  {
    const img = sharp('public/brands/eec-education.jpg');
    // Crop borders
    const cropped = await img
      .extract({ left: 10, top: 40, width: 620, height: 560 })
      .toBuffer();

    const { data, info } = await sharp(cropped)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const rawData = Buffer.from(data);
    const whiteData = Buffer.from(data);

    for (let i = 0; i < rawData.length; i += 4) {
      const r = rawData[i];
      const g = rawData[i + 1];
      const b = rawData[i + 2];

      // White/near-white detection
      const brightness = (r + g + b) / 3;
      const isWhite = r > 220 && g > 220 && b > 220;

      if (isWhite) {
        rawData[i + 3] = 0; // Transparent
        whiteData[i + 3] = 0;
      } else {
        // Semi-transparent edge blending
        if (r > 190 && g > 190 && b > 190) {
          const alpha = Math.max(0, 255 - (brightness - 190) * 4);
          rawData[i + 3] = Math.min(rawData[i + 3], alpha);
          whiteData[i + 3] = Math.min(whiteData[i + 3], alpha);
        }
        // White version
        whiteData[i] = 255;
        whiteData[i + 1] = 255;
        whiteData[i + 2] = 255;
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

    console.log('✓ EEC processed');
  }

  // 2. Platinum Fiberglass
  {
    const { data, info } = await sharp('public/brands/platinum-fiberglass.jpg')
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const rawData = Buffer.from(data);
    const whiteData = Buffer.from(data);

    for (let i = 0; i < rawData.length; i += 4) {
      const r = rawData[i];
      const g = rawData[i + 1];
      const b = rawData[i + 2];

      // Green background detection: g is higher than r and b, or r and b are low
      const isGold = (r > 130 && g > 100 && b < 100) || (r > 170 && g > 140);
      
      if (!isGold) {
        rawData[i + 3] = 0;
        whiteData[i + 3] = 0;
      } else {
        // preserve gold
        whiteData[i] = 255;
        whiteData[i + 1] = 255;
        whiteData[i + 2] = 255;
      }
    }

    await sharp(rawData, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .trim()
      .png()
      .toFile('public/brands/platinum-clean.png');

    await sharp(whiteData, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .trim()
      .png()
      .toFile('public/brands/platinum-white.png');

    console.log('✓ Platinum Fiberglass processed');
  }

  // 3. Lifetime Properties
  {
    const { data, info } = await sharp('public/brands/lifetime-properties.jpg')
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const rawData = Buffer.from(data);
    const whiteData = Buffer.from(data);

    for (let i = 0; i < rawData.length; i += 4) {
      const r = rawData[i];
      const g = rawData[i + 1];
      const b = rawData[i + 2];

      const brightness = (r + g + b) / 3;
      const isWhite = r > 225 && g > 225 && b > 225;

      if (isWhite) {
        rawData[i + 3] = 0;
        whiteData[i + 3] = 0;
      } else {
        if (r > 180 && g > 180 && b > 180) {
          const alpha = Math.max(0, 255 - (brightness - 180) * 4);
          rawData[i + 3] = Math.min(rawData[i + 3], alpha);
          whiteData[i + 3] = Math.min(whiteData[i + 3], alpha);
        }
        whiteData[i] = 255;
        whiteData[i + 1] = 255;
        whiteData[i + 2] = 255;
      }
    }

    await sharp(rawData, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .trim()
      .png()
      .toFile('public/brands/lifetime-clean.png');

    await sharp(whiteData, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .trim()
      .png()
      .toFile('public/brands/lifetime-white.png');

    console.log('✓ Lifetime Properties processed');
  }

  // 4. QATOL Lubricants
  {
    const { data, info } = await sharp('public/brands/qatol-lubricants.jpg')
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const rawData = Buffer.from(data);
    const whiteData = Buffer.from(data);

    for (let i = 0; i < rawData.length; i += 4) {
      const r = rawData[i];
      const g = rawData[i + 1];
      const b = rawData[i + 2];

      const isWhite = r > 225 && g > 225 && b > 225;

      if (isWhite) {
        rawData[i + 3] = 0;
        whiteData[i + 3] = 0;
      } else {
        // Check if it's the black text "LUBRICANTS" (r,g,b all low)
        const isBlack = r < 90 && g < 90 && b < 90;
        if (isBlack) {
          // Make LUBRICANTS text white so it's readable on dark background!
          rawData[i] = 255;
          rawData[i + 1] = 255;
          rawData[i + 2] = 255;
        }

        whiteData[i] = 255;
        whiteData[i + 1] = 255;
        whiteData[i + 2] = 255;
      }
    }

    await sharp(rawData, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .trim()
      .png()
      .toFile('public/brands/qatol-clean.png');

    await sharp(whiteData, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .trim()
      .png()
      .toFile('public/brands/qatol-white.png');

    console.log('✓ QATOL Lubricants processed');
  }

  console.log('All brand logos successfully processed into transparent PNGs!');
}

processLogos().catch(console.error);
