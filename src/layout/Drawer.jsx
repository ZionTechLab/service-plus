import { forwardRef, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../components/Drawer/Drawer.css';
import menuItems from '../helpers/menuItems';

const Drawer = forwardRef(({ isOpen, onClose }, ref) => {
  const [theme, setTheme] = useState('light');
  const drawerRef = useRef(null);

  // Theme toggle logic
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Load theme from localStorage or system
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
  }, []);

  // Keyboard accessibility: ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus management: focus drawer when opened
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop for modal effect */}
      <div
        className="drawer-backdrop"
        onClick={onClose}
        aria-label="Close menu"
      />
      <aside
        ref={drawerRef}
        className="drawer open"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <div className="drawer-header">
          <h3 className="drawer-title mb-0">Menu</h3>
          <button
            onClick={onClose}
            className="drawer-close-btn btn btn-dark"
            aria-label="Close menu"
          >
            <i className="bi bi-x-lg" aria-hidden="true"></i>
          </button>
        </div>
        <nav className="drawer-nav" aria-label="Main navigation">
          <ul className="list-group list-group-flush">
            {menuItems.map(item => (
              <li className="list-group-item" key={item.route}>
                <Link to={item.route} onClick={onClose} className="nav-link">
                  <i className={`${item.icon} me-2`} aria-hidden="true"></i>
                  <span>{item.displayName}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="drawer-footer mt-auto p-3">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="themeSwitcher"
              checked={theme === 'dark'}
              onChange={toggleTheme}
              aria-checked={theme === 'dark'}
              aria-label="Toggle dark mode"
            />
            <label className="form-check-label" htmlFor="themeSwitcher">Dark Mode</label>
          </div>
        </div>
      </aside>
    </>
  );
});

export default Drawer;
