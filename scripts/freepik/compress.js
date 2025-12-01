/**
 * Image Compression Script
 *
 * Compresses images for web use using sharp.
 *
 * Usage:
 *   node scripts/freepik/compress.js templates/images/hvac/hero.jpg
 *   node scripts/freepik/compress.js templates/images/hvac/hero.jpg --width 1920 --quality 80
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Parse arguments
const args = process.argv.slice(2);
const inputPath = args.find(arg => !arg.startsWith('--'));

if (!inputPath) {
  console.error('Usage: node scripts/freepik/compress.js <image-path> [--width N] [--quality N]');
  process.exit(1);
}

const widthIndex = args.indexOf('--width');
const qualityIndex = args.indexOf('--quality');

const maxWidth = widthIndex !== -1 ? parseInt(args[widthIndex + 1], 10) : 1920;
const quality = qualityIndex !== -1 ? parseInt(args[qualityIndex + 1], 10) : 80;

async function compress() {
  const ext = path.extname(inputPath).toLowerCase();
  const baseName = path.basename(inputPath, ext);
  const dirName = path.dirname(inputPath);

  // Create backup of original
  const originalPath = path.join(dirName, `${baseName}.original${ext}`);

  // Get original file size
  const originalSize = fs.statSync(inputPath).size;
  console.log(`\n📷 Processing: ${inputPath}`);
  console.log(`   Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);

  // Backup original if not already backed up
  if (!fs.existsSync(originalPath)) {
    fs.copyFileSync(inputPath, originalPath);
    console.log(`   Backup saved: ${originalPath}`);
  }

  // Process image
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  console.log(`   Original dimensions: ${metadata.width}x${metadata.height}`);
  console.log(`   Target: max ${maxWidth}px wide, ${quality}% quality`);

  // Resize if needed and convert to optimized JPEG
  let pipeline = image;

  if (metadata.width > maxWidth) {
    pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
  }

  // Output as optimized JPEG
  const outputPath = inputPath.replace(ext, '.jpg');
  await pipeline
    .jpeg({ quality, progressive: true })
    .toFile(outputPath + '.tmp');

  // Replace original with compressed
  fs.unlinkSync(inputPath);
  fs.renameSync(outputPath + '.tmp', outputPath);

  const newSize = fs.statSync(outputPath).size;
  const newMetadata = await sharp(outputPath).metadata();

  console.log(`\n✅ Compressed!`);
  console.log(`   New size: ${(newSize / 1024).toFixed(0)} KB (${((1 - newSize/originalSize) * 100).toFixed(1)}% reduction)`);
  console.log(`   New dimensions: ${newMetadata.width}x${newMetadata.height}`);
  console.log(`   Output: ${outputPath}`);
}

compress().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
