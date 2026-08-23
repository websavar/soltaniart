/* ============================================================
   Soltani Art — Shared site script
   - Bilingual (EN / DE) with localStorage persistence
   - Single source of truth for artworks
   - Renders portfolio + featured + artwork detail page
   ============================================================ */

if (typeof tailwind !== 'undefined') {
  tailwind.config = { theme: { extend: { colors: { accent: '#b08a4f' } } } };
}

/* ---------- i18n state ---------- */
const LANG_KEY = 'soltani.lang';
let currentLang = (typeof localStorage !== 'undefined' && localStorage.getItem(LANG_KEY)) || 'en';

/* ---------- Dataset ---------- */
/* works[] is defined in data.js, loaded before this script. */

/* ---------- i18n helpers ---------- */
function t(work, field) {
  return work[`${field}_${currentLang}`] ?? work[`${field}_en`];
}

function applyLanguage() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll('.lang-en').forEach(el => el.classList.toggle('hidden', currentLang !== 'en'));
  document.querySelectorAll('.lang-de').forEach(el => el.classList.toggle('hidden', currentLang !== 'de'));

  // Disable inactive-language form fields so only the visible ones are submitted
  document.querySelectorAll('form input, form textarea').forEach(el => {
    el.disabled = el.classList.contains('hidden');
  });

  const enBtn = document.getElementById('btn-en');
  const deBtn = document.getElementById('btn-de');
  if (enBtn && deBtn) {
    enBtn.classList.toggle('is-active', currentLang === 'en');
    deBtn.classList.toggle('is-active', currentLang === 'de');
  }
}

function switchLanguage(lang) {
  currentLang = lang;
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }
  applyLanguage();
  if (document.getElementById('portfolio-grid')) renderPortfolio(currentFilter);
  if (document.getElementById('featured-mount')) renderFeatured();
  if (document.getElementById('artwork-mount')) renderArtworkPage();
}

/* ---------- Slider instances ---------- */
let artworkSwiper = null;
let processSwiper = null;

/* ---------- Portfolio (home) ---------- */
let currentFilter = 'all';

function renderPortfolio(filter = 'all') {
  currentFilter = filter;
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.filter === filter);
  });

  const list = filter === 'all' ? works : works.filter(w => w.category === filter);

  grid.style.opacity = '0';
  setTimeout(() => {
    grid.innerHTML = list.map((work, i) => artworkCard(work, i)).join('');
    grid.style.opacity = '1';
  }, 180);
}

function artworkCard(work, index = 0) {
  const cover = work.media[0];
  const badge = work.inProgress
    ? `<span class="card-badge">${currentLang === 'de' ? 'In Arbeit' : 'In Progress'}</span>`
    : '';
  return `
    <a href="artwork.html?slug=${encodeURIComponent(work.slug)}"
       class="art-card fade-in"
       style="animation-delay:${index * 70}ms"
       aria-label="${t(work, 'title')}">
      <figure class="art-card__media">
        <img src="${cover.src}" alt="${t(work, 'title')}" loading="lazy">
        ${badge}
      </figure>
      <figcaption class="art-card__caption">
        <h3 class="art-card__title">${t(work, 'title')}</h3>
        ${work.subtitle_en ? `<p class="art-card__subtitle">${t(work, 'subtitle')}</p>` : ''}
        <p class="art-card__meta">${t(work, 'medium')} · ${work.size} · ${work.year}</p>
      </figcaption>
    </a>
  `;
}

/* ---------- Featured (home) ---------- */
function renderFeatured() {
  const mount = document.getElementById('featured-mount');
  if (!mount) return;
  const work = works.find(w => w.featured) || works[0];
  const cover = work.media[0];
  mount.innerHTML = `
    <a href="artwork.html?slug=${encodeURIComponent(work.slug)}" class="featured">
      <div class="featured__image">
        <img src="${cover.src}" alt="${t(work, 'title')}">
      </div>
      <div class="featured__caption">
        <span class="eyebrow">${currentLang === 'de' ? 'Aktuelles Werk' : 'Featured Work'}</span>
        <h2 class="featured__title">${t(work, 'title')}</h2>
        <p class="featured__meta">${t(work, 'medium')} · ${work.size} · ${work.year}</p>
        <p class="featured__desc">${t(work, 'desc')}</p>
        <span class="cta">${currentLang === 'de' ? 'Werk ansehen →' : 'View artwork →'}</span>
      </div>
    </a>
  `;
}

/* ---------- Artwork detail page ---------- */
function getSlugFromURL() {
  return new URLSearchParams(window.location.search).get('slug');
}

function renderArtworkPage() {
  const mount = document.getElementById('artwork-mount');
  if (!mount) return;

  const slug = getSlugFromURL();
  const work = works.find(w => w.slug === slug);

  if (!work) {
    mount.innerHTML = `
      <div class="not-found">
        <h1 class="display">404</h1>
        <p>${currentLang === 'de' ? 'Werk nicht gefunden.' : 'Artwork not found.'}</p>
        <a class="cta" href="index.html#portfolio">${currentLang === 'de' ? '← Zurück zum Portfolio' : '← Back to portfolio'}</a>
      </div>`;
    return;
  }

  document.title = `${t(work, 'title')} — Hamidreza Soltani`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t(work, 'desc'));

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: t(work, 'title'),
    artMedium: t(work, 'medium'),
    artworkSurface: 'Canvas',
    artform: 'Painting',
    creator: { '@type': 'Person', name: 'Hamidreza Soltani' },
    dateCreated: work.year,
    image: new URL(work.media[0].src, window.location.href).toString(),
    description: t(work, 'desc')
  };
  let ldTag = document.getElementById('artwork-ld');
  if (!ldTag) {
    ldTag = document.createElement('script');
    ldTag.type = 'application/ld+json';
    ldTag.id = 'artwork-ld';
    document.head.appendChild(ldTag);
  }
  ldTag.textContent = JSON.stringify(ld);

  const categoryLabel = work.category === 'original'
    ? (currentLang === 'de' ? 'Original' : 'Original')
    : (currentLang === 'de' ? 'Reproduktion' : 'Hand-Painted Reproduction');

  const procItems = work.process || [];
  const isMultiProcess = procItems.length > 1;
  const processHTML = procItems.length ? `
    <section class="artwork__process">
      <h2 class="section-title">${currentLang === 'de' ? 'Prozess & Entstehung' : 'Process & Creation'}</h2>
      <div class="artwork__process-slider${isMultiProcess ? ' swiper' : ''}">
        ${isMultiProcess
      ? `<div class="swiper-wrapper">
              ${procItems.map(m => `<div class="swiper-slide">${mediaSlideFigure(m)}</div>`).join('')}
            </div>
            <button class="swiper-button-prev" aria-label="${currentLang === 'de' ? 'Zur\u00fcck' : 'Previous'}"></button>
            <button class="swiper-button-next" aria-label="${currentLang === 'de' ? 'Weiter' : 'Next'}"></button>
            <div class="swiper-pagination"></div>`
      : mediaSlideFigure(procItems[0])}
      </div>
    </section>` : '';

  const sameCat = works.filter(w => w.slug !== work.slug && w.category === work.category);
  const fallback = works.filter(w => w.slug !== work.slug && w.category !== work.category);
  const relatedAll = [...sameCat, ...fallback].slice(0, 4);

  /* ---- Build slider HTML ---- */
  const isMulti = work.media.length > 1;
  const sliderInner = isMulti
    ? `<div class="swiper-wrapper">
        ${work.media.map(m => `<div class="swiper-slide">${mediaSlideFigure(m)}</div>`).join('')}
      </div>
      <button class="swiper-button-prev" aria-label="${currentLang === 'de' ? 'Zurück' : 'Previous'}"></button>
      <button class="swiper-button-next" aria-label="${currentLang === 'de' ? 'Weiter' : 'Next'}"></button>
      <div class="swiper-pagination"></div>`
    : mediaSlideFigure(work.media[0]);

  mount.innerHTML = `
    <article class="artwork">
      <nav class="artwork__crumbs">
        <a href="index.html">${currentLang === 'de' ? 'Start' : 'Home'}</a>
        <span>/</span>
        <a href="index.html#portfolio">${currentLang === 'de' ? 'Portfolio' : 'Portfolio'}</a>
        <span>/</span>
        <span class="artwork__crumbs-current">${t(work, 'title')}</span>
      </nav>

      <div class="artwork__slider${isMulti ? ' swiper' : ''}">${sliderInner}</div>

      <section class="artwork__info">
        <div class="artwork__info-left">
          <span class="eyebrow">${categoryLabel}${work.inProgress ? ' · ' + (currentLang === 'de' ? 'In Arbeit' : 'In Progress') : ''}</span>
          <h1 class="display">${t(work, 'title')}</h1>
          ${work.subtitle_en ? `<p class="artwork__subtitle">${t(work, 'subtitle')}</p>` : ''}
        </div>
        <dl class="artwork__info-grid">
          <div><dt>${currentLang === 'de' ? 'Jahr' : 'Year'}</dt><dd>${work.year}</dd></div>
          <div><dt>${currentLang === 'de' ? 'Technik' : 'Medium'}</dt><dd>${t(work, 'medium')}</dd></div>
          <div><dt>${currentLang === 'de' ? 'Maße' : 'Dimensions'}</dt><dd>${work.size}</dd></div>
          <div><dt>${currentLang === 'de' ? 'Kategorie' : 'Category'}</dt><dd>${categoryLabel}</dd></div>
        </dl>
      </section>

      <section class="artwork__concept">
        <h2 class="section-title">${currentLang === 'de' ? 'Konzept' : 'Concept'}</h2>
        ${(work.concept_en ? t(work, 'concept') : t(work, 'desc'))
      .split('\n').filter(p => p.trim()).map(p => `<p>${p.trim()}</p>`).join('')}
      </section>

      ${processHTML}

      <section class="artwork__related">
        <h2 class="section-title">${currentLang === 'de' ? 'Verwandte Werke' : 'Related Works'}</h2>
        <div class="related-grid">
          ${relatedAll.map((w, i) => artworkCard(w, i)).join('')}
        </div>
      </section>

      <div class="artwork__cta-row">
        <a class="btn btn-primary" href="index.html#contact">${currentLang === 'de' ? 'Werk anfragen' : 'Inquire about this work'}</a>
        <a class="btn btn-ghost" href="index.html#portfolio">${currentLang === 'de' ? '← Zurück zum Portfolio' : '← Back to portfolio'}</a>
      </div>
    </article>
  `;

  /* ---- Init Swipers after DOM update ---- */
  if (artworkSwiper) { artworkSwiper.destroy(true, true); artworkSwiper = null; }
  if (processSwiper) { processSwiper.destroy(true, true); processSwiper = null; }

  if (typeof Swiper !== 'undefined') {
    const artEl = document.querySelector('.artwork__slider.swiper');
    if (artEl) {
      artworkSwiper = new Swiper(artEl, {
        loop: work.media.length > 2,
        speed: 700,
        pagination: { el: artEl.querySelector('.swiper-pagination'), clickable: true },
        navigation: { prevEl: artEl.querySelector('.swiper-button-prev'), nextEl: artEl.querySelector('.swiper-button-next') },
        keyboard: { enabled: true },
        a11y: { enabled: true },
      });
    }
    const procEl = document.querySelector('.artwork__process-slider.swiper');
    if (procEl) {
      processSwiper = new Swiper(procEl, {
        loop: procItems.length > 2,
        speed: 700,
        pagination: { el: procEl.querySelector('.swiper-pagination'), clickable: true },
        navigation: { prevEl: procEl.querySelector('.swiper-button-prev'), nextEl: procEl.querySelector('.swiper-button-next') },
        keyboard: { enabled: true },
        a11y: { enabled: true },
      });
    }
  }
}

function mediaFigure(m) {
  if (m.type === 'video') {
    return `<figure class="carousel__item">
      <video src="${m.src}" controls preload="metadata" playsinline></video>
    </figure>`;
  }
  return `<figure class="carousel__item">
    <img src="${m.src}" alt="${m.alt || ''}" loading="lazy">
  </figure>`;
}

function youtubeEmbedSrc(src) {
  const m = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}?rel=0` : null;
}

function mediaSlideFigure(m) {
  if (m.type === 'video') {
    const yt = youtubeEmbedSrc(m.src);
    if (yt) {
      return `<figure class="artwork__slide-fig"><iframe src="${yt}" title="${m.alt || ''}" allowfullscreen loading="lazy"></iframe></figure>`;
    }
    return `<figure class="artwork__slide-fig"><video src="${m.src}" controls preload="metadata" playsinline></video></figure>`;
  }
  return `<figure class="artwork__slide-fig"><img src="${m.src}" alt="${m.alt || ''}" loading="lazy"></figure>`;
}

/* ---------- Init ---------- */
function initHome() {
  if (!document.getElementById('portfolio-grid')) return;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => renderPortfolio(btn.dataset.filter));
  });
  renderFeatured();
  renderPortfolio('all');
}

function initArtwork() {
  if (!document.getElementById('artwork-mount')) return;
  renderArtworkPage();
}

function initNavToggle() {
  const burger = document.getElementById('nav-burger');
  const nav = document.getElementById('nav-links');
  if (!burger || !nav) return;
  burger.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', nav.classList.contains('is-open'));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('is-open')));
}

document.addEventListener('DOMContentLoaded', () => {
  applyLanguage();
  initNavToggle();
  initHome();
  initArtwork();

  /* Re-scroll to URL hash after dynamic content settles.
     renderPortfolio() injects content with a 180 ms delay, which shifts
     layout and lands cross-page anchor links in the wrong position.
     Waiting 250 ms lets all injected content stabilise first. */
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  }
});

