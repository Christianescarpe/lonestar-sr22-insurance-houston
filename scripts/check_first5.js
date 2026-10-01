const fs = require('fs');
const siteData = JSON.parse(fs.readFileSync('src/data/siteData.json', 'utf-8'));
siteData.mainPages.slice(0, 5).forEach((p, idx) => {
  const linksInHtml = (p.rawContent.match(/<a[^>]*href=[^>]*>.*?<\/a>/gi) || []);
  const linksInLinked = (p.fullLinkedHtml.match(/<a[^>]*href=[^>]*>.*?<\/a>/gi) || []);
  console.log('[' + (idx+1) + '] ' + p.pageName + ' (slug: "' + p.slug + '"):');
  console.log('  internalLinks:', p.internalLinks);
  console.log('  raw:', linksInHtml.length, 'linked:', linksInLinked.length);
  console.log('  links in fullLinkedHtml:', linksInLinked);
});
