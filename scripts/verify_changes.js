const http = require('http');

function fetch(url) {
  return new Promise(resolve => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, html: data }));
    });
  });
}

async function run() {
  console.log('--- 1. Testing /blogs route ---');
  const blogsRes = await fetch('http://localhost:3000/blogs');
  console.log('/blogs status:', blogsRes.status);
  console.log('/blogs has title "SR22 Insurance Blogs":', blogsRes.html.includes('SR22 Insurance Blogs'));
  console.log('/blogs has all 10 blog cards:', (blogsRes.html.match(/Read Full Article/g) || []).length);

  console.log('\n--- 2. Testing Blog Post (should NOT have price section) ---');
  const postRes = await fetch('http://localhost:3000/guide-to-sr22-insurance-philadelphia');
  console.log('Blog post status:', postRes.status);
  console.log('Blog post has "Compare SR-22 Coverage Options" (pricing title):', postRes.html.includes('Compare SR-22 Coverage Options'));
  console.log('Blog post has "$35" / "$65" / "$95":', postRes.html.includes('$35') || postRes.html.includes('$65'));

  console.log('\n--- 3. Testing Service Page (SHOULD have price section) ---');
  const serviceRes = await fetch('http://localhost:3000/non-owner-sr22-insurance-philadelphia-pa');
  console.log('Service page status:', serviceRes.status);
  console.log('Service page has "Compare SR-22 Coverage Options":', serviceRes.html.includes('Compare SR-22 Coverage Options'));

  console.log('\n--- 4. Testing Navbar Menu ---');
  console.log('Navbar has "Blogs" link:', blogsRes.html.includes('href="/blogs"') && blogsRes.html.includes('>Blogs<'));
  console.log('Navbar has "Guides &amp; FAQ" dropdown removed:', !blogsRes.html.includes('Guides &amp; FAQ') && !blogsRes.html.includes('Guides & FAQ'));
}

run();
