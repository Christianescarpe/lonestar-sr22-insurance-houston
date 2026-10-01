const fs = require('fs');
const siteData = JSON.parse(fs.readFileSync('src/data/siteData.json', 'utf-8'));

console.log('--- Verifying all 25 pages for presence of their 3 internal links + 1 external link ---');

let totalMissing = 0;
siteData.allPages.forEach((p, idx) => {
  const missing = [];
  
  // Check internal links
  p.internalLinks.forEach((l, i) => {
    // Check if link.text is wrapped in an <a> tag in fullLinkedHtml or sections
    const isLinked = p.fullLinkedHtml.includes(`>${l.text}</a>`) || 
                     p.fullLinkedHtml.includes(`>${l.text.trim()}</a>`) ||
                     new RegExp(`<a[^>]*>${l.text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}<\\/a>`, 'i').test(p.fullLinkedHtml);
    if (!isLinked) {
      missing.push(`Internal ${i+1}: "${l.text}" -> "${l.url}"`);
    }
  });

  // Check external link
  if (p.externalLink && p.externalLink.text) {
    const isExtLinked = p.fullLinkedHtml.includes(`>${p.externalLink.text}</a>`) ||
                        new RegExp(`<a[^>]*>${p.externalLink.text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}<\\/a>`, 'i').test(p.fullLinkedHtml);
    if (!isExtLinked) {
      missing.push(`External: "${p.externalLink.text}" -> "${p.externalLink.url}"`);
    }
  }

  if (missing.length > 0) {
    console.log(`[${idx+1}] ${p.pageName || p.title} (slug: "${p.slug}"): MISSING ${missing.length} links:`);
    missing.forEach(m => console.log('    - ', m));
    totalMissing += missing.length;
  } else {
    console.log(`[${idx+1}] ${p.pageName || p.title}: All ${p.internalLinks.length} internal + external links linked!`);
  }
});

console.log(`\nTotal missing links across all pages: ${totalMissing}`);
