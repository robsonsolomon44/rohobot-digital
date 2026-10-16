import sharp from 'sharp';

async function processNewLogos() {
  console.log('Processing 3 new brand logos...');

  // 1. Bosphorus Cosmetology and Skin Care School
  {
    const { data, info } = await sharp('public/brands/bosphorus-school.png')
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const cleanData = Buffer.from(data);
    const whiteData = Buffer.from(data);

    for (let i = 0; i < cleanData.length; i += 4) {
      const r = cleanData[i];
      const g = cleanData[i + 1];
      const b = cleanData[i + 2];

      const isWhite = r > 225 && g > 225 && b > 225;

      if (isWhite) {
        cleanData[i + 3] = 0;
        whiteData[i + 3] = 0;
      } else {
        // Bosphorus original is black text. On dark theme, black text is invisible, so make it crisp white or gold-tinted white
        cleanData[i] = 245;
        cleanData[i + 1] = 240;
        cleanData[i + 2] = 230;

        whiteData[i] = 255;
        whiteData[i + 1] = 255;
        whiteData[i + 2] = 255;
      }
    }

    await sharp(cleanData, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .trim()
      .png()
      .toFile('public/brands/bosphorus-clean.png');

    await sharp(whiteData, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .trim()
      .png()
      .toFile('public/brands/bosphorus-white.png');

    console.log('✓ Bosphorus School processed');
  }

  // 2. BlueFlag Security
  {
    const { data, info } = await sharp('public/brands/blueflag-security.jpg')
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const cleanData = Buffer.from(data);
    const whiteData = Buffer.from(data);

    for (let i = 0; i < cleanData.length; i += 4) {
      const r = cleanData[i];
      const g = cleanData[i + 1];
      const b = cleanData[i + 2];

      const isWhite = r > 225 && g > 225 && b > 225;

      if (isWhite) {
        cleanData[i + 3] = 0;
        whiteData[i + 3] = 0;
      } else {
        // Smooth alpha falloff for white edges
        if (r > 190 && g > 190 && b > 190) {
          const brightness = (r + g + b) / 3;
          const alpha = Math.max(0, 255 - (brightness - 190) * 4);
          cleanData[i + 3] = Math.min(cleanData[i + 3], alpha);
          whiteData[i + 3] = Math.min(whiteData[i + 3], alpha);
        }

        // For cleanData, if it's the dark navy text "Blue" and "SECURITY", brighten it slightly so it pops on dark background
        if (r < 60 && g < 70 && b < 120) {
          cleanData[i] = Math.min(255, r + 50);
          cleanData[i + 1] = Math.min(255, g + 80);
          cleanData[i + 2] = Math.min(255, b + 140);
        }

        whiteData[i] = 255;
        whiteData[i + 1] = 255;
        whiteData[i + 2] = 255;
      }
    }

    await sharp(cleanData, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .trim()
      .png()
      .toFile('public/brands/blueflag-clean.png');

    await sharp(whiteData, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .trim()
      .png()
      .toFile('public/brands/blueflag-white.png');

    console.log('✓ BlueFlag Security processed');
  }

  // 3. Deluxe Interiors
  {
    const { data, info } = await sharp('public/brands/deluxe-interiors.jpg')
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const cleanData = Buffer.from(data);
    const whiteData = Buffer.from(data);

    for (let i = 0; i < cleanData.length; i += 4) {
      const r = cleanData[i];
      const g = cleanData[i + 1];
      const b = cleanData[i + 2];

      // Black background detection
      const isBlack = r < 40 && g < 40 && b < 40;

      if (isBlack) {
        cleanData[i + 3] = 0;
        whiteData[i + 3] = 0;
      } else {
        whiteData[i] = 255;
        whiteData[i + 1] = 255;
        whiteData[i + 2] = 255;
      }
    }

    await sharp(cleanData, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .trim()
      .png()
      .toFile('public/brands/deluxe-clean.png');

    await sharp(whiteData, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .trim()
      .png()
      .toFile('public/brands/deluxe-white.png');

    console.log('✓ Deluxe Interiors processed');
  }

  console.log('All 3 new brand logos successfully processed!');
}

processNewLogos().catch(console.error);
