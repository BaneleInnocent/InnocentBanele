// Shared site script: partial loader, theme toggle, mobile nav, reveal-on-scroll, boot loader
(function () {
  const page = document.body.dataset.page || '';

  async function inject(id, url) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      el.innerHTML = await res.text();
    } catch (e) {
      console.warn('partial load failed', url, e);
    }
  }

  function activateNav() {
    document.querySelectorAll('[data-nav]').forEach(a => {
      if (a.dataset.nav === page) a.classList.add('active');
    });
  }

  function wireMenu() {
    const t = document.getElementById('menuToggle');
    const links = document.getElementById('navLinks');
    if (t && links) t.addEventListener('click', () => links.classList.toggle('open'));
  }

  function wireTheme() {
    const KEY = 'bm-theme';
    const saved = localStorage.getItem(KEY) || 'dark';
    if (saved === 'light') document.documentElement.dataset.theme = 'light';
    const btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', () => {
      const cur = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      if (cur === 'light') document.documentElement.dataset.theme = 'light';
      else delete document.documentElement.dataset.theme;
      localStorage.setItem(KEY, cur);
    });
  }

  function reveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(e => io.observe(e));
  }

  function year() {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  function bootLoader() {
    if (sessionStorage.getItem('bm-booted')) return;
    sessionStorage.setItem('bm-booted', '1');
    const div = document.createElement('div');
    div.className = 'boot';
    div.innerHTML = `<pre id="bootText"></pre>`;
    document.body.appendChild(div);
    const lines = [
      '> initializing secure shell...',
      '> loading modules: net, scan, crypto ...... [OK]',
      '> verifying integrity .................... [OK]',
      '> establishing handshake ................. [OK]',
      '> access granted. welcome, banele.'
    ];
    const pre = div.querySelector('#bootText');
    let i = 0, j = 0;
    const tick = () => {
      if (i >= lines.length) {
        setTimeout(() => { div.classList.add('hidden'); setTimeout(() => div.remove(), 600); }, 350);
        return;
      }
      pre.textContent = lines.slice(0, i).join('\n') + '\n' + lines[i].slice(0, j);
      j++;
      if (j > lines[i].length) { i++; j = 0; setTimeout(tick, 120); }
      else setTimeout(tick, 18);
    };
    tick();
  }

  document.addEventListener('DOMContentLoaded', async () => {
    wireTheme();
    bootLoader();
    await Promise.all([
      inject('site-header', 'partials/header.html'),
      inject('site-footer', 'partials/footer.html'),
    ]);
    activateNav();
    wireMenu();
    year();
    reveal();
  });
})();
