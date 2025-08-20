// Lightweight service worker registration for CRA + Workbox
export function register() {
  if ('serviceWorker' in navigator) {
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          // Optional: log or handle updates
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.info('New content is available; will be used when all tabs are closed.');
                }
              };
            }
          };
        })
        .catch((error) => {
          console.error('Service worker registration failed:', error);
        });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
