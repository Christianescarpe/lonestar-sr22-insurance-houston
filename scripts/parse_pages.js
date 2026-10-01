const fs = require('fs');

// Simple CSV parser that handles quotes and newlines inside quotes
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
        currentRow.push(currentVal.trim());
        currentVal = '';
      } else if (c === '\r') {
        // ignore or check \n
      } else if (c === '\n') {
        currentRow.push(currentVal.trim());
        if (currentRow.some(cell => cell.length > 0)) {
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
    currentRow.push(currentVal.trim());
    if (currentRow.some(cell => cell.length > 0)) {
      rows.push(currentRow);
    }
  }
  return rows;
}

console.log('--- SHEET 1579314927 (Main Pages) ---');
const sheet1 = fs.readFileSync('sheet_1579314927.csv', 'utf-8');
const rows1 = parseCSV(sheet1);
const header1 = rows1[0];
console.log('Headers:', header1);
const pages1 = rows1.slice(1).map(r => ({
  page: r[0],
  keyword: r[1],
  seoTitle: r[2],
  contentLength: (r[3] || '').length,
  metaDesc: r[4],
  slug: r[13] || r[r.length - 1]
}));
console.log(`Found ${pages1.length} pages:`);
pages1.forEach((p, idx) => {
  console.log(`[${idx+1}] Page: "${p.page}" | Slug: "${p.slug}" | Title: "${p.seoTitle}"`);
});

console.log('\n--- SHEET 1094889684 (Blog / Other) ---');
const sheet2 = fs.readFileSync('sheet_1094889684.csv', 'utf-8');
const rows2 = parseCSV(sheet2);
const header2 = rows2[0];
console.log('Headers:', header2);
const pages2 = rows2.slice(1).map(r => ({
  title: r[0],
  keyword: r[1],
  seoTitle: r[2],
  contentLength: (r[3] || '').length,
  metaDesc: r[4],
  slug: r[13] || r[r.length - 1]
}));
console.log(`Found ${pages2.length} blog posts:`);
pages2.forEach((p, idx) => {
  console.log(`[${idx+1}] Title: "${p.title}" | Slug: "${p.slug}"`);
});
