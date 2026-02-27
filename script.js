// Year
document.getElementById('yr').textContent = new Date().getFullYear();

// Hamburger menu
const btn = document.getElementById('menuBtn');
const nav = document.getElementById('mobileNav');
btn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  btn.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', open);
});
function closeMenu() {
  nav.classList.remove('open');
  btn.classList.remove('open');
}
// Close on outside click
document.addEventListener('click', e => {
  if (!btn.contains(e.target) && !nav.contains(e.target)) closeMenu();
});

// Hero BG — fewer cells on mobile for perf
const isMobile = window.innerWidth <= 640;
const cols = isMobile ? 20 : 20;
const rows = isMobile ? 30 : 30;
const chars = '01アイウエオ∑∂∇∈≠≤≥ψΩ{}[]<>/\\|#@!%^*&';
const bg = document.getElementById('heroBg');
for (let i = 0; i < cols * rows; i++) {
  const el = document.createElement('div');
  el.className = 'hero-bg-char';
  el.textContent = chars[Math.floor(Math.random() * chars.length)];
  setInterval(() => {
    if (Math.random() < 0.012) el.textContent = chars[Math.floor(Math.random() * chars.length)];
  }, 700 + Math.random() * 900);
  bg.appendChild(el);
}

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.06 });

document.querySelectorAll(
  '.raw-title, .historia-body p, .sidebar-box, .platform-card, .hack-row, .cert-table tr, .team-display, .social-row'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  obs.observe(el);
});
