const http = require('http');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/siteData.json', 'utf-8'));

const routes = ['/', ...data.allPages.filter(p => p.slug).map(p => `/${p.slug}`)];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + route, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const hasPhone = body.includes('(267) 310-0435');
        const hasMap = body.includes('google.com/maps/embed');
        resolve({
          route,
          status: res.statusCode,
          length: body.length,
          hasPhone,
          hasMap
        });
      });
    }).on('error', (err) => {
      resolve({ route, status: 'ERROR', error: err.message });
    });
  });
}

async function run() {
  console.log(`Testing ${routes.length} routes...`);
  let errors = 0;
  for (const r of routes) {
    const res = await checkRoute(r);
    if (res.status === 200) {
      console.log(`✓ ${r} (Status: 200, Length: ${res.length}, Phone: ${res.hasPhone}, Map: ${res.hasMap})`);
    } else {
      console.log(`✗ ${r} (Status: ${res.status})`);
      errors++;
    }
  }
  console.log(`\nDone. Errors: ${errors}/${routes.length}`);
}

run();
