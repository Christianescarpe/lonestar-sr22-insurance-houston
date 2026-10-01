const fs = require('fs');
const data = JSON.parse(fs.readFileSync('site_content.json', 'utf-8'));

console.log('Sample internal links from main pages:');
data.mainPages.forEach(p => {
  if (p.internalLinks.length > 0) {
    console.log(p.slug || 'home', '->', p.internalLinks.map(l => `${l.text} (${l.url})`));
  }
});
console.log('\nSample internal links from blog posts:');
data.blogPosts.slice(0, 3).forEach(b => {
  if (b.internalLinks.length > 0) {
    console.log(b.slug, '->', b.internalLinks.map(l => `${l.text} (${l.url})`));
  }
});
