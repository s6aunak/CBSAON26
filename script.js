/* ── DRAWER ── */
const drawer = document.getElementById('nav-drawer');
const overlay = document.getElementById('nav-overlay');

document.getElementById('nav-toggle').addEventListener('click', () => {
  drawer.classList.add('show-menu');
  overlay.classList.add('show-menu');
});

const closeDrawer = () => {
  drawer.classList.remove('show-menu');
  overlay.classList.remove('show-menu');
};

document.getElementById('nav-close').addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);

/* ── ACTIVE LINK ── */
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar__links .nav__link, .navbar__drawer-links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});

/* ── COUNTDOWN ── */
function updateCountdown() {
  const target = new Date('2026-06-29T00:00:00');
  const diff = target - new Date();
  if (diff <= 0) return;
  const days  = document.getElementById('cd-days');
  const hours = document.getElementById('cd-hours');
  const mins  = document.getElementById('cd-mins');
  const secs  = document.getElementById('cd-secs');
  if (!days) return;
  days.textContent  = String(Math.floor(diff / 86400000)).padStart(2, '0');
  hours.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
  mins.textContent  = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
  secs.textContent  = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ── PARTICLES ── */
const particleContainer = document.getElementById('particles');
if (particleContainer) {
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      background: rgba(200, 160, 0, ${Math.random() * 0.3 + 0.05});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      bottom: -10px;
      animation: particleFloat ${Math.random() * 12 + 8}s ${Math.random() * 10}s ease-in infinite;
    `;
    particleContainer.appendChild(p);
  }
}

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll(
  '.stat-card, .section__title, .section__body, .section__eyebrow, .about-preview__links, .pill-btn'
);
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  observer.observe(el);
});

/* ── ABOUT HEADING CURSOR GLOW ── */
const heading = document.querySelector('.about__heading');
if (heading) {
  document.addEventListener('mousemove', (e) => {
    const rect = heading.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    heading.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, #ffffff 0%, #ffe090 25%, #d4a020 55%, #6b3800 100%)`;
    heading.style.webkitBackgroundClip = 'text';
    heading.style.webkitTextFillColor = 'transparent';
    heading.style.backgroundClip = 'text';
  });
}

/* ── LOADER ── */
window.addEventListener('load', () => {
  const loader = document.getElementById('load-landing');
  if (loader) {
    setTimeout(() => {
      loader.style.transition = 'opacity 0.6s ease';
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 600);
    }, 3100);
  }
});

/* ── POPUP ── */
const popupData = {
  cbs: {
    tag: '',
    title: "Calcutta Boys' School",
    text: "Established in 1877, Calcutta Boys' School is one of the oldest and most prestigious educational institutions in India. Located in the heart of Kolkata, it has been shaping young minds for over a century, producing leaders, thinkers, and changemakers across generations. The school is known for its strong academic tradition, rich cultural heritage, and commitment to holistic education."
  },
  aon: {
    tag: '',
    title: "Assembly Of Nations",
    text: "Assembly Of Nations (AON) is the flagship Model United Nations conference organised by Calcutta Boys' School. It brings together students from schools across the country to engage in diplomatic simulations, debate global issues, and develop critical thinking and public speaking skills. AON 2026 marks a landmark edition in the conference's legacy."
  },
  unsc: {
    tag: 'UNSC',
    title: 'Agenda',
    text: 'The situation in the Middle East.'
  },
  specpol: {
    tag: 'UNGA-SPECPOL',
    title: 'Agenda',
    text: 'Establishing legal barriers against the placement of weapons in orbit and the terrestrial targeting of satellite networks.'
  },
  c34: {
    tag: 'C-34',
    title: 'Agenda',
    text: 'Strategies for the transition of United Nations peacekeeping operations to a sustainable peacebuilding presence.'
  }
};

function openPopup(type) {
  const popupOverlay = document.getElementById('popup-overlay');
  const popupTitle   = document.getElementById('popup-title');
  const popupText    = document.getElementById('popup-text');
  const popupTag     = document.getElementById('popup-tag');
  if (!popupOverlay || !popupData[type]) return;
  if (popupTag)   popupTag.textContent   = popupData[type].tag;
  if (popupTitle) popupTitle.textContent = popupData[type].title;
  if (popupText)  popupText.textContent  = popupData[type].text;
  popupOverlay.classList.add('active');
}

function closePopup() {
  const popupOverlay = document.getElementById('popup-overlay');
  if (popupOverlay) popupOverlay.classList.remove('active');
}

/* bind all buttons */
const popupButtons = {
  'btn-cbs':     'cbs',
  'btn-aon':     'aon',
  'btn-unsc':    'unsc',
  'btn-specpol': 'specpol',
  'btn-c34':     'c34'
};

Object.entries(popupButtons).forEach(([id, type]) => {
  const btn = document.getElementById(id);
  if (btn) btn.addEventListener('click', () => openPopup(type));
});

const popupCloseBtn = document.getElementById('popup-close');
if (popupCloseBtn) popupCloseBtn.addEventListener('click', closePopup);

const popupOverlayEl = document.getElementById('popup-overlay');
if (popupOverlayEl) {
  popupOverlayEl.addEventListener('click', (e) => {
    if (e.target === popupOverlayEl) closePopup();
  });
}

/* ── GALLERY SLIDER ── */
const galleryImages = [
  'gall/mayukh.webp',
  'gall/israel.webp',
  'gall/megacity.webp',
  'gall/aksh.webp',
  'gall/maam.webp',
  'gall/gundaboy.webp',
  'gall/flower.webp',
  'gall/mogger.webp',
  'gall/mogger2.webp',
  'gall/desiboy.webp',
  'gall/head.webp'
];

const slide    = document.getElementById('gallery-slide');
const dotsWrap = document.getElementById('gallery-dots');
const prevBtn  = document.getElementById('gallery-prev');
const nextBtn  = document.getElementById('gallery-next');

if (slide) {
  let current = 0;
  let autoTimer;

  const dots = galleryImages.map((_, i) => {
    const d = document.createElement('button');
    d.classList.add('gallery-dot');
    if (i === 0) d.classList.add('active');
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
    return d;
  });

  function goTo(index) {
    slide.style.opacity = '0';
    setTimeout(() => {
      current = (index + galleryImages.length) % galleryImages.length;
      slide.style.backgroundImage = `url('${galleryImages[current]}')`;
      slide.style.opacity = '1';
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }, 300);
    resetTimer();
  }

  function resetTimer() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 4000);
  }

  slide.style.backgroundImage = `url('${galleryImages[0]}')`;
  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  resetTimer();
}