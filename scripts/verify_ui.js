const http = require('http');

function fetch(path) {
  return new Promise(resolve => {
    http.get('http://localhost:3000' + path, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    });
  });
}

async function run() {
  const data = await fetch('/non-owner-sr22-insurance-philadelphia-pa');
  console.log('Has Quick Nav TOC:', data.includes('Quick Navigation'));
  console.log('Has Internal Anchors Card:', data.includes('Internal Anchors &amp; Referenced Resources') || data.includes('Internal Anchors'));
  
  const regex = /href="(\/[a-z0-9-]+)"[^>]*>([^<]+)<\/a>/g;
  let m;
  console.log('In-text & internal links found:');
  while ((m = regex.exec(data)) !== null) {
    console.log(`  ${m[1]} -> text: "${m[2].trim()}"`);
  }
}

run();
