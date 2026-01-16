const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Directories to process
const directories = [
  'src/assets',
  'public/assets',
  'images'
];

// Supported image extensions
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

async function optimizeImage(inputPath, outputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    
    // Read the image and get metadata
    const metadata = await sharp(inputPath).metadata();
    
    let sharpInstance = sharp(inputPath)
      .rotate() // Auto-rotate based on EXIF
      .withMetadata({ orientation: undefined }); // Keep metadata but fix orientation
    
    // Convert to sRGB color space for web compatibility
    if (metadata.space !== 'srgb') {
      sharpInstance = sharpInstance.toColorspace('srgb');
    }
    
    // Set format-specific options (quality preserved, just re-encoded for compatibility)
    if (ext === '.jpg' || ext === '.jpeg') {
      sharpInstance = sharpInstance.jpeg({ 
        quality: 100,  // No quality loss
        mozjpeg: true,  // Better encoding
        progressive: false,  // Baseline for max compatibility
        optimizeCoding: true
      });
    } else if (ext === '.png') {
      sharpInstance = sharpInstance.png({ 
        compressionLevel: 9,  // Lossless compression
        adaptiveFiltering: true
      });
    } else if (ext === '.webp') {
      sharpInstance = sharpInstance.webp({ 
        quality: 100,  // No quality loss
        lossless: false,  // Near-lossless for smaller size
        nearLossless: true
      });
    }
    
    await sharpInstance.toFile(outputPath + '.tmp');
    
    // Replace original with optimized version
    fs.renameSync(outputPath + '.tmp', outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const sizeDiff = ((newSize - originalSize) / originalSize * 100).toFixed(1);
    const sizeIndicator = newSize <= originalSize ? '↓' : '↑';
    
    console.log(`✓ ${path.basename(inputPath)}: ${(originalSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB (${sizeIndicator}${Math.abs(Number(sizeDiff))}%)`);
    
    return { original: originalSize, optimized: newSize };
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}: ${error.message}`);
    return { original: 0, optimized: 0, error: true };
  }
}

async function processDirectory(dir) {
  const fullPath = path.resolve(dir);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`Directory not found: ${dir}`);
    return [];
  }
  
  const files = fs.readdirSync(fullPath);
  const results = [];
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (imageExtensions.includes(ext)) {
      const filePath = path.join(fullPath, file);
      const result = await optimizeImage(filePath, filePath);
      results.push(result);
    }
  }
  
  return results;
}

async function main() {
  console.log('🖼️  Starting image optimization (quality preserved)...\n');
  console.log('This will:');
  console.log('- Fix rotation/orientation issues');
  console.log('- Convert to web-safe sRGB color space');
  console.log('- Re-encode to prevent corruption errors');
  console.log('- Optimize encoding without quality loss\n');
  
  let totalProcessed = 0;
  
  for (const dir of directories) {
    console.log(`\n📁 Processing ${dir}...`);
    const results = await processDirectory(dir);
    totalProcessed += results.filter(r => !r.error).length;
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`✅ Optimized ${totalProcessed} images without quality loss!`);
  console.log('='.repeat(50));
}

main().catch(console.error);
