#!/usr/bin/env node
/* ============================================================
   Soltani Art — static build script
   Generates, from data.js (single source of truth):
     - /artworks/{slug}/index.html  (crawlable, bilingual, SSR'd artwork pages)
     - /sitemap.xml                 (homepage + every artwork route)

   netlify.toml is COMMITTED SOURCE CONFIGURATION, not a build output: Netlify
   reads netlify.toml before it runs the build command, so redirects generated
   during this same build would not take effect until the *next* deployment.
   The default run below only VALIDATES that netlify.toml already has a redirect
   for every slug in data.js and fails the build if one is missing. To add/update
   the redirects themselves, deliberately run this locally with --update-redirects
   and commit the resulting netlify.toml.

   Plain Node.js, no dependencies.
     node scripts/build.js                    # generate pages + sitemap, validate netlify.toml
     node scripts/build.js --update-redirects # also rewrite netlify.toml's redirects (local only)
   ============================================================ */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE_ORIGIN = 'https://soltaniart.com';
const works = require(path.join(ROOT, 'data.js'));
const NETLIFY_TOML_PATH = path.join(ROOT, 'netlify.toml');

/* Homepage lastmod — bump only when the homepage's own content changes. */
const HOME_LASTMOD = '2026-08-28';

/* ---------- small helpers ---------- */
function assetUrl(src) {
  if (/^https?:\/\//.test(src) || src.startsWith('/')) return src;
  return `/${src}`;
}
function escAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
function stripHtml(str) {
  return String(str).replace(/<[^>]*>/g, '');
}
function truncate(str, max) {
  const clean = str.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + '\u2026';
}
function metaDescriptionFor(work) {
  if (work.desc_en && work.desc_en.trim()) return work.desc_en.trim();
  return truncate(stripHtml(work.concept_en || ''), 160);
}
function youtubeEmbedSrc(src) {
  const m = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}?rel=0` : null;
}
function categoryLabel(work) {
  return work.category === 'original'
    ? { en: 'Original', de: 'Original' }
    : { en: 'Hand-Painted Reproduction', de: 'Reproduktion' };
}
/* Optional template slots (badges, subtitles, process/related sections) can
   render as '', which otherwise leaves whitespace-only lines in the output. */
function stripTrailingWhitespace(str) {
  return str.replace(/[ \t]+$/gm, '');
}

/* ---------- bilingual markup builders ---------- */
function mediaSlideFigure(m) {
  if (m.type === 'video') {
    const yt = youtubeEmbedSrc(m.src);
    if (yt) {
      return `<figure class="artwork__slide-fig"><iframe src="${yt}" title="${escAttr(m.alt || '')}" allowfullscreen loading="lazy"></iframe></figure>`;
    }
    return `<figure class="artwork__slide-fig"><video src="${assetUrl(m.src)}" controls preload="metadata" playsinline></video></figure>`;
  }
  return `<figure class="artwork__slide-fig"><img src="${assetUrl(m.src)}" alt="${escAttr(m.alt || '')}" loading="lazy"></figure>`;
}

function sliderHTML(media) {
  const isMulti = media.length > 1;
  const inner = isMulti
    ? `<div class="swiper-wrapper">
        ${media.map(m => `<div class="swiper-slide">${mediaSlideFigure(m)}</div>`).join('')}
      </div>
      <button class="swiper-button-prev" aria-label="Previous"></button>
      <button class="swiper-button-next" aria-label="Next"></button>
      <div class="swiper-pagination"></div>`
    : mediaSlideFigure(media[0]);
  return `<div class="artwork__slider${isMulti ? ' swiper' : ''}">${inner}</div>`;
}

function processHTML(work) {
  const procItems = work.process || [];
  if (!procItems.length) return '';
  const isMulti = procItems.length > 1;
  const inner = isMulti
    ? `<div class="swiper-wrapper">
        ${procItems.map(m => `<div class="swiper-slide">${mediaSlideFigure(m)}</div>`).join('')}
      </div>
      <button class="swiper-button-prev" aria-label="Previous"></button>
      <button class="swiper-button-next" aria-label="Next"></button>
      <div class="swiper-pagination"></div>`
    : mediaSlideFigure(procItems[0]);
  return `
    <section class="artwork__process">
      <h2 class="section-title"><span class="lang-en">Process &amp; Creation</span><span class="lang-de hidden">Prozess &amp; Entstehung</span></h2>
      <div class="artwork__process-slider${isMulti ? ' swiper' : ''}">${inner}</div>
    </section>`;
}

function conceptParagraphsHTML(work) {
  const enSrc = work.concept_en || work.desc_en || '';
  const deSrc = work.concept_de || work.desc_de || '';
  const enParas = enSrc.split('\n').map(p => p.trim()).filter(Boolean);
  const deParas = deSrc.split('\n').map(p => p.trim()).filter(Boolean);
  const max = Math.max(enParas.length, deParas.length);
  let html = '';
  for (let i = 0; i < max; i++) {
    if (enParas[i]) html += `<p class="lang-en">${enParas[i]}</p>`;
    if (deParas[i]) html += `<p class="lang-de hidden">${deParas[i]}</p>`;
  }
  return html;
}

function cardHTML(work, index) {
  const cover = work.media[0];
  const badge = work.inProgress
    ? `<span class="card-badge"><span class="lang-en">In Progress</span><span class="lang-de hidden">In Arbeit</span></span>`
    : '';
  const subtitle = work.subtitle_en
    ? `<p class="art-card__subtitle"><span class="lang-en">${work.subtitle_en}</span><span class="lang-de hidden">${work.subtitle_de}</span></p>`
    : '';
  return `
    <a href="/artworks/${work.slug}/" class="art-card fade-in" style="animation-delay:${index * 70}ms" aria-label="${escAttr(work.title_en)}">
      <figure class="art-card__media">
        <img src="${assetUrl(cover.src)}" alt="${escAttr(work.title_en)}" loading="lazy">
        ${badge}
      </figure>
      <figcaption class="art-card__caption">
        <h3 class="art-card__title"><span class="lang-en">${work.title_en}</span><span class="lang-de hidden">${work.title_de}</span></h3>
        ${subtitle}
        <p class="art-card__meta"><span class="lang-en">${work.medium_en}</span><span class="lang-de hidden">${work.medium_de}</span> \u00b7 ${escAttr(work.size)} \u00b7 ${escAttr(work.year)}</p>
      </figcaption>
    </a>`;
}

function relatedWorksHTML(work) {
  const sameCat = works.filter(w => w.slug !== work.slug && w.category === work.category);
  const fallback = works.filter(w => w.slug !== work.slug && w.category !== work.category);
  const relatedAll = [...sameCat, ...fallback].slice(0, 4);
  return `
    <section class="artwork__related">
      <h2 class="section-title"><span class="lang-en">Related Works</span><span class="lang-de hidden">Verwandte Werke</span></h2>
      <div class="related-grid">
        ${relatedAll.map((w, i) => cardHTML(w, i)).join('')}
      </div>
    </section>`;
}

/* ---------- full page ---------- */
function renderArtworkPage(work) {
  const canonicalUrl = `${SITE_ORIGIN}/artworks/${work.slug}/`;
  const imageUrl = `${SITE_ORIGIN}${assetUrl(work.media[0].src)}`;
  const title = `${work.title_en} \u2014 Hamidreza Soltani`;
  const metaDesc = metaDescriptionFor(work);
  const cat = categoryLabel(work);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: work.title_en,
    artMedium: work.medium_en,
    artworkSurface: 'Canvas',
    artform: 'Painting',
    creator: { '@type': 'Person', name: 'Hamidreza Soltani' },
    dateCreated: work.year,
    image: imageUrl,
    url: canonicalUrl,
    description: metaDesc
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${SITE_ORIGIN}/#portfolio` },
      { '@type': 'ListItem', position: 3, name: work.title_en, item: canonicalUrl }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${escAttr(metaDesc)}">
  <meta name="author" content="Hamidreza Soltani">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#b08a4f">

  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Hamidreza Soltani">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${escAttr(title)}">
  <meta property="og:description" content="${escAttr(metaDesc)}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:locale" content="en_US">
  <meta property="og:locale:alternate" content="de_DE">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escAttr(title)}">
  <meta name="twitter:description" content="${escAttr(metaDesc)}">
  <meta name="twitter:image" content="${imageUrl}">

  <link rel="icon" href="/images/favicon.png" type="image/png">
  <link rel="canonical" href="${canonicalUrl}">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
  <link rel="stylesheet" href="/styles.css">

  <script type="application/ld+json">${JSON.stringify(ld)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
</head>
<body>

  <header class="site-header">
    <div class="site-header__inner">
      <a href="/" class="brand">
        <img src="/images/logo.jpeg" alt="">
        <span class="brand__name">Hamidreza Soltani</span>
      </a>

      <button class="nav-burger" id="nav-burger" aria-expanded="false" aria-controls="nav-links" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>

      <nav id="nav-links" class="nav-links">
        <a href="/#featured"><span class="lang-en">Featured</span><span class="lang-de">Aktuelles</span></a>
        <a href="/#about"><span class="lang-en">About</span><span class="lang-de">Über</span></a>
        <a href="/#portfolio"><span class="lang-en">Portfolio</span><span class="lang-de">Portfolio</span></a>
        <a href="/#process"><span class="lang-en">Process</span><span class="lang-de">Prozess</span></a>
        <a href="/#cv"><span class="lang-en">CV</span><span class="lang-de">Lebenslauf</span></a>
        <a href="/#contact"><span class="lang-en">Contact</span><span class="lang-de">Kontakt</span></a>
      </nav>

      <div class="lang-switch" role="group" aria-label="Language">
        <button onclick="switchLanguage('en')" id="btn-en" aria-label="English"><img src="/images/en.svg" alt="EN"></button>
        <button onclick="switchLanguage('de')" id="btn-de" aria-label="Deutsch"><img src="/images/de.svg" alt="DE"></button>
      </div>
    </div>
  </header>

  <main id="artwork-mount">
    <article class="artwork">
      <nav class="artwork__crumbs">
        <a href="/"><span class="lang-en">Home</span><span class="lang-de hidden">Start</span></a>
        <span>/</span>
        <a href="/#portfolio">Portfolio</a>
        <span>/</span>
        <span class="artwork__crumbs-current"><span class="lang-en">${work.title_en}</span><span class="lang-de hidden">${work.title_de}</span></span>
      </nav>

      ${sliderHTML(work.media)}

      <section class="artwork__info">
        <div class="artwork__info-left">
          <span class="eyebrow">
            <span class="lang-en">${cat.en}${work.inProgress ? ' \u00b7 In Progress' : ''}</span>
            <span class="lang-de hidden">${cat.de}${work.inProgress ? ' \u00b7 In Arbeit' : ''}</span>
          </span>
          <h1 class="display"><span class="lang-en">${work.title_en}</span><span class="lang-de hidden">${work.title_de}</span></h1>
          ${work.subtitle_en ? `<p class="artwork__subtitle"><span class="lang-en">${work.subtitle_en}</span><span class="lang-de hidden">${work.subtitle_de}</span></p>` : ''}
        </div>
        <dl class="artwork__info-grid">
          <div><dt><span class="lang-en">Year</span><span class="lang-de hidden">Jahr</span></dt><dd>${escAttr(work.year)}</dd></div>
          <div><dt><span class="lang-en">Medium</span><span class="lang-de hidden">Technik</span></dt><dd><span class="lang-en">${work.medium_en}</span><span class="lang-de hidden">${work.medium_de}</span></dd></div>
          <div><dt><span class="lang-en">Dimensions</span><span class="lang-de hidden">Ma\u00dfe</span></dt><dd>${escAttr(work.size)}</dd></div>
          <div><dt><span class="lang-en">Category</span><span class="lang-de hidden">Kategorie</span></dt><dd><span class="lang-en">${cat.en}</span><span class="lang-de hidden">${cat.de}</span></dd></div>
        </dl>
      </section>

      <section class="artwork__concept">
        <h2 class="section-title"><span class="lang-en">Concept</span><span class="lang-de hidden">Konzept</span></h2>
        ${conceptParagraphsHTML(work)}
      </section>

      ${processHTML(work)}

      ${relatedWorksHTML(work)}

      <div class="artwork__cta-row">
        <a class="btn btn-primary" href="/#contact"><span class="lang-en">Inquire about this work</span><span class="lang-de hidden">Werk anfragen</span></a>
        <a class="btn btn-ghost" href="/#portfolio"><span class="lang-en">\u2190 Back to portfolio</span><span class="lang-de hidden">\u2190 Zur\u00fcck zum Portfolio</span></a>
      </div>
    </article>
  </main>

  <footer class="site-footer">
    <div class="site-footer__inner">
      <p><span class="lang-en">\u00a9 2026 Hamidreza Soltani \u00b7 Berlin, Germany</span><span class="lang-de hidden">\u00a9 2026 Hamidreza Soltani \u00b7 Berlin, Deutschland</span></p>
      <p><span class="lang-en">Original Paintings &amp; Masterpiece Reproductions</span><span class="lang-de hidden">Originalgem\u00e4lde &amp; handgemalte Meisterwerk-Reproduktionen</span></p>
      <ul class="site-footer__social" aria-label="Social media">
        <li>
          <a href="https://www.instagram.com/soltani.art/" target="_blank" rel="noopener noreferrer" aria-label="Instagram \u2014 @soltani.art" title="Instagram">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
              <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="1.6"/>
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/>
              <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor"/>
            </svg>
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/@AlmostRoutine" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
              <path d="M9.75 15.02V8.98L15.5 12l-5.75 3.02z" fill="currentColor"/>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
  <script src="/data.js"></script>
  <script src="/script.js"></script>
</body>
</html>
`;
}

/* ---------- sitemap.xml ---------- */
/* Each work's lastmod comes only from its own explicit `updated` field in
   data.js (omitted entirely if absent) — never from the current date, so
   re-running the build without source changes is byte-for-byte identical. */
function buildSitemap() {
  const urls = [
    { loc: `${SITE_ORIGIN}/`, lastmod: HOME_LASTMOD, priority: '1.0' },
    ...works.map(w => ({
      loc: `${SITE_ORIGIN}/artworks/${w.slug}/`,
      lastmod: w.updated || null,
      priority: w.featured ? '0.8' : '0.7'
    }))
  ];
  const body = urls.map(u => {
    const lastmodLine = u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : '';
    return `  <url>\n    <loc>${u.loc}</loc>${lastmodLine}\n    <changefreq>monthly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

/* ---------- netlify.toml ---------- */
/* Only called when explicitly run with --update-redirects (see main()). */
function buildNetlifyToml() {
  const slugRules = works.map(w => `[[redirects]]
  from = "/artwork.html"
  query = {slug = "${w.slug}"}
  to = "/artworks/${w.slug}/"
  status = 301
  force = true
`).join('\n');

  return `# This file is COMMITTED SOURCE CONFIGURATION. Netlify reads netlify.toml
# BEFORE running the build command, so it must already contain a redirect for
# every artwork slug — a redirect generated during the build itself would not
# take effect until the next deployment.
#
# To add/rename/remove an artwork: update data.js, then run
#   node scripts/build.js --update-redirects
# locally, review the diff, and commit this file. The normal build (also run
# by Netlify, see [build] below) only validates this file against data.js and
# fails loudly if a slug's redirect is missing.

[build]
  command = "node scripts/build.js"
  publish = "."

# --- Canonical homepage: /index.html -> / ---
[[redirects]]
  from = "/index.html"
  to = "/"
  status = 301
  force = true

# --- Legacy query-based artwork URLs -> clean canonical routes ---
${slugRules}
# --- /artwork.html with no slug, or a slug that isn't listed above: real 404 ---
[[redirects]]
  from = "/artwork.html"
  to = "/404.html"
  status = 404
  force = true

# --- /artworks/{slug}/ for an unknown slug: real 404 (known slugs are served as static files and take precedence) ---
[[redirects]]
  from = "/artworks/*"
  to = "/404.html"
  status = 404

# --- Security headers (applied to every response) ---
[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "SAMEORIGIN"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"

# --- Long-lived caching for immutable image assets ---
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
`;
}

/* Fail loudly if the *committed* netlify.toml doesn't already match data.js,
   instead of silently regenerating redirects Netlify won't read until the
   next deploy. */
function validateNetlifyToml() {
  if (!fs.existsSync(NETLIFY_TOML_PATH)) {
    throw new Error('netlify.toml is missing. Run `node scripts/build.js --update-redirects` locally and commit the result.');
  }
  const toml = fs.readFileSync(NETLIFY_TOML_PATH, 'utf8');

  const missing = works.map(w => w.slug).filter(slug => !toml.includes(`query = {slug = "${slug}"}`));
  if (missing.length) {
    throw new Error(
      `netlify.toml is missing a redirect for ${missing.length} slug(s): ${missing.join(', ')}.\n` +
      'Netlify reads netlify.toml before running the build, so a redirect added only ' +
      'during this build would not take effect until the next deployment.\n' +
      'Fix: run `node scripts/build.js --update-redirects` locally, review the diff, and commit netlify.toml.'
    );
  }

  const fallbackIndex = toml.indexOf('from = "/artwork.html"\n  to = "/404.html"');
  const wildcardIndex = toml.indexOf('from = "/artworks/*"');
  if (fallbackIndex === -1 || wildcardIndex === -1) {
    throw new Error('netlify.toml is missing the /artwork.html or /artworks/* 404 fallback redirects.');
  }
  for (const slug of works.map(w => w.slug)) {
    const slugIndex = toml.indexOf(`query = {slug = "${slug}"}`);
    if (slugIndex > fallbackIndex) {
      throw new Error(`netlify.toml redirect for slug "${slug}" appears after the /artwork.html fallback — exact-slug rules must come first.`);
    }
  }
}

/* ---------- write files ---------- */
function main() {
  const updateRedirects = process.argv.includes('--update-redirects');

  let generated = 0;
  for (const work of works) {
    const dir = path.join(ROOT, 'artworks', work.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), stripTrailingWhitespace(renderArtworkPage(work)), 'utf8');
    generated++;
  }
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), stripTrailingWhitespace(buildSitemap()), 'utf8');

  if (updateRedirects) {
    fs.writeFileSync(NETLIFY_TOML_PATH, stripTrailingWhitespace(buildNetlifyToml()), 'utf8');
  }

  validateNetlifyToml();

  console.log(
    `Generated ${generated} artwork pages and sitemap.xml. ` +
    (updateRedirects ? 'netlify.toml redirects updated — review the diff and commit it.' : 'netlify.toml validated against data.js (not rewritten).')
  );
}

try {
  main();
} catch (err) {
  console.error(`Build failed: ${err.message}`);
  process.exit(1);
}
