
const nombreCache = 'apv-cache'; 
const assets = [
    '/',
    '/index.html',
    "purpose",
    "any maskable",
    '/error.html',
    '/js/app.js',
    '/css/bootstrap.css',
    '/css/styles.css'
];


"purpose" , "any maskable"



self.addEventListener('install', e => {
    console.log('Instalado el Service Worker');

    e.waitUntil(

       
        caches.open(nombreCache)
            .then( cache => {
                console.log('cacheando...');
                cache.addAll(assets);
            })
    );

   

});


self.addEventListener('activate', e => {
    console.log('Service Worker Activado');

    e.waitUntil(
        caches.keys()
            .then(keys => {
                console.log(keys); 

                return Promise.all(keys
                        .filter(key => key !== nombreCache)
                        .map(key => caches.delete(key)) 
                    )
            })
    )
});


self.addEventListener('fetch', e => {
    console.log('Fetch.. ', e);

    e.respondWith(
        caches.match(e.request)
            .then(respuestaCache => {
                return respuestaCache || fetch(e.request);
            })
            .catch( () => caches.match('/error.html'))
    );
});

