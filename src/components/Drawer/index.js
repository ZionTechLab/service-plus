import { forwardRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Drawer.css';

const Drawer = forwardRef(({ isOpen, onClose }, ref) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
  }, []);


  if (!isOpen) {
    return null;
  }

  return (
    <aside ref={ref} className="drawer open">
      <div className="drawer-header">
        <h3 className="mb-0">Menu</h3>
        <button onClick={onClose} className="btn btn-dark">
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <nav className="drawer-nav">
        <ul className="list-group list-group-flush">
         
          <li className="list-group-item">
            <Link to="/service-inquiry" onClick={onClose} className="nav-link">
              <i className="bi bi-headset me-2"></i>Service Inquiry
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/inquiry-list" onClick={onClose} className="nav-link">
              <i className="bi bi-list-ul me-2"></i>Inquiry List
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/customer-master" onClick={onClose} className="nav-link">
              <i className="bi bi-people-fill me-2"></i>Customer Master
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/item-master" onClick={onClose} className="nav-link">
              <i className="bi bi-box-seam-fill me-2"></i>Item Master
            </Link>
          </li>
        </ul>
      </nav>
      <div className="drawer-footer mt-auto p-3">
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" role="switch" id="themeSwitcher" checked={theme === 'dark'} onChange={toggleTheme} />
          <label className="form-check-label" htmlFor="themeSwitcher">Dark Mode</label>
        </div>
      </div>
    </aside>
  );
});

export default Drawer;
