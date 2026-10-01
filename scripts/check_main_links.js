const fs = require('fs');
const siteData = JSON.parse(fs.readFileSync('src/data/siteData.json', 'utf-8'));

console.log('--- Checking mainPages links ---');
siteData.mainPages.forEach((p, idx) => {
  const linksInHtml = (p.rawContent.match(/<a[^>]*href=[^>]*>.*?<\/a>/gi) || []);
  const linksInLinked = (p.fullLinkedHtml.match(/<a[^>]*href=[^>]*>.*?<\/a>/gi) || []);
  
  let sectionLinksCount = 0;
  if (p.introHtml) {
    sectionLinksCount += (p.introHtml.match(/<a[^>]*href=[^>]*>.*?<\/a>/gi) || []).length;
  }
  if (p.sections) {
    p.sections.forEach(s => {
      sectionLinksCount += (s.bodyHtml.match(/<a[^>]*href=[^>]*>.*?<\/a>/gi) || []).length;
      if (s.faqs) {
        s.faqs.forEach(f => {
          sectionLinksCount += (f.answer.match(/<a[^>]*href=[^>]*>.*?<\/a>/gi) || []).length;
        });
      }
    });
  }

  console.log(`[${idx+1}] ${p.pageName} (slug: "${p.slug}"):`);
  console.log(`    internalLinks in JSON:`, p.internalLinks.map(l => `"${l.text}" -> "${l.url}"`));
  console.log(`    rawContent <a> tags: ${linksInHtml.length}`);
  console.log(`    fullLinkedHtml <a> tags: ${linksInLinked.length}`);
  console.log(`    rendered sections <a> tags: ${sectionLinksCount}`);
  if (linksInLinked.length > 0) {
    console.log(`    sample links:`, linksInLinked);
  }
});
