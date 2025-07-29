const http = require('http');
const fs = require('fs');
const path = require('path');

// Additional assets needed based on Figma nodes and component analysis
const additionalAssets = [
  // Sphere icon for UpForGrabsDisplay (from node 1-132, 1-1138, 1-1189)
  {
    url: 'http://localhost:3845/assets/10aafe44b67f5ec35af4359beda0f0f0319e98ac.svg',
    filename: 'sphere-icon-small.svg',
    folder: 'icons'
  },
  // Additional token icons that might be needed
  {
    url: 'http://localhost:3845/assets/14dbb1edc0b56eddf22dc50e470556133fec977e.svg',
    filename: 'usdt-icon-alt.svg',
    folder: 'icons'
  },
  {
    url: 'http://localhost:3845/assets/96fb7965e44e85d1e48534a3d77f72bb5f34522b.svg',
    filename: 'poker-chip-icon.svg',
    folder: 'icons'
  },
  {
    url: 'http://localhost:3845/assets/088c45b246448aa80c136d5b4316fa33de82371b.svg',
    filename: 'poker-chip-icon-alt.svg',
    folder: 'icons'
  },
  {
    url: 'http://localhost:3845/assets/cf382c4dad0aef31ab0d2f5872b0002493abced6.svg',
    filename: 'hyperliquid-icon.svg',
    folder: 'icons'
  },
  {
    url: 'http://localhost:3845/assets/6e27a1b2fa1fc437347ba4ec3ab26022b58e6e06.svg',
    filename: 'hyperliquid-icon-alt.svg',
    folder: 'icons'
  },
  {
    url: 'http://localhost:3845/assets/b55036e328ce2971e314d9f656bcee0915e8f90a.svg',
    filename: 'alarm-icon-alt.svg',
    folder: 'icons'
  },
  {
    url: 'http://localhost:3845/assets/b695cffd5defdd3ceb3980af27116ed081bc8ad7.svg',
    filename: 'ticket-icon.svg',
    folder: 'icons'
  },
  {
    url: 'http://localhost:3845/assets/052952c6c0df1b3db83c690e87565dba937d11cf.svg',
    filename: 'sphere-icon-alt.svg',
    folder: 'icons'
  }
];

function downloadAsset(asset) {
  return new Promise((resolve, reject) => {
    const folderPath = path.join('public', asset.folder);
    const filePath = path.join(folderPath, asset.filename);

    // Create folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const file = fs.createWriteStream(filePath);

    http.get(asset.url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Downloaded: ${asset.filename}`);
          resolve();
        });
      } else {
        console.log(`❌ Failed to download ${asset.filename}: ${response.statusCode}`);
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      console.log(`❌ Error downloading ${asset.filename}: ${err.message}`);
      reject(err);
    });
  });
}

async function downloadAllAssets() {
  console.log('🚀 Starting additional asset download...\n');

  for (const asset of additionalAssets) {
    try {
      await downloadAsset(asset);
    } catch (error) {
      console.log(`Failed to download ${asset.filename}: ${error.message}`);
    }
  }

  console.log('\n✨ Additional asset download complete!');
}

downloadAllAssets(); 