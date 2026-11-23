const fs = require('node:fs');
const path = require('node:path');
const { projects } = require('../lib/content.ts');
const slugs = new Set();
for (const p of projects) {
  if (slugs.has(p.slug)) throw Error(`Duplicate slug ${p.slug}`);
  slugs.add(p.slug);
  if (!/^[a-z0-9-]+$/.test(p.slug)) throw Error(`Invalid slug ${p.slug}`);
  for (const key of ['title','shortTitle','description','category','role','status','summary']) if (!p[key]?.trim()) throw Error(`Missing ${key}: ${p.slug}`);
  for (const asset of [p.image,p.screenshot].filter(Boolean)) if (!fs.existsSync(path.join('public',asset))) throw Error(`Missing asset ${asset}`);
  for (const url of [p.code,p.externalUrl].filter(Boolean)) if (new URL(url).protocol !== 'https:') throw Error(`Invalid external link ${url}`);
}
for (const name of ['resume.pdf','fonts/body.ttf','fonts/display.ttf','images/hero.webp']) if (!fs.existsSync(path.join('public',name))) throw Error(`Missing ${name}`);
const originals=['sri-lalitha-signature-noodles','explainable-ecg-heartbeat-classification','tryfactor-product-strategy','indoharvest-exports','clinic-management-system','iloveinvoice','billing-software-for-cafe','shoplifting-detection-system','casting-surface-defect-detection','aws-serverless-chatbot','focusflow'];
for (const slug of originals) if (!slugs.has(slug)) throw Error(`Legacy route lost: ${slug}`);
console.log(`Validated ${projects.length} projects, local media, external URL shapes and all 11 legacy slugs.`);
