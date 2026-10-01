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

const csv1 = fs.readFileSync('sheet_1579314927.csv', 'utf-8');
const rows1 = parseCSV(csv1);
console.log('Sheet 1 headers:', rows1[0]);

rows1.slice(1).forEach((r, idx) => {
  const pageName = r[0];
  if (!pageName || pageName === 'Page Title') return;
  console.log(`\n[Row ${idx+1}] Page: "${pageName}" | Slug: "${r[13]}"`);
  console.log(`  Anchor 1: text="${r[5]}" | url="${r[6]}"`);
  console.log(`  Anchor 2: text="${r[7]}" | url="${r[8]}"`);
  console.log(`  Anchor 3: text="${r[9]}" | url="${r[10]}"`);
  console.log(`  External: text="${r[11]}" | url="${r[12]}"`);
  
  // Check if these texts are in Content (r[3])
  const content = r[3] || '';
  console.log(`  In Content? A1: ${content.includes(r[5])}, A2: ${content.includes(r[7])}, A3: ${content.includes(r[9])}, Ext: ${content.includes(r[11])}`);
});

const csv2 = fs.readFileSync('sheet_1094889684.csv', 'utf-8');
const rows2 = parseCSV(csv2);
console.log('\nSheet 2 headers:', rows2[0]);

rows2.slice(1).forEach((r, idx) => {
  const title = r[0];
  if (!title || title === 'Blog Title') return;
  console.log(`\n[Blog Row ${idx+1}] Title: "${title}" | Slug: "${r[13]}"`);
  console.log(`  Anchor 1: text="${r[5]}" | url="${r[6]}"`);
  console.log(`  Anchor 2: text="${r[7]}" | url="${r[8]}"`);
  console.log(`  Anchor 3: text="${r[9]}" | url="${r[10]}"`);
  console.log(`  External: text="${r[11]}" | url="${r[12]}"`);
  
  const content = r[3] || '';
  console.log(`  In Content? A1: ${content.includes(r[5])}, A2: ${content.includes(r[7])}, A3: ${content.includes(r[9])}, Ext: ${content.includes(r[11])}`);
});
