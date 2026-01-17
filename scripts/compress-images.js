const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'src', 'assets');

async function compressImages() {
  const files = fs.readdirSync(assetsDir);
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(assetsDir, file);
      const outputName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      const outputPath = path.join(assetsDir, outputName);
      
      const stats = fs.statSync(inputPath);
      const originalSize = stats.size;
      
      console.log(`Compressing: ${file} (${(originalSize / 1024).toFixed(1)} KB)`);
      
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      const newStats = fs.statSync(outputPath);
      const newSize = newStats.size;
      const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
      
      console.log(`  -> ${outputName} (${(newSize / 1024).toFixed(1)} KB) - ${savings}% smaller`);
    }
  }
  
  console.log('\nDone! WebP images created.');
}

compressImages().catch(console.error);
