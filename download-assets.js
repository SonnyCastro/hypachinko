const http = require('http');
const fs = require('fs');
const path = require('path');

// Asset mapping with organized names
const assets = [
  // Main page assets
  {
    url: 'http://localhost:3845/assets/fb03f73246ea944bb059d6ef45551a2e66fc8e5e.png',
    filename: 'mascot-hypachinko.png',
    folder: 'images'
  },
  {
    url: 'http://localhost:3845/assets/9a392290f5fc5c2583fd2b99b48621ff4c6a7ce2.svg',
    filename: 'usdt-icon.svg',
    folder: 'icons'
  },
  {
    url: 'http://localhost:3845/assets/dafc672b9f7881e892e5b3b2e764ac59ef49a5a6.svg',
    filename: 'sphere-icon.svg',
    folder: 'icons'
  },
  {
    url: 'http://localhost:3845/assets/5826c8f88b6214eb751bd899dff0816f21e32645.svg',
    filename: 'info-circle.svg',
    folder: 'icons'
  },
  {
    url: 'http://localhost:3845/assets/3c6df5c24b9806fbf41ec37af69ee5c452457094.svg',
    filename: 'alarm-icon.svg',
    folder: 'icons'
  },
  {
    url: 'http://localhost:3845/assets/61bfe9c59148c2a2095a4715a1f79aff6db7c6ef.svg',
    filename: 'trophy-icon.svg',
    folder: 'icons'
  },
  {
    url: 'http://localhost:3845/assets/e19b286595c96d5bf080367204ad0ca73867601b.png',
    filename: 'hypachinko-gameplay.png',
    folder: 'images'
  },
  {
    url: 'http://localhost:3845/assets/b6b4071333283c51b62ba3e1838664b5f03f2a33.svg',
    filename: 'hyperliquid-logo.svg',
    folder: 'logos'
  },

  // Footer assets
  {
    url: 'http://localhost:3845/assets/99323feb334240c5bf308e3588b62909a7108a6f.svg',
    filename: 'hypachinko-logo.svg',
    folder: 'logos'
  },
  {
    url: 'http://localhost:3845/assets/0f5c9e192c87a998bd1617830320b0366eb4bdff.svg',
    filename: 'github-icon.svg',
    folder: 'icons'
  },
  {
    url: 'http://localhost:3845/assets/1d22ff6e75f6b1a7500ccbdd7cde12b72af1f825.svg',
    filename: 'x-icon.svg',
    folder: 'icons'
  },
  {
    url: 'http://localhost:3845/assets/a8fdf8d5785b567e2c0ac7c01cf68b0b1446cf1b.svg',
    filename: 'telegram-icon.svg',
    folder: 'icons'
  },

  // Menu assets
  {
    url: 'http://localhost:3845/assets/10debe6dad524aaec185ce3301b2e727b29d2e62.svg',
    filename: 'wallet-icon.svg',
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
  console.log('🚀 Starting asset download...\n');

  for (const asset of assets) {
    try {
      await downloadAsset(asset);
    } catch (error) {
      console.log(`Failed to download ${asset.filename}: ${error.message}`);
    }
  }

  console.log('\n✨ Asset download complete!');
}

downloadAllAssets(); 