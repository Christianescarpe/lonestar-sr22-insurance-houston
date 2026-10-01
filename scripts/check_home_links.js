const fs = require('fs');
const siteData = JSON.parse(fs.readFileSync('src/data/siteData.json', 'utf-8'));

const home = siteData.mainPages[0];
console.log('Homepage introHtml contains <a>:', home.introHtml.includes('<a '));

home.sections.forEach((s, idx) => {
  const hasA = s.bodyHtml.includes('<a ');
  console.log(`Section ${idx+1} [${s.heading}]: contains <a >: ${hasA}`);
  if (hasA) {
    const matches = s.bodyHtml.match(/<a[^>]*>.*?<\/a>/g);
    console.log('   Links found:', matches);
  }
});
