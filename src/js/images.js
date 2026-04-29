const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './src/assets/images';
const outputDir = './src/assets/images/optimized';

const sizes = [400, 800, 1200];
const formats = ['avif', 'webp', 'jpeg'];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Para leer todas las imágenes
const files = fs.readdirSync(inputDir).filter(file =>
  /\.(jpg|jpeg|png)$/i.test(file)
);

async function processImages() {
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const name = path.parse(file).name;

    for (const size of sizes) {
      for (const format of formats) {
        const outputPath = path.join(
          outputDir,
          `${name}-${size}.${format}`
        );

        await sharp(inputPath)
          .resize(size)
          .toFormat(format, { quality: 80 })
          .toFile(outputPath);

        console.log(`✅ ${outputPath}`);
      }
    }
  }
}

processImages();