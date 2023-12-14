const cacheName = 'elden-ring-files';
const assets = [
    "/",
    "index.html",
    "aventura.html",
    "css/bootstrap.min.css",
    "css/styles.css",
    "js/bootstrap.bundle.min.js",
    "js/main.js"
]

self.addEventListener('install', (event) => {
    console.log('sw instalado');
    caches.open(cacheName)
    .then(cache => {
        cache.addAll(assets)
    })
})

self.addEventListener('fetch', event => {
    console.log(event.request)
    event.respondWith(
        caches.match(event.request)
        .then(res => {
            if(res){
                return res;
            }
            let requestToCache = event.request.clone();
            return fetch(requestToCache)
            .then(res => {
                if(!res || res.status !== 200){
                    return res;
                }
                let responseToCache = res.clone();
                caches.open(cacheName)
                .then(cache => {
                    cache.put(requestToCache, responseToCache)
                })
                return res;
            })
        })
        .catch(() => {
            console.log("error en el match del cache")
        })
    )
})

self.addEventListener('activate', (event) => {
    console.log('sw activado')
})