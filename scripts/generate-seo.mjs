#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, 'data');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const DEFAULT_SITE_URL = 'https://sadikcihanayaz.github.io';

function normalizeSiteUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) {
    return DEFAULT_SITE_URL;
  }

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, '');
}

function detectSiteUrl() {
  if (process.env.SITE_URL) {
    return normalizeSiteUrl(process.env.SITE_URL);
  }

  const cnamePath = path.join(ROOT, 'CNAME');
  if (fs.existsSync(cnamePath)) {
    const cname = fs.readFileSync(cnamePath, 'utf8').trim();
    if (cname) {
      return normalizeSiteUrl(`https://${cname}`);
    }
  }

  return DEFAULT_SITE_URL;
}

const SITE_URL = detectSiteUrl();
const entries = new Map();

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function resolveWebPath(webPath) {
  if (!webPath || typeof webPath !== 'string' || !webPath.startsWith('/')) {
    throw new Error(`Gecersiz web path: ${webPath}`);
  }
  return path.join(ROOT, webPath.slice(1));
}

function latestMtime(filePaths) {
  const mtimes = (filePaths || [])
    .filter(Boolean)
    .filter((filePath) => fs.existsSync(filePath))
    .map((filePath) => fs.statSync(filePath).mtime.getTime());

  if (mtimes.length === 0) {
    return new Date();
  }

  return new Date(Math.max(...mtimes));
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function addEntry(webPath, options = {}) {
  const {
    priority = '0.70',
    changefreq = 'weekly',
    sourceFiles = []
  } = options;

  const fullUrl = new URL(webPath, SITE_URL);
  const key = `${fullUrl.pathname}${fullUrl.search}`;
  const lastmodDate = latestMtime(sourceFiles).toISOString().slice(0, 10);

  const current = entries.get(key);
  if (!current) {
    entries.set(key, {
      loc: fullUrl.toString(),
      lastmod: lastmodDate,
      changefreq,
      priority
    });
    return;
  }

  if (lastmodDate > current.lastmod) {
    current.lastmod = lastmodDate;
  }
}

function collectStaticHtmlPages() {
  function walk(currentDir) {
    const children = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const child of children) {
      if (child.name === '.git' || child.name === 'node_modules') {
        continue;
      }

      const full = path.join(currentDir, child.name);
      if (child.isDirectory()) {
        walk(full);
        continue;
      }

      if (!/\.(html|htm)$/i.test(child.name)) {
        continue;
      }

      const relativePath = path.relative(ROOT, full).split(path.sep).join('/');
      const webPath = `/${relativePath}`;

      let priority = '0.55';
      let changefreq = 'monthly';

      if (relativePath === 'index.html') {
        priority = '1.00';
        changefreq = 'weekly';
      } else if (relativePath === 'learn.html' || relativePath === 'interview.html') {
        priority = '0.90';
        changefreq = 'weekly';
      }

      addEntry(webPath, {
        priority,
        changefreq,
        sourceFiles: [full]
      });
    }
  }

  walk(ROOT);

  const indexFile = path.join(ROOT, 'index.html');
  if (fs.existsSync(indexFile)) {
    addEntry('/', {
      priority: '1.00',
      changefreq: 'weekly',
      sourceFiles: [indexFile]
    });
  }
}

function collectLearningRoutes() {
  if (!fs.existsSync(CATEGORIES_FILE)) {
    return;
  }

  const categoriesData = readJson(CATEGORIES_FILE);
  const categories = categoriesData.categories || [];

  for (const category of categories) {
    const categoryId = category.id;
    const subcategoriesFile = resolveWebPath(category.subcategoriesFile);
    if (!fs.existsSync(subcategoriesFile)) {
      throw new Error(`Subcategory dosyasi bulunamadi: ${category.subcategoriesFile}`);
    }

    const categoryQuery = `/learn.html?category=${encodeURIComponent(categoryId)}`;
    addEntry(categoryQuery, {
      priority: '0.85',
      changefreq: 'weekly',
      sourceFiles: [CATEGORIES_FILE, subcategoriesFile]
    });

    const subcategoriesData = readJson(subcategoriesFile);
    const subcategories = subcategoriesData.subcategories || [];

    for (const subcategory of subcategories) {
      const subcategoryId = subcategory.id;
      const topicFile = resolveWebPath(subcategory.topicFile);
      const interviewsIndexFile = resolveWebPath(subcategory.interviewsFile);

      if (!fs.existsSync(topicFile)) {
        throw new Error(`Topic dosyasi bulunamadi: ${subcategory.topicFile}`);
      }
      if (!fs.existsSync(interviewsIndexFile)) {
        throw new Error(`Interview index dosyasi bulunamadi: ${subcategory.interviewsFile}`);
      }

      const subcategoryBase = `/learn.html?category=${encodeURIComponent(categoryId)}&subcategory=${encodeURIComponent(subcategoryId)}`;
      addEntry(subcategoryBase, {
        priority: '0.80',
        changefreq: 'weekly',
        sourceFiles: [subcategoriesFile, topicFile, interviewsIndexFile]
      });

      addEntry(`${subcategoryBase}&view=topic`, {
        priority: '0.78',
        changefreq: 'monthly',
        sourceFiles: [topicFile]
      });

      const interviewsData = readJson(interviewsIndexFile);
      const interviews = interviewsData.interviews || [];

      for (const interview of interviews) {
        const interviewFile = resolveWebPath(interview.file);
        if (!fs.existsSync(interviewFile)) {
          throw new Error(`Interview dosyasi bulunamadi: ${interview.file}`);
        }

        const interviewUrl =
          `/interview.html?category=${encodeURIComponent(categoryId)}` +
          `&subcategory=${encodeURIComponent(subcategoryId)}` +
          `&interview=${encodeURIComponent(interview.id)}`;

        addEntry(interviewUrl, {
          priority: '0.75',
          changefreq: 'monthly',
          sourceFiles: [interviewsIndexFile, interviewFile]
        });
      }
    }
  }
}

function writeSitemap() {
  const sortedEntries = [...entries.values()].sort((a, b) => a.loc.localeCompare(b.loc));

  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];

  for (const entry of sortedEntries) {
    lines.push('  <url>');
    lines.push(`    <loc>${xmlEscape(entry.loc)}</loc>`);
    lines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
    lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
    lines.push(`    <priority>${entry.priority}</priority>`);
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `${lines.join('\n')}\n`, 'utf8');
}

function writeRobots() {
  const content = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /data/',
    'Disallow: /scripts/',
    'Disallow: /.github/',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    ''
  ].join('\n');

  fs.writeFileSync(path.join(ROOT, 'robots.txt'), content, 'utf8');
}

function run() {
  collectStaticHtmlPages();
  collectLearningRoutes();
  writeSitemap();
  writeRobots();
  console.log(`SEO files generated. URL count: ${entries.size}`);
  console.log(`Site URL: ${SITE_URL}`);
}

run();
