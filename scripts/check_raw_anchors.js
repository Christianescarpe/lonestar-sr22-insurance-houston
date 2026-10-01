const fs = require('fs');

const rawCSV1 = fs.readFileSync('sheet_1579314927.csv', 'utf-8');
const lines1 = rawCSV1.split('\n');
console.log('--- Checking first row of sheet 1 ---');
// Let's see if the word 'anchor' or 'href' appears anywhere in sheet 1
const hrefMatches1 = rawCSV1.match(/<a[\s\S]*?<\/a>/gi) || [];
console.log('Total <a ...> in sheet 1 raw CSV:', hrefMatches1.length);
hrefMatches1.forEach((m, idx) => console.log(`  [${idx+1}]`, m));

const rawCSV2 = fs.readFileSync('sheet_1094889684.csv', 'utf-8');
const hrefMatches2 = rawCSV2.match(/<a[\s\S]*?<\/a>/gi) || [];
console.log('Total <a ...> in sheet 2 raw CSV:', hrefMatches2.length);
console.log('First 5 in sheet 2:');
hrefMatches2.slice(0, 5).forEach((m, idx) => console.log(`  [${idx+1}]`, m));
