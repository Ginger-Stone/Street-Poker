// console.log("Hello from service-worker.js")
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
//       if (workbox) {
//           console.log(`[ PWA Fire Bundle 🐹 ] Workbox is loaded`);
//           workbox.precaching.precacheAndRoute([]);
    
//         /* cache images in the e.g others folder; edit to other folders you got 
//         and config in the sw-config.js file
//           */
//         workbox.routing.registerRoute(
//           /(.*)others(.*)\.(?:png|gif|jpg)/,
//           new workbox.strategies.CacheFirst({
//             cacheName: 'images',
//             plugins: [
//               new workbox.expiration.Plugin({
//                 maxEntries: 50,
//                 maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//               })
//             ]
//           })
//         );
//           /* Make your JS and CSS ⚡ fast by returning the assets from the cache, 
//         while making sure they are updated in the background for the next use.
//         */
//         workbox.routing.registerRoute(
//           // cache js, css, scc files 
//           /.*\.(?:css|js|scss|)/,
//           // use cache but update in the background ASAP
//           new workbox.strategies.StaleWhileRevalidate({
//             // use a custom cache name
//             cacheName: 'assets',
//           })
//         );

//         // cache google fonts
//         workbox.routing.registerRoute(
//           new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
//           new workbox.strategies.CacheFirst({
//             cacheName: 'google-fonts',
//             plugins: [
//               new workbox.cacheableResponse.Plugin({
//               statuses: [0, 200],
//               }),
//            ],
//           })
//         );

//         // add offline analytics 
//         workbox.googleAnalytics.initialize(); 

//       /* Install a new service worker and have it update 
//       and control a web page as soon as possible
//       */

//       workbox.core.skipWaiting();
//       workbox.core.clientsClaim();
    
//       } else {
//           console.log(`Oops! Workbox didn't load 👺`);
//     }


 /* after a service worker is installed and the user navigates to a different page or 
  refreshes,the service worker will begin to receive fetch events */  
  self.addEventListener('fetch', (event) => {
    event.respondWith(caches.open('cache').then((cache) => {
      return cache.match(event.request).then((response) => {
        console.log("cache request: " + event.request.url);
         var fetchPromise = fetch(event.request).then((networkResponse) => {           
  // if we got a response from the cache, update the cache                   
  console.log("fetch completed: " + event.request.url, networkResponse);
    if (networkResponse) {
      console.debug("updated cached page: " + event.request.url, networkResponse);
        cache.put(event.request, networkResponse.clone());}
          return networkResponse;
            }, function (event) {   
  // rejected promise - just ignore it, we're offline!   
            console.log("Error in fetch()", event);
            event.waitUntil(
  // our 'cache' here is named *cache* in the caches.open()
            caches.open('cache').then((cache) => { 
            return cache.addAll
            ([            
  // cache.addAll(), takes a list of URLs, then fetches them from 
  // the server and adds the response to the cache          
          './index.html', // cache index page
          './assets/*', // cache all assets
          './images/*', // cache all images
          './app.webmanifest' ]); }) 
          ); });
  // respond from the cache, or the network
    return response || fetchPromise;
  }); }));
  });

  // always updating i.e latest version available
  self.addEventListener('install', (event) => {
      self.skipWaiting();
      console.log("Latest version installed!");
  });