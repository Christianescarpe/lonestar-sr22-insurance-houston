const fs = require('fs');
const siteData = JSON.parse(fs.readFileSync('src/data/siteData.json', 'utf-8'));

console.log('--- Checking internal links on all pages ---');
siteData.allPages.forEach(p => {
  const linksInHtml = (p.rawContent.match(/<a[^>]*href=[^>]*>.*?<\/a>/gi) || []);
  const linksInLinked = (p.fullLinkedHtml.match(/<a[^>]*href=[^>]*>.*?<\/a>/gi) || []);
  
  // Also check inside p.sections and p.introHtml
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

  console.log(`Page: ${p.pageName || p.title} (slug: "${p.slug}")`);
  console.log(`  internalLinks array:`, p.internalLinks);
  console.log(`  externalLink:`, p.externalLink);
  console.log(`  Links in rawContent: ${linksInHtml.length}`);
  console.log(`  Links in fullLinkedHtml: ${linksInLinked.length}`);
  console.log(`  Links rendered in intro + sections: ${sectionLinksCount}`);
  if (linksInLinked.length > 0) {
    console.log(`  Sample linked tags:`, linksInLinked.slice(0, 4));
  }
});
