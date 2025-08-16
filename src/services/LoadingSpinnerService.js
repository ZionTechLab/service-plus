// Simple singleton service to allow non-React code to show/hide the app spinner.
// The LoadingSpinnerProvider registers its show/hide functions with this service.
let showFn = null;
let hideFn = null;

export default {
  register(show, hide) {
    showFn = show;
    hideFn = hide;
  },
  unregister() {
    showFn = null;
    hideFn = null;
  },
  show(message) {
    if (typeof showFn === "function") showFn(message);
  },
  hide() {
    if (typeof hideFn === "function") hideFn();
  },
};
