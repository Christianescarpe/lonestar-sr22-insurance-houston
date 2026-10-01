const http = require('http');
http.get('http://localhost:3000/guide-to-sr22-insurance-philadelphia', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const idx35 = data.indexOf('$35');
    if (idx35 !== -1) {
      console.log('Snippet around $35:');
      console.log(data.slice(idx35 - 100, idx35 + 100));
    }
  });
});
