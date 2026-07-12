const CACHE_NAME = 'ghost-store-v1';
const urlsToCache = [
  './',
  'index.html',
  'admin.html',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11',
  'https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-compat.js',
  'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth-compat.js'
];

// ফাইলগুলো ক্যাশ মেমরিতে জমা করা
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// রিলোড দিলে নেটওয়ার্ক থেকে ডাউনলোডের বদলে ব্রাউজার ক্যাশ থেকে সাথে সাথে ফাইল সরবরাহ করা
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});




