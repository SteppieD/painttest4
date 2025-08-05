const fs = require('fs');
const path = require('path');

// Simple 1x1 blue PNG as base64
const bluePixelPNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkCP9fDwADhgGAYZnbKgAAAABJRU5ErkJggg==', 'base64');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, '..', 'public', 'icons');

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate placeholder icons (1x1 blue pixel scaled by browser)
sizes.forEach(size => {
  fs.writeFileSync(path.join(iconsDir, `icon-${size}x${size}.png`), bluePixelPNG);
  console.log(`Created placeholder icon-${size}x${size}.png`);
});

// Generate special icons
['new-quote', 'quotes'].forEach(name => {
  fs.writeFileSync(path.join(iconsDir, `${name}.png`), bluePixelPNG);
  console.log(`Created placeholder ${name}.png`);
});

console.log('All placeholder icons created successfully!');