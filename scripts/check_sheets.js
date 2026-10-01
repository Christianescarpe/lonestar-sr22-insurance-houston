const https = require('https');
const fs = require('fs');

const sheetId = '1MggW9GIo9r1ZzfvleIGnerhYToasjHSYQzYzHdL3AIA';

function fetch(url) {
  return new Promise((resolve, reject) => {
    function doFetch(currentUrl, redirects = 0) {
      if (redirects > 5) return reject(new Error('Too many redirects'));
      https.get(currentUrl, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return doFetch(res.headers.location, redirects + 1);
        }
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      }).on('error', reject);
    }
    doFetch(url);
  });
}

async function run() {
  const html = await fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/htmlview`);
  fs.writeFileSync('sheet_htmlview.html', html);
  
  // Look for sheets info in htmlview
  const matches = [...html.matchAll(/class="ritz[^>]*id="sheet-button-([0-9]+)"[^>]*>([^<]+)/g)];
  console.log('Matches from sheet-button:', matches.map(m => ({ gid: m[1], name: m[2] })));
  
  const gids = [...html.matchAll(/gid=([0-9]+)/g)].map(m => m[1]);
  console.log('Unique gids found:', [...new Set(gids)]);
}

run().catch(console.error);
