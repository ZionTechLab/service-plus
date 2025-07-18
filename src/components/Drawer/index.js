import { forwardRef, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Drawer.css';


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
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.3)',
          zIndex: 1049,
        }}
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
        style={{ outline: 'none' }}
      >
        <div className="drawer-header">
          <h3 className="mb-0" style={{ fontWeight: 600, fontSize: '1.25rem' }}>Menu</h3>
          <button
            onClick={onClose}
            className="btn btn-dark"
            aria-label="Close menu"
            style={{ borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <i className="bi bi-x-lg" aria-hidden="true"></i>
          </button>
        </div>
        <nav className="drawer-nav" aria-label="Main navigation">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Link to="/service-inquiry" onClick={onClose} className="nav-link">
                <i className="bi bi-headset me-2" aria-hidden="true"></i>
                <span>Service Inquiry</span>
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/inquiry-list" onClick={onClose} className="nav-link">
                <i className="bi bi-list-ul me-2" aria-hidden="true"></i>
                <span>Inquiry List</span>
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/customer-master" onClick={onClose} className="nav-link">
                <i className="bi bi-people-fill me-2" aria-hidden="true"></i>
                <span>Customer Master</span>
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/item-master" onClick={onClose} className="nav-link">
                <i className="bi bi-box-seam-fill me-2" aria-hidden="true"></i>
                <span>Item Master</span>
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/item-category" onClick={onClose} className="nav-link">
                <i className="bi bi-tags me-2" aria-hidden="true"></i>
                <span>Item Category</span>
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/grn" onClick={onClose} className="nav-link">
                <i className="bi bi-receipt me-2" aria-hidden="true"></i>
                <span>GRN</span>
              </Link>
            </li>
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
