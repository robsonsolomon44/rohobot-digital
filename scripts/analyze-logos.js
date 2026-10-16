import sharp from 'sharp';
import fs from 'fs';

async function analyze() {
  const files = [
    'public/brands/eec-education.jpg',
    'public/brands/platinum-fiberglass.jpg',
    'public/brands/lifetime-properties.jpg',
    'public/brands/qatol-lubricants.jpg',
  ];

  for (const file of files) {
    const meta = await sharp(file).metadata();
    console.log(`${file}: ${meta.width}x${meta.height}, format: ${meta.format}`);
  }
}

analyze().catch(console.error);
