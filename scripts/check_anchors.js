const fs = require('fs');
const data = JSON.parse(fs.readFileSync('site_content.json', 'utf-8'));

data.mainPages.slice(0, 3).forEach(p => {
  console.log(`\nPage: ${p.pageName}`);
  p.internalLinks.forEach(link => {
    const hasText = p.rawContent.includes(link.text);
    console.log(`  Link text: "${link.text}" -> in content: ${hasText}, target: "${link.url}"`);
  });
});

console.log('\nBlog post links:');
data.blogPosts.slice(0, 3).forEach(p => {
  console.log(`\nBlog: ${p.title}`);
  p.internalLinks.forEach(link => {
    const hasText = p.rawContent.includes(link.text);
    console.log(`  Link text: "${link.text}" -> in content: ${hasText}, target: "${link.url}"`);
  });
});
