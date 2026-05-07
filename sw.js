const CACHE_NAME = 'checksheet-ln1-cache-v1';
const assets = [
  './index.html',
  './manifest.json',
  'https://unpkg.com/exceljs/dist/exceljs.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Cài đặt và lưu các file cần thiết vào bộ nhớ đệm
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Trả về dữ liệu từ bộ nhớ đệm khi mất mạng
self.addEventListener('fetch', e => {
  // MỞ ĐƯỜNG BYPASS: Bỏ qua không cho Service Worker chặn các request gửi lên Google Script (Giống như đường truyền SCADA đi thẳng)
  if (e.request.url.includes('script.google.com')) {
    return; 
  }

  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});