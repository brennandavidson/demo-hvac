/**
 * Freepik Image Search
 *
 * Searches Freepik's API and downloads thumbnails for visual review.
 *
 * Usage:
 *   node scripts/freepik/search.js "HVAC technician" --landscape
 *   node scripts/freepik/search.js "pool maintenance" --square
 *   node scripts/freepik/search.js "roofing contractor" --landscape --limit 30
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const API_KEY = process.env.FREEPIK_API_KEY || 'YOUR_API_KEY_HERE';
const OUTPUT_DIR = path.join(__dirname, '../../.image-review');

// Parse command line arguments
const args = process.argv.slice(2);
const searchTerm = args.find(arg => !arg.startsWith('--') && !args[args.indexOf(arg) - 1]?.startsWith('--limit')) || 'HVAC technician';
const orientation = args.includes('--landscape') ? 'landscape'
                  : args.includes('--portrait') ? 'portrait'
                  : args.includes('--square') ? 'square'
                  : args.includes('--panoramic') ? 'panoramic'
                  : 'landscape'; // default to landscape for hero images
const limitIndex = args.indexOf('--limit');
const limit = limitIndex !== -1 ? parseInt(args[limitIndex + 1], 10) : 20;
const allowAI = args.includes('--ai'); // By default, exclude AI-generated images

console.log(`\n🔍 Searching Freepik for: "${searchTerm}"`);
console.log(`📐 Orientation: ${orientation}`);
console.log(`📊 Limit: ${limit}`);
console.log(`🤖 AI-generated: ${allowAI ? 'included' : 'excluded'}`);
console.log(`📁 Output: ${OUTPUT_DIR}\n`);

// Build the API URL
function buildSearchUrl(term, orient, limit = 20) {
  const baseUrl = 'https://api.freepik.com/v1/resources';
  const params = new URLSearchParams({
    term: term,
    limit: limit.toString(),
    'filters[content_type][photo]': '1', // Photos only
    [`filters[orientation][${orient}]`]: '1',
    order: 'relevance'
  });
  return `${baseUrl}?${params.toString()}`;
}

// Fetch from Freepik API
function fetchFromApi(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'x-freepik-api-key': API_KEY,
        'Accept-Language': 'en-US'
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`API returned ${res.statusCode}: ${data}`));
          return;
        }
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse response: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

// Download an image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    if (!url || url === 'https://') {
      reject(new Error('Invalid URL'));
      return;
    }

    const file = fs.createWriteStream(filepath);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Follow redirect
        downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete partial file
      reject(err);
    });
  });
}

// Main execution
async function main() {
  // Check for API key
  if (API_KEY === 'YOUR_API_KEY_HERE') {
    console.error('❌ Please set FREEPIK_API_KEY environment variable');
    console.error('   Example: FREEPIK_API_KEY=your_key node scripts/freepik-image-search.js "query"');
    process.exit(1);
  }

  // Create output directory
  const searchDir = path.join(OUTPUT_DIR, searchTerm.replace(/[^a-z0-9]/gi, '-').toLowerCase());
  fs.mkdirSync(searchDir, { recursive: true });

  try {
    // Search Freepik
    const url = buildSearchUrl(searchTerm, orientation, limit);
    console.log('📡 Calling Freepik API...');
    const response = await fetchFromApi(url);

    if (!response.data || response.data.length === 0) {
      console.log('❌ No results found');
      process.exit(1);
    }

    console.log(`✅ Found ${response.data.length} results\n`);

    // Create a manifest file with metadata
    const manifest = {
      searchTerm,
      orientation,
      searchedAt: new Date().toISOString(),
      results: []
    };

    // Download thumbnails
    console.log('📥 Downloading thumbnails for review...\n');

    for (let i = 0; i < response.data.length; i++) {
      const item = response.data[i];
      const thumbnailUrl = item.image?.source?.url;
      const filename = `${String(i + 1).padStart(2, '0')}-${item.id}.jpg`;
      const filepath = path.join(searchDir, filename);

      // Add to manifest
      manifest.results.push({
        index: i + 1,
        id: item.id,
        title: item.title,
        filename,
        thumbnailUrl,
        freepikUrl: item.url,
        downloads: item.stats?.downloads || 0,
        likes: item.stats?.likes || 0,
        author: item.author?.name || 'Unknown',
        type: item.image?.type || 'unknown',
        orientation: item.image?.orientation || 'unknown'
      });

      // Download thumbnail
      if (thumbnailUrl && thumbnailUrl !== 'https://') {
        try {
          await downloadImage(thumbnailUrl, filepath);
          console.log(`  ✓ ${filename} - "${item.title.substring(0, 50)}..."`);
        } catch (err) {
          console.log(`  ✗ ${filename} - Failed: ${err.message}`);
        }
      } else {
        console.log(`  ✗ ${filename} - No thumbnail URL`);
      }
    }

    // Save manifest
    const manifestPath = path.join(searchDir, '_manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    console.log(`\n✅ Done! Review images in: ${searchDir}`);
    console.log(`📋 Manifest saved to: ${manifestPath}`);
    console.log(`\n💡 Next steps:`);
    console.log(`   1. Open the folder and review the thumbnails`);
    console.log(`   2. Note the IDs of images you want to use`);
    console.log(`   3. Use those IDs to download full-resolution versions`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
