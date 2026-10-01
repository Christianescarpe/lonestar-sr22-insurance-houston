const fs = require('fs');
const data = JSON.parse(fs.readFileSync('site_content.json', 'utf-8'));

console.log('Homepage Content snippet:');
console.log(data.mainPages[0].rawContent.slice(0, 800));

console.log('\n--- Service 1 Content snippet ---');
console.log(data.mainPages[1].rawContent.slice(0, 800));

console.log('\n--- Location 1 Content snippet ---');
const loc = data.mainPages.find(p => p.pageType === 'location');
console.log(loc.rawContent.slice(0, 800));
