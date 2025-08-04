// MessageBoxService.js
// Singleton service for global message box management

class MessageBoxService {
  constructor() {
    this.listeners = [];
    this.options = {
      show: false,
      message: '',
      type: 'success',
      confirmText: 'Okay',
      cancelText: '',
      onConfirm: null,
      onClose: null
    };
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // Initial call
    listener(this.options);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  _notify() {
    this.listeners.forEach(listener => listener(this.options));
  }

  show(opts = {}) {
    this.options = { ...this.options, ...opts, show: true };
    this._notify();
  }

  close() {
    this.options = { ...this.options, show: false };
    this._notify();
    if (typeof this.options.onClose === 'function') {
      this.options.onClose();
    }
  }

  confirm() {
    this.options = { ...this.options, show: false };
    this._notify();
    if (typeof this.options.onConfirm === 'function') {
      this.options.onConfirm();
    }
  }
}

const instance = new MessageBoxService();
export default instance;
