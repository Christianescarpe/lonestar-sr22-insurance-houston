const http = require('http');

function fetch(url) {
  return new Promise(resolve => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, html: data }));
    });
  });
}

async function run() {
  for (const path of ['/contact', '/contact-us']) {
    console.log(`--- Testing ${path} ---`);
    const res = await fetch('http://localhost:3000' + path);
    console.log('Status:', res.status);
    console.log('Has Phone (+1 (267) 310-0435):', res.html.includes('(267) 310-0435'));
    console.log('Has Map:', res.html.includes('google.com/maps/embed'));
    console.log('Has Form tags (<form):', res.html.includes('<form'));
    console.log('Has input fields (<input):', res.html.includes('<input'));
    console.log('Has textarea (<textarea):', res.html.includes('<textarea'));
  }
}

run();
