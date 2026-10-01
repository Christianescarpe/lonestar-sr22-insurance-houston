const fs = require('fs');
const data = JSON.parse(fs.readFileSync('site_content.json', 'utf-8'));

function analyzePage(p) {
  console.log(`\n=================== ${p.pageName} (${p.slug || 'HOME'}) ===================`);
  // Extract all H1, H2, H3
  const headings = [...p.rawContent.matchAll(/<(h[1-3])[^>]*>(.*?)<\/\1>/gi)].map(m => ({ tag: m[1], text: m[2] }));
  console.log('Headings:', headings);
  
  // Check for tables
  const tables = [...p.rawContent.matchAll(/<table[\s\S]*?<\/table>/gi)];
  console.log(`Tables count: ${tables.length}`);
  
  // Check for lists
  const uls = [...p.rawContent.matchAll(/<ul[\s\S]*?<\/ul>/gi)];
  console.log(`UL count: ${uls.length}`);
}

analyzePage(data.mainPages[0]);
analyzePage(data.mainPages[1]);
analyzePage(data.mainPages[5]); // Pittsburgh
