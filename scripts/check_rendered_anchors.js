const http = require('http');

function fetch(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
  });
}

async function run() {
  const pages = ['/', '/non-owner-sr22-insurance-philadelphia-pa', '/sr22-insurance-pittsburgh-pa', '/guide-to-sr22-insurance-philadelphia'];
  for (const p of pages) {
    const html = await fetch('http://localhost:3000' + p);
    // Find all <a href="..."> inside main
    const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
    const mainHtml = mainMatch ? mainMatch[0] : html;
    const aTags = [...mainHtml.matchAll(/<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)];
    console.log(`\n=================== Page: ${p} ===================`);
    console.log(`Total <a> tags inside <main>: ${aTags.length}`);
    aTags.forEach((t, idx) => {
      console.log(`  [${idx+1}] href="${t[1]}" | text="${t[2].replace(/<[^>]*>/g, '').trim()}" | class="${(t[0].match(/class=["']([^"']*)["']/) || [])[1] || ''}"`);
    });
  }
}

run();
