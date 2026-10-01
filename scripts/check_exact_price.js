const http = require('http');
http.get('http://localhost:3000/guide-to-sr22-insurance-philadelphia', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Includes $35:', data.includes('$35'));
    console.log('Includes $65:', data.includes('$65'));
    console.log('Includes $95:', data.includes('$95'));
    console.log('Includes "Compare SR-22 Coverage Options":', data.includes('Compare SR-22 Coverage Options'));
  });
});
