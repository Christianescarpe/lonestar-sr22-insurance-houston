const fs = require('fs');

function parseCSV(text) {
  const rows = [];
  let currentRow = [];
  let currentVal = '';
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i+1];
    
    if (inQuotes) {
      if (c === '"' && next === '"') {
        currentVal += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        currentVal += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        currentRow.push(currentVal);
        currentVal = '';
      } else if (c === '\r') {
        // ignore
      } else if (c === '\n') {
        currentRow.push(currentVal);
        if (currentRow.some(cell => cell.trim().length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentVal = '';
      } else {
        currentVal += c;
      }
    }
  }
  if (currentVal || currentRow.length > 0) {
    currentRow.push(currentVal);
    if (currentRow.some(cell => cell.trim().length > 0)) {
      rows.push(currentRow);
    }
  }
  return rows;
}

const csvMain = fs.readFileSync('sheet_1579314927.csv', 'utf-8');
const rowsMain = parseCSV(csvMain);
const headerMain = rowsMain[0].map(h => h.trim());

const mainPages = [];
for (let i = 1; i < rowsMain.length; i++) {
  const row = rowsMain[i];
  const pageName = (row[0] || '').trim();
  if (!pageName || pageName === 'Page Title') continue; // Skip header row duplicate
  
  const targetKeyword = (row[1] || '').trim();
  const seoTitle = (row[2] || '').trim();
  const rawContent = (row[3] || '').trim();
  const metaDesc = (row[4] || '').trim();
  const internal1Text = (row[5] || '').trim();
  const internal1Url = (row[6] || '').trim();
  const internal2Text = (row[7] || '').trim();
  const internal2Url = (row[8] || '').trim();
  const internal3Text = (row[9] || '').trim();
  const internal3Url = (row[10] || '').trim();
  const externalText = (row[11] || '').trim();
  const externalUrl = (row[12] || '').trim();
  let slug = (row[13] || '').trim();
  
  if (pageName.toLowerCase() === 'homepage') {
    slug = '';
  }

  // Determine type: home, service, or location
  let pageType = 'location';
  if (slug === '') {
    pageType = 'home';
  } else if (
    slug.includes('non-owner') ||
    slug.includes('quotes') ||
    slug.includes('requirements') ||
    slug.includes('fr44')
  ) {
    pageType = 'service';
  }

  mainPages.push({
    pageName,
    slug,
    pageType,
    targetKeyword,
    seoTitle,
    rawContent,
    metaDesc,
    internalLinks: [
      { text: internal1Text, url: internal1Url },
      { text: internal2Text, url: internal2Url },
      { text: internal3Text, url: internal3Url }
    ].filter(l => l.text && l.url),
    externalLink: externalText && externalUrl ? { text: externalText, url: externalUrl } : null
  });
}

// Now parse sheet 2 (blog posts)
const csvBlog = fs.readFileSync('sheet_1094889684.csv', 'utf-8');
const rowsBlog = parseCSV(csvBlog);
const headerBlog = rowsBlog[0].map(h => h.trim());

const blogPosts = [];
for (let i = 1; i < rowsBlog.length; i++) {
  const row = rowsBlog[i];
  const title = (row[0] || '').trim();
  if (!title || title === 'Blog Title') continue;

  const targetKeyword = (row[1] || '').trim();
  const seoTitle = (row[2] || '').trim();
  const rawContent = (row[3] || '').trim();
  const metaDesc = (row[4] || '').trim();
  const internal1Text = (row[5] || '').trim();
  const internal1Url = (row[6] || '').trim();
  const internal2Text = (row[7] || '').trim();
  const internal2Url = (row[8] || '').trim();
  const internal3Text = (row[9] || '').trim();
  const internal3Url = (row[10] || '').trim();
  const externalText = (row[11] || '').trim();
  const externalUrl = (row[12] || '').trim();
  const slug = (row[13] || '').trim();

  blogPosts.push({
    title,
    slug,
    targetKeyword,
    seoTitle,
    rawContent,
    metaDesc,
    internalLinks: [
      { text: internal1Text, url: internal1Url },
      { text: internal2Text, url: internal2Url },
      { text: internal3Text, url: internal3Url }
    ].filter(l => l.text && l.url),
    externalLink: externalText && externalUrl ? { text: externalText, url: externalUrl } : null
  });
}

const siteData = {
  mainPages,
  blogPosts
};

fs.writeFileSync('site_content.json', JSON.stringify(siteData, null, 2));
console.log(`Saved site_content.json: ${mainPages.length} main pages, ${blogPosts.length} blog posts`);
console.log('Main pages breakdown:');
console.log('- Home:', mainPages.filter(p => p.pageType === 'home').map(p => p.pageName));
console.log('- Services:', mainPages.filter(p => p.pageType === 'service').map(p => ({ name: p.pageName, slug: p.slug })));
console.log('- Locations:', mainPages.filter(p => p.pageType === 'location').map(p => ({ name: p.pageName, slug: p.slug })));
