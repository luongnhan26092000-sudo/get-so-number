var C='sct-v2',F=['./','index.html','manifest.json','icon.svg','vendor/ocr.js','vendor/ort/ort-wasm-simd-threaded.mjs','vendor/ort/ort-wasm-simd-threaded.wasm','vendor/models/det.onnx','vendor/models/rec.onnx','vendor/models/dict.txt'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request)}))});
