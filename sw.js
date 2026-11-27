var C='sct-v5',F=['./','index.html','manifest.json','icon.svg','ocr.js','ort-wasm-simd-threaded.mjs','ort-wasm-simd-threaded.wasm','det.onnx','rec.onnx','dict.txt'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var u=new URL(e.request.url);
  if(u.origin!==location.origin)return;
  if(e.request.mode==='navigate'||/index\.html$/.test(u.pathname)){
    e.respondWith(fetch(u.href,{cache:'no-store'}).then(function(r){var c=r.clone();caches.open(C).then(function(x){x.put(e.request,c)});return r}).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match('index.html')})}));
    return;
  }
  e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request)}));
});
