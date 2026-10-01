const fs = require('fs');
const data = JSON.parse(fs.readFileSync('site_content.json', 'utf-8'));

data.mainPages.forEach((p, idx) => {
  const h1Match = p.rawContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
  const h2Matches = [...p.rawContent.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)].map(m => m[1]);
  console.log(`[${idx+1}] Page: ${p.pageName}`);
  console.log(`     H1: ${h1Match ? h1Match[1].trim() : 'NONE'}`);
  console.log(`     H2 count: ${h2Matches.length} (${h2Matches.slice(0, 3).join(' | ')}...)`);
});
