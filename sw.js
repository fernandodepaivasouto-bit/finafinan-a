// Service worker: guarda o app no aparelho para abrir offline.
const CACHE = 'fina-financa-v3';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './assets/beans.png',
  './assets/btn-on-pressed.png',
  './assets/btn-on.png',
  './assets/btn-pressed.png',
  './assets/btn.png',
  './assets/cup.png',
  './assets/ic-check-caramel.png',
  './assets/ic-check.png',
  './assets/ic-dollar-caramel.png',
  './assets/ic-dollar.png',
  './assets/ic-minus.png',
  './assets/ic-play-mauve.png',
  './assets/ic-play.png',
  './assets/ic-plus.png',
  './assets/ic-question-mauve.png',
  './assets/ic-question.png',
  './assets/ic-x-mauve.png',
  './assets/ic-x.png',
  './assets/moka.png',
  './assets/panel.png',
  './assets/paper.png',
  './assets/tab.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Página: tenta a rede primeiro (pega atualizações), cai no cache se estiver offline.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Arquivos do app, fontes e leitor de PDF: cache primeiro, rede como reserva.
  const cacheable = url.origin === location.origin ||
    /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname) ||
    url.hostname === 'cdnjs.cloudflare.com';
  if (!cacheable) return;

  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok || res.type === 'opaque') {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }))
  );
});
