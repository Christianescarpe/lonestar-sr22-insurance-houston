const fs = require('fs');

const content1 = fs.readFileSync('sheet_1579314927.csv', 'utf-8');
const lines = content1.split('\n');
console.log('--- Matches in Sheet 1 ---');
lines.forEach((l, i) => {
  if (l.includes('310-0435') || l.includes('(267)')) {
    console.log(`Line ${i}:`, l.slice(0, 200));
  }
});

const content2 = fs.readFileSync('sheet_1094889684.csv', 'utf-8');
console.log('--- Matches in Sheet 2 ---');
const lines2 = content2.split('\n');
lines2.forEach((l, i) => {
  if (l.includes('310-0435') || l.includes('(267)')) {
    console.log(`Line ${i}:`, l.slice(0, 200));
  }
});
