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
  const gids = ['0', '1579314927', '1094889684'];
  for (const gid of gids) {
    try {
      const csv = await fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`);
      fs.writeFileSync(`sheet_${gid}.csv`, csv);
      const lines = csv.split('\n');
      console.log(`gid=${gid} fetched: lines=${lines.length}, first line: ${lines[0].slice(0, 100)}`);
      if (lines.length > 1) {
        console.log(`gid=${gid} second line: ${lines[1].slice(0, 100)}`);
      }
    } catch (e) {
      console.error(`Error for gid=${gid}:`, e.message);
    }
  }
}

run();
