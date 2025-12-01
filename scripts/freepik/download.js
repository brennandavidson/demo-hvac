/**
 * Freepik Image Download
 *
 * Downloads full-resolution images from Freepik by resource ID.
 *
 * Usage:
 *   node scripts/freepik/download.js 414646746 --output templates/images/hvac/hero.jpg
 *   node scripts/freepik/download.js 414646746 414992718 --output-dir templates/images/hvac/services/
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const API_KEY = process.env.FREEPIK_API_KEY || 'YOUR_API_KEY_HERE';

// Parse command line arguments
const args = process.argv.slice(2);
const resourceIds = args.filter(arg => !arg.startsWith('--') && !args[args.indexOf(arg) - 1]?.startsWith('--'));
const outputPath = args.includes('--output') ? args[args.indexOf('--output') + 1] : null;
const outputDir = args.includes('--output-dir') ? args[args.indexOf('--output-dir') + 1] : null;

if (resourceIds.length === 0) {
  console.error('Usage: node scripts/freepik/download.js <resource-id> [--output path.jpg]');
  console.error('       node scripts/freepik/download.js <id1> <id2> ... [--output-dir directory/]');
  process.exit(1);
}

if (API_KEY === 'YOUR_API_KEY_HERE') {
  console.error('❌ Please set FREEPIK_API_KEY environment variable');
  process.exit(1);
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

// Download file from URL
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    // Ensure directory exists
    const dir = path.dirname(filepath);
    fs.mkdirSync(dir, { recursive: true });

    const file = fs.createWriteStream(filepath);

    const request = (downloadUrl) => {
      const protocol = downloadUrl.startsWith('https') ? https : require('http');
      protocol.get(downloadUrl, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          // Follow redirect
          request(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`Download failed with status ${res.statusCode}`));
          return;
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }).on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    };

    request(url);
  });
}

// Get resource details
async function getResourceDetails(resourceId) {
  const url = `https://api.freepik.com/v1/resources/${resourceId}`;
  return fetchFromApi(url);
}

// Get download URL
async function getDownloadUrl(resourceId) {
  const url = `https://api.freepik.com/v1/resources/${resourceId}/download`;
  return fetchFromApi(url);
}

// Main execution
async function main() {
  console.log(`\n📥 Downloading ${resourceIds.length} image(s) from Freepik\n`);

  for (let i = 0; i < resourceIds.length; i++) {
    const resourceId = resourceIds[i];

    try {
      // Get resource details first
      console.log(`[${i + 1}/${resourceIds.length}] Fetching details for resource ${resourceId}...`);
      const details = await getResourceDetails(resourceId);

      // Get download URL
      console.log(`  ↳ Getting download URL...`);
      const downloadInfo = await getDownloadUrl(resourceId);

      if (!downloadInfo.data?.url) {
        console.error(`  ❌ No download URL returned for ${resourceId}`);
        continue;
      }

      // Determine output path
      let finalPath;
      if (outputPath && resourceIds.length === 1) {
        finalPath = outputPath;
      } else if (outputDir) {
        const ext = path.extname(downloadInfo.data.url.split('?')[0]) || '.jpg';
        finalPath = path.join(outputDir, `${resourceId}${ext}`);
      } else {
        const ext = path.extname(downloadInfo.data.url.split('?')[0]) || '.jpg';
        finalPath = path.join('downloads', `${resourceId}${ext}`);
      }

      // Download the file
      console.log(`  ↳ Downloading to ${finalPath}...`);
      await downloadFile(downloadInfo.data.url, finalPath);

      console.log(`  ✅ Downloaded: ${details.data?.title || resourceId}`);

      // Log cost info
      console.log(`  💰 Cost: $0.044\n`);

    } catch (error) {
      console.error(`  ❌ Error: ${error.message}\n`);
    }
  }

  console.log('Done!\n');
}

main();
