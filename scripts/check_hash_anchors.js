const fs = require('fs');

const csv1 = fs.readFileSync('sheet_1579314927.csv', 'utf-8');
const csv2 = fs.readFileSync('sheet_1094889684.csv', 'utf-8');

console.log('--- Search for # in sheet 1 ---');
const hashMatches1 = csv1.match(/href=["']#[^"']*["']/gi) || [];
console.log('href="#" matches in sheet 1:', hashMatches1);

const idMatches1 = csv1.match(/id=["'][^"']+["']/gi) || [];
console.log('id="" matches in sheet 1:', idMatches1);

console.log('--- Search for # in sheet 2 ---');
const hashMatches2 = csv2.match(/href=["']#[^"']*["']/gi) || [];
console.log('href="#" matches in sheet 2:', hashMatches2);

const idMatches2 = csv2.match(/id=["'][^"']+["']/gi) || [];
console.log('id="" matches in sheet 2:', idMatches2);
