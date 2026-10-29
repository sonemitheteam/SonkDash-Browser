import sharp from 'sharp';

async function perfectCutout() {
  // 1. Process Name Logotype
  // Trim top 8px where the blue cloud artifact was, and make any non-red/blue background pixels transparent
  const namePath = './public/assets/aistudio/image_a3427cb9.png';
  const nameImg = sharp(namePath);
  const nameMeta = await nameImg.metadata();

  // Extract raw
  const { data: nameRaw, info: nInfo } = await nameImg
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let y = 0; y < nInfo.height; y++) {
    for (let x = 0; x < nInfo.width; x++) {
      const idx = (y * nInfo.width + x) * 4;
      const r = nameRaw[idx];
      const g = nameRaw[idx + 1];
      const b = nameRaw[idx + 2];

      // If top 9 pixels, remove the cyan blur cloud
      if (y < 9) {
        nameRaw[idx + 3] = 0;
        continue;
      }

      // Check if it's the actual letter pixel:
      // Blue letters 'Sonk': strong blue (b > 130 and b > r + 30)
      // Red letters 'Dash': strong red (r > 130 and r > b + 30)
      const isBlue = b > 110 && b > r + 20;
      const isRed = r > 110 && r > b + 20;
      const isDarkEdge = (r < 60 && g < 60 && b < 60) && (x > 10 && x < nInfo.width - 10);

      if (isBlue || isRed || isDarkEdge) {
        // Keep opaque
        nameRaw[idx + 3] = 255;
      } else {
        // Transparent
        nameRaw[idx + 3] = 0;
      }
    }
  }

  await sharp(nameRaw, {
    raw: { width: nInfo.width, height: nInfo.height, channels: 4 }
  })
    .trim()
    .png()
    .toFile('./public/assets/aistudio/sonkdash_name_clean.png');

  console.log('Saved sonkdash_name_clean.png');

  // 2. Process Mascot Logo
  const logoPath = './public/assets/aistudio/image_ebec64fa.png';
  const { data: logoRaw, info: lInfo } = await sharp(logoPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Flood fill or distance-based background removal from corners
  // Center of logo is around (width/2, height/2)
  const cx = lInfo.width / 2;
  const cy = lInfo.height / 2;
  const maxR = Math.min(lInfo.width, lInfo.height) / 2;

  for (let y = 0; y < lInfo.height; y++) {
    for (let x = 0; x < lInfo.width; x++) {
      const idx = (y * lInfo.width + x) * 4;
      const r = logoRaw[idx];
      const g = logoRaw[idx + 1];
      const b = logoRaw[idx + 2];

      const dist = Math.hypot(x - cx, y - cy);

      // If outer corners and light background
      if (dist > maxR - 8 && r > 210 && g > 210 && b > 210) {
        logoRaw[idx + 3] = 0;
      } else if (r > 242 && g > 242 && b > 242) {
        logoRaw[idx + 3] = 0;
      } else if (r > 230 && g > 230 && b > 230 && dist > maxR * 0.7) {
        logoRaw[idx + 3] = Math.max(0, 255 - (r - 230) * 10);
      }
    }
  }

  await sharp(logoRaw, {
    raw: { width: lInfo.width, height: lInfo.height, channels: 4 }
  })
    .trim()
    .png()
    .toFile('./public/assets/aistudio/sonkdash_logo_clean.png');

  console.log('Saved sonkdash_logo_clean.png');
}

perfectCutout().catch(console.error);
