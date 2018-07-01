const staticCacheName = "currenCov-static-v1";


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/index.html',
        '/lib/idb.js',
        '/css/style.css',
        'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
        'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('wittr-') &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/index.html') {
      event.respondWith(caches.match('/index.html'));
      return;
    }
    // if (requestUrl.pathname.startsWith('/photos/')) {
    //   event.respondWith(servePhoto(event.request));
    //   return;
    // }
    //
    // if (requestUrl.pathname.startsWith('/avatars')){
    //   event.respondWith(serveAvatar(event.request));
    //   return;
    // }
    // TODO: respond to avatar urls by responding with
    // the return value of serveAvatar(event.request)
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});


function convertCurrency(){
  let from = document.getElementById('fromCurrency')[0].value;
  let to = document.getElementById('toCurrency')[0].value;
  let amount = document.getElementById('amount').value;
  let total = document.getElementById('convertedTotal');
  let query = from + "_" + to;
  const urlToConvert = "https://free.currencyconverterapi.com/api/v5/convert?q="+ query + "&compact=ultra";
  fetch(urlToConvert).then(response => {
    return response.json();
  }).then(rates => {
    console.log(rates);
    for (let r in rates){
      console.log(rates[r]);
      let cal = rates[r];
      console.log(cal, amount);
      let convTotal = (cal * amount);
      console.log(cal, amount);
      total.value = convTotal;
    }
  })
}
