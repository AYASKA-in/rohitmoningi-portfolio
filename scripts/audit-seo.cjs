const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { projects } = require('../lib/content.ts');

// Audits the actual HTTP response, not hydrated browser metadata.
(async () => {
  const base = process.env.BASE_URL || 'http://127.0.0.1:3000';
  const canonicalOrigin = 'https://www.rohitmoningi.in';
  const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || (fs.existsSync(chrome) ? chrome : undefined) });
  const context = await browser.newContext();
  const parser = await context.newPage();
  const routes = ['', '/projects', '/about', '/contact', ...projects.map(p => `/projects/${p.slug}`)];
  const failures = [];
  const pages = [];
  const check = (condition, message) => { if (!condition) failures.push(message); };
  try {
    for (const route of routes) {
      const response = await context.request.get(base + route);
      const html = await response.text();
      const data = await parser.evaluate(source => {
        const doc = new DOMParser().parseFromString(source, 'text/html');
        const meta = key => doc.querySelector(`meta[name="${key}"],meta[property="${key}"]`)?.getAttribute('content') || '';
        const schemas = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'), s => JSON.parse(s.textContent));
        return {
          title: doc.querySelector('title')?.textContent || '', description: meta('description'),
          canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute('href'),
          canonicalCount: doc.querySelectorAll('link[rel="canonical"]').length,
          ogTitle: meta('og:title'), ogDescription: meta('og:description'), ogUrl: meta('og:url'), ogImage: meta('og:image'),
          twitterTitle: meta('twitter:title'), twitterDescription: meta('twitter:description'), twitterImage: meta('twitter:image'),
          robots: meta('robots'), h1: Array.from(doc.querySelectorAll('h1'), e => e.textContent.trim()),
          schemas, projectLinks: Array.from(doc.querySelectorAll('a[href^="/projects/"]'), a => a.getAttribute('href')),
          breadcrumbVisible: !!doc.querySelector('nav[aria-label="Breadcrumb"]'),
        };
      }, html);
      const expectedUrl = canonicalOrigin + route;
      const nodes = data.schemas.flatMap(schema => schema['@graph'] || [schema]);
      check(response.status() === 200, `${route || '/'} HTTP ${response.status()}`);
      check(data.title.includes('Rohit Moningi'), `${route} lacks a descriptive branded title`);
      check(data.description.length >= 60, `${route} has an empty or unhelpfully short description`);
      check(data.canonicalCount === 1 && data.canonical?.replace(/\/$/, '') === expectedUrl, `${route} canonical is not self-consistent`);
      check(data.ogUrl.replace(/\/$/, '') === expectedUrl, `${route} inherited the wrong Open Graph URL`);
      check(data.ogTitle === data.title && data.twitterTitle === data.title, `${route} social titles differ from its search title`);
      check(data.ogDescription === data.description && data.twitterDescription === data.description, `${route} inherited another page's social description`);
      check(data.ogImage.startsWith(`${expectedUrl}/opengraph-image`) && data.twitterImage.startsWith(`${expectedUrl}/opengraph-image`), `${route} does not have its own social image`);
      check(data.h1.length === 1, `${route} has ${data.h1.length} H1 headings`);
      check(!data.robots.includes('noindex'), `${route} unexpectedly blocks indexing`);
      check(nodes.some(n => n['@type'] === 'Person' && n.name === 'Rohit Moningi'), `${route} is missing the person entity`);
      check(nodes.some(n => n['@type'] === 'WebSite' && n.url === canonicalOrigin), `${route} is missing the website entity`);
      if (route) {
        const crumbs = nodes.find(n => n['@type'] === 'BreadcrumbList');
        check(data.breadcrumbVisible && !!crumbs, `${route} is missing visible/schema breadcrumbs`);
        check(crumbs?.itemListElement.at(-1).item === expectedUrl, `${route} breadcrumb ends at another URL`);
        check(crumbs?.itemListElement.every((item, i) => item.position === i + 1 && item.name && item.item.startsWith(canonicalOrigin)), `${route} has invalid breadcrumb positions or items`);
      }
      const project = projects.find(p => route === `/projects/${p.slug}`);
      if (project) {
        check(data.h1[0] === project.title, `${route} H1 does not identify the project`);
        check(nodes.some(n => n['@type'] === 'CreativeWork' && n.name === project.title && n.author?.['@id'] === `${canonicalOrigin}/#person`), `${route} lacks linked project authorship`);
      }
      if (route === '/about') {
        check(nodes.some(n => n['@type'] === 'ProfilePage' && n.mainEntity?.name === 'Rohit Moningi'), 'About is missing its profile entity');
        check(data.description.includes('upcoming') && data.description.includes('5 January 2027'), 'About metadata does not accurately date the upcoming role');
        check(html.includes('data-career-status="upcoming"') && /datetime="2027-01-05"/i.test(html), 'Upcoming role is not visible and machine-dated in server HTML');
        check(!nodes.some(n => n['@type'] === 'Person' && n.worksFor), 'Upcoming role must not become an asserted current employer');
        check(!html.includes('Rohit Moningi_OL.pdf') && !/annual CTC|Compensation details|Mandatory joining requirements/i.test(html), 'Private offer-letter details were exposed');
      }
      if (route === '/projects') {
        check(projects.every(p => data.projectLinks.includes(`/projects/${p.slug}`)), 'Catalogue does not expose every project link in server HTML');
        check(nodes.some(n => n['@type'] === 'CollectionPage' && n.mainEntity?.numberOfItems === projects.length), 'Catalogue schema has the wrong collection size');
      }
      const imageResponse = await context.request.get(base + route + '/opengraph-image');
      check(imageResponse.status() === 200 && (imageResponse.headers()['content-type'] || '').includes('image/png'), `${route} social image does not resolve as PNG`);
      pages.push({ route: route || '/', status: response.status(), ...data, socialImageStatus: imageResponse.status() });
    }
    check(new Set(pages.map(p => p.title)).size === pages.length, 'Duplicate titles');
    check(new Set(pages.map(p => p.description)).size === pages.length, 'Duplicate descriptions');
    const sitemap = await (await context.request.get(base + '/sitemap.xml')).text();
    for (const route of routes) check(sitemap.includes(`<loc>${canonicalOrigin + route}</loc>`), `Sitemap omits ${route || '/'}`);
    check((sitemap.match(/<loc>/g) || []).length === routes.length, 'Sitemap includes unexpected routes');
    const robots = await (await context.request.get(base + '/robots.txt')).text();
    check(robots.includes('Allow: /') && robots.includes(`${canonicalOrigin}/sitemap.xml`), 'Robots does not expose the canonical sitemap');
    for (const route of ['/not-a-page', '/projects/not-a-project']) {
      const response = await context.request.get(base + route);
      check(response.status() === 404, `${route} is a soft 404 (${response.status()})`);
      check(/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/.test(await response.text()), `${route} lacks noindex`);
    }
    const output = path.resolve(process.argv[2] || 'test-results/seo-audit.json');
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, JSON.stringify({ base, canonicalOrigin, testedPages: pages.length, status: failures.length ? 'fail' : 'pass', failures, pages }, null, 2));
    console.log(`${pages.length} pages audited: titles, descriptions, canonicals, Open Graph, Twitter, schema, headings, social images, sitemap and crawlable links.`);
    if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
    else console.log('All SEO checks passed. This validates markup and HTTP behavior; it does not measure search rankings.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
