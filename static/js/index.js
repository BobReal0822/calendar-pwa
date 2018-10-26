(function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('js/proxy.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();