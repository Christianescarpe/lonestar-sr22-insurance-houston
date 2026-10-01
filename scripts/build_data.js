const fs = require('fs');
const path = require('path');

const rawSiteData = JSON.parse(fs.readFileSync('site_content.json', 'utf-8'));

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Build target mapping
const targetToSlug = {
  'homepage': '/',
  'sr22 insurance philadelphia, pa': '/',
  'sr22 insurance philadelphia pa': '/',
  'https://sr22insurancephiladelphia.site/': '/',
  'https://sr22insurancephiladelphia.site': '/',
  'http://sr22insurancephiladelphia.site/': '/',
  'http://sr22insurancephiladelphia.site': '/'
};

// Map main pages
rawSiteData.mainPages.forEach(p => {
  if (p.slug) {
    targetToSlug[p.pageName.toLowerCase()] = `/${p.slug}`;
    targetToSlug[p.slug.toLowerCase()] = `/${p.slug}`;
  }
});

// Map blog posts
rawSiteData.blogPosts.forEach(b => {
  if (b.slug) {
    targetToSlug[b.title.toLowerCase()] = `/${b.slug}`;
    targetToSlug[b.slug.toLowerCase()] = `/${b.slug}`;
    targetToSlug[`/${b.slug.toLowerCase()}`] = `/${b.slug}`;
  }
});

function resolveUrl(target) {
  if (!target) return '/';
  const clean = target.trim().toLowerCase();
  if (targetToSlug[clean]) return targetToSlug[clean];
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    // If it points to the site domain, map to /
    if (clean.includes('sr22insurancephiladelphia.site')) {
      const pathPart = clean.replace(/^https?:\/\/[^\/]+/, '');
      return pathPart || '/';
    }
    return target.trim();
  }
  if (clean.startsWith('/')) {
    const slugOnly = clean.replace(/^\//, '');
    if (targetToSlug[slugOnly]) return targetToSlug[slugOnly];
    return clean;
  }
  for (const key of Object.keys(targetToSlug)) {
    if (clean.includes(key) || key.includes(clean)) {
      return targetToSlug[key];
    }
  }
  return `/${clean.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
}

const insuranceImages = [
  '/images/insurance-agent-reviewing-car-coverage-with-custom-2026-01-08-07-32-47-utc.webp',
  '/images/car-insurance-coverage-with-protection-concept-2026-01-08-08-12-25-utc.webp',
  '/images/signing-auto-insurance-document-with-car-key-and-c-2026-01-06-09-05-16-utc.webp',
  '/images/car-insurance-concept-toy-car-covered-by-umbrella-2026-03-26-23-19-45-utc.webp',
  '/images/protecting-a-toy-car-with-hands-insurance-concept-2026-01-07-02-05-26-utc.webp',
  '/images/car-insurance-agreement-with-toy-car-and-keys-2026-01-08-07-27-34-utc.webp',
  '/images/insurance-concept-of-person-protecting-blue-car-wi-2026-08-04-06-18-31-utc.webp',
  '/images/insurance-adjuster-inspecting-damage-after-car-cra-2026-01-05-05-08-40-utc.webp',
  '/images/man-holding-insurance-document-in-a-corporate-sett-2026-01-09-11-36-08-utc.webp',
  '/images/woman-inspecting-damage-car-after-auto-accident-2026-03-27-03-00-53-utc.webp',
  '/images/car-insurance-protection-covered-by-an-umbrella-2026-01-08-08-12-25-utc.webp',
  '/images/car-insurance-form-on-a-tablet-device-2026-01-08-07-15-09-utc.webp'
];

function injectLinks(html, internalLinks, externalLink) {
  let res = html;
  
  // Style any existing <a> tags in html to ensure they have the exact link styling classes
  res = res.replace(/<a\s+([^>]*?)>/gi, (match, attrs) => {
    let newAttrs = attrs;
    // Normalize href if needed
    const hrefMatch = newAttrs.match(/href=["']([^"']*)["']/i);
    if (hrefMatch) {
      const originalHref = hrefMatch[1];
      const resolved = resolveUrl(originalHref);
      newAttrs = newAttrs.replace(/href=["'][^"']*["']/i, `href="${resolved}"`);
    }
    // Ensure class is added
    if (/class=["'][^"']*["']/i.test(newAttrs)) {
      newAttrs = newAttrs.replace(/class=["']([^"']*)["']/i, 'class="$1 text-blue-600 hover:text-red-600 font-semibold underline decoration-blue-300 hover:decoration-red-600 transition-colors"');
    } else {
      newAttrs += ' class="text-blue-600 hover:text-red-600 font-semibold underline decoration-blue-300 hover:decoration-red-600 transition-colors"';
    }
    return `<a ${newAttrs}>`;
  });

  // Inject internal links if they are not already linked
  if (internalLinks && internalLinks.length) {
    for (const link of internalLinks) {
      if (!link.text) continue;
      const targetHref = resolveUrl(link.url);
      // Replace only the first unlinked occurrence
      const escapedText = link.text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(?<!<a[^>]*>)(?:\\b)(${escapedText})(?:\\b)(?![^<]*<\\/a>)`, 'i');
      if (regex.test(res)) {
        res = res.replace(regex, `<a href="${targetHref}" class="text-blue-600 hover:text-red-600 font-semibold underline decoration-blue-300 hover:decoration-red-600 transition-colors">$1</a>`);
      }
    }
  }

  // Inject external link if not already linked (first occurrence only)
  if (externalLink && externalLink.text && externalLink.url) {
    const escapedText = externalLink.text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(?<!<a[^>]*>)(?:\\b)(${escapedText})(?:\\b)(?![^<]*<\\/a>)`, 'i');
    if (regex.test(res)) {
      res = res.replace(regex, `<a href="${externalLink.url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-red-600 font-semibold underline decoration-blue-300 hover:decoration-red-600 transition-colors">$1</a>`);
    }
  }

  return res;
}

function parsePageSections(rawContent, pageData, imageIndex) {
  let heroTitle = pageData.pageName || pageData.title;
  const h1Match = rawContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    heroTitle = h1Match[1].trim();
  }

  const contentWithoutH1 = rawContent.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '').trim();
  const h2Parts = contentWithoutH1.split(/(?=<h2[^>]*>)/i);
  
  let introHtml = '';
  const sections = [];
  const tableOfContents = [];

  h2Parts.forEach((part, idx) => {
    const trimmed = part.trim();
    if (!trimmed) return;
    
    const h2Match = trimmed.match(/^<h2[^>]*>([\s\S]*?)<\/h2>/i);
    if (h2Match) {
      const heading = h2Match[1].trim();
      const sectionId = slugify(heading) || `section-${idx}`;
      const body = trimmed.replace(/^<h2[^>]*>[\s\S]*?<\/h2>/i, '').trim();
      
      const isFaq = heading.toLowerCase().includes('faq') || heading.toLowerCase().includes('frequently asked questions');
      const faqs = [];
      
      if (isFaq) {
        const h3Parts = body.split(/(?=<h3[^>]*>)/i);
        h3Parts.forEach(h3p => {
          const h3Match = h3p.match(/^<h3[^>]*>([\s\S]*?)<\/h3>/i);
          if (h3Match) {
            faqs.push({
              question: h3Match[1].trim(),
              answer: injectLinks(h3p.replace(/^<h3[^>]*>[\s\S]*?<\/h3>/i, '').trim(), pageData.internalLinks, pageData.externalLink)
            });
          }
        });
      }

      sections.push({
        id: sectionId,
        heading,
        isFaq,
        faqs,
        bodyHtml: injectLinks(body, pageData.internalLinks, pageData.externalLink)
      });

      tableOfContents.push({
        id: sectionId,
        title: heading
      });
    } else {
      introHtml = injectLinks(trimmed, pageData.internalLinks, pageData.externalLink);
    }
  });

  const fullLinkedHtml = injectLinks(rawContent, pageData.internalLinks, pageData.externalLink);
  const selectedImage = insuranceImages[imageIndex % insuranceImages.length];

  // Resolve internal links array so they have explicit targetUrl
  const resolvedInternalLinks = (pageData.internalLinks || []).map(link => ({
    text: link.text,
    targetTitle: link.url,
    url: resolveUrl(link.url)
  }));

  const resolvedExternalLink = pageData.externalLink ? {
    text: pageData.externalLink.text,
    url: pageData.externalLink.url
  } : null;

  return {
    heroTitle,
    introHtml,
    sections,
    tableOfContents,
    fullLinkedHtml,
    internalAnchorsList: resolvedInternalLinks,
    externalAnchorItem: resolvedExternalLink,
    image: selectedImage
  };
}

// Process main pages
const processedMainPages = rawSiteData.mainPages.map((p, idx) => {
  const parsed = parsePageSections(p.rawContent, p, idx);
  return {
    pageName: p.pageName,
    title: p.pageName,
    slug: p.slug,
    pageType: p.pageType,
    targetKeyword: p.targetKeyword,
    seoTitle: p.seoTitle,
    rawContent: p.rawContent,
    metaDesc: p.metaDesc,
    internalLinks: p.internalLinks,
    externalLink: p.externalLink,
    ...parsed
  };
});

// Process blog posts
const processedBlogPosts = rawSiteData.blogPosts.map((b, idx) => {
  const parsed = parsePageSections(b.rawContent, b, idx + processedMainPages.length);
  return {
    pageName: b.title,
    title: b.title,
    slug: b.slug,
    pageType: 'blog',
    targetKeyword: b.targetKeyword,
    seoTitle: b.seoTitle,
    rawContent: b.rawContent,
    metaDesc: b.metaDesc,
    internalLinks: b.internalLinks,
    externalLink: b.externalLink,
    ...parsed
  };
});

const completeData = {
  phoneNumber: '+1 (267) 310-0435',
  phoneTel: '+12673100435',
  companyName: 'LoneStar SR22 Insurance Houston',
  mainPages: processedMainPages,
  blogPosts: processedBlogPosts,
  allPages: [...processedMainPages, ...processedBlogPosts],
  services: processedMainPages.filter(p => p.pageType === 'service'),
  locations: processedMainPages.filter(p => p.pageType === 'location')
};

const dataDir = path.join(__dirname, '..', 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(path.join(dataDir, 'siteData.json'), JSON.stringify(completeData, null, 2));
console.log('Successfully re-generated src/data/siteData.json with tableOfContents, section IDs, and resolved internalAnchorsList');
