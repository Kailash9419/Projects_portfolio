const fs = require('fs');
const path = require('path');
const https = require('https');

// Curated high quality dark-mode UI, SaaS, Dashboard, AI, Mobile app, and 3D graphics images from Unsplash
const projectImages = {
  'nexus-ai': {
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', // Dark 3D neural wave
    screens: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', // Analytics graph dashboard
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80', // Code & AI telemetry
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80', // Matrix & neural nodes
    ]
  },
  'cloudsync': {
    cover: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80', // Cloud server network
    screens: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80', // Collaborative workspace
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', // Realtime charts & nodes
    ]
  },
  'pixel-studio': {
    cover: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    screens: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
    ]
  },
  'datapulse': {
    cover: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    screens: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    ]
  },
  'swiftcart': {
    cover: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
    screens: [
      'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80',
    ]
  },
  'autoflow': {
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', // Circuit / flow architecture
    screens: [
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80', // Workflow node builder
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80', // Cloud pipelines
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80', // Execution logs
    ]
  },
  'chromatic': {
    cover: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80', // Generative 3D fluid art
    screens: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', // Particle wave
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80', // Digital abstract art
    ]
  },
  'devportal': {
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80', // Code on screen
    screens: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80', // Developer laptop coding
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1200&q=80', // API terminal interface
    ]
  },
  'hyperscale': {
    cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80', // Global network mesh
    screens: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80', // Datacenter server rack
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', // Cloud telemetry dashboard
    ]
  }
};

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(destPath));
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Downloading realistic dummy images for all projects...');

  for (const [slug, data] of Object.entries(projectImages)) {
    const projectDir = path.join(__dirname, 'public', 'projects', slug);
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }

    try {
      // Download cover.jpg
      const coverPath = path.join(projectDir, 'cover.jpg');
      await downloadImage(data.cover, coverPath);
      console.log(`✓ Downloaded ${slug}/cover.jpg`);

      // Download screens
      for (let i = 0; i < data.screens.length; i++) {
        const screenPath = path.join(projectDir, `screen-${i + 1}.jpg`);
        await downloadImage(data.screens[i], screenPath);
        console.log(`✓ Downloaded ${slug}/screen-${i + 1}.jpg`);
      }
    } catch (err) {
      console.error(`Error downloading for ${slug}:`, err.message);
    }
  }

  console.log('Finished downloading dummy images!');
}

run();
