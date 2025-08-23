import { forwardRef, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Drawer.css';
import menuItems from '../helpers/menuItems';

const Drawer = forwardRef(({ isOpen, onClose, isMinimized, isMobile }, ref) => {
  const [mode, setMode] = useState('light');
  const [uiTheme, setUiTheme] = useState('material');
  const [colorTheme, setColorTheme] = useState('sky');
  const drawerRef = useRef(null);

  // Theme toggle logic
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    document.documentElement.setAttribute('data-bs-theme', newMode);
    localStorage.setItem('theme', newMode);
  };

  // UI Theme change logic
  const changeUiTheme = (e) => {
    const value = e.target.value;
    setUiTheme(value);
    document.documentElement.setAttribute('data-theme', value);
    localStorage.setItem('uiTheme', value);
  };

  // Color theme change logic
  const changeColorTheme = (e) => {
    const value = e.target.value;
    setColorTheme(value);
    if (value === 'default') {
      document.documentElement.removeAttribute('data-color');
    } else {
      document.documentElement.setAttribute('data-color', value);
    }
    localStorage.setItem('colorTheme', value);
  };

  // Load theme from localStorage or system
  useEffect(() => {
    const savedMode = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setMode(savedMode);
    document.documentElement.setAttribute('data-bs-theme', savedMode);

  const savedUiTheme = localStorage.getItem('uiTheme') || 'material';
    setUiTheme(savedUiTheme);
    document.documentElement.setAttribute('data-theme', savedUiTheme);

  const savedColorTheme = localStorage.getItem('colorTheme') || 'sky';
    setColorTheme(savedColorTheme);
    if (savedColorTheme === 'default') {
      document.documentElement.removeAttribute('data-color');
    } else {
      document.documentElement.setAttribute('data-color', savedColorTheme);
    }
  }, []);

  // Keyboard accessibility: ESC to close (only for mobile)
  useEffect(() => {
    if (!isMobile || !isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isMobile]);

  // Focus management: focus drawer when opened (only for mobile)
  useEffect(() => {
    if (isMobile && isOpen && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [isOpen, isMobile]);

  // For mobile, don't render if not open
  if (isMobile && !isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop for modal effect - only for mobile */}
      {isMobile && (
        <div
          className="drawer-backdrop"
          onClick={onClose}
          aria-label="Close menu"
        />
      )}
      
      <aside
        ref={drawerRef}
        className={`drawer ${isMobile ? (isOpen ? 'open' : '') : (isMinimized ? 'minimized' : 'expanded')}`}
        tabIndex={isMobile ? -1 : undefined}
        role={isMobile ? "dialog" : "navigation"}
        aria-modal={isMobile ? "true" : undefined}
        aria-label="Main menu"
      >
        <div className="drawer-content">
        <div className="drawer-header">
          {!isMinimized && <h3 className="drawer-title mb-0">Menu</h3>}
          {isMobile && (
            <button
              onClick={onClose}
              className="drawer-close-btn btn "
              aria-label="Close menu"
            >
              <i className="bi bi-x-lg" aria-hidden="true"></i>
            </button>
          )}
        </div>
        <nav className="drawer-nav" aria-label="Main navigation">
          <ul className="list-group list-group-flush">
            {menuItems.filter(item => item.isMenuItem).map(item => (
              <li className="list-group-item" key={item.route}>
                <Link 
                  to={item.route} 
                  onClick={isMobile ? onClose : undefined} 
                  className="nav-link"
                  title={isMinimized ? item.displayName : undefined}
                >
                  <i className={`${item.icon} ${!isMinimized ? 'me-2' : ''}`} aria-hidden="true"></i>
                  {!isMinimized && <span> {item.displayName}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
{/* {true?null:( */}
        <div className="drawer-footer mt-auto p-3">
          <div className="d-flex flex-column gap-2">
            <div className="form-check form-switch m-0">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="themeSwitcher"
                checked={mode === 'dark'}
                onChange={toggleTheme}
                aria-checked={mode === 'dark'}
                aria-label="Toggle dark mode"
              />
              {!isMinimized && (
                <label className="form-check-label" htmlFor="themeSwitcher">Dark mode</label>
              )}
            </div>

            {!isMinimized && (
              <div className="m-0">
                <label htmlFor="uiThemeSelect" className="form-label mb-1">Theme</label>
                <select
                  id="uiThemeSelect"
                  className="form-select form-select-sm"
                  value={uiTheme}
                  onChange={changeUiTheme}
                  aria-label="Select UI theme"
                  title="Select UI theme"
                >
                  <option value="flat">Flat UI (current)</option>
                  <option value="material">Material</option>
                  <option value="round">Round Corners</option>
                  <option value="paper">Paper-like</option>
                  <option value="glass">Glass</option>
                  <option value="soft">Soft</option>
                </select>
              </div>
            )}

            {!isMinimized && (
              <div className="m-0">
                <label htmlFor="colorThemeSelect" className="form-label mb-1">Color</label>
                <select
                  id="colorThemeSelect"
                  className="form-select form-select-sm"
                  value={colorTheme}
                  onChange={changeColorTheme}
                  aria-label="Select color theme"
                  title="Select color theme"
                >
                  <option value="default">Default</option>
                  <option value="ocean">Ocean</option>
                  <option value="forest">Forest</option>
                  <option value="sunset">Sunset</option>
                  <option value="grape">Grape</option>
                  <option value="slate">Slate</option>
                  <option value="candy">Candy (Bright Pink)</option>
                  <option value="aqua">Aqua (Bright Cyan)</option>
                  <option value="citrus">Citrus (Bright Lime)</option>
                  <option value="flamingo">Flamingo (Coral)</option>
                  <option value="sky">Sky (Bright Blue) — Default</option>
                  <optgroup label="Old style">
                    <option value="sepia">Sepia</option>
                    <option value="newspaper">Newspaper</option>
                    <option value="terminal">Terminal</option>
                    <option value="vintage">Vintage</option>
                  </optgroup>
                  <optgroup label="Fancy">
                    <option value="neon">Neon</option>
                    <option value="aurora">Aurora</option>
                    <option value="luxe">Luxe</option>
                  </optgroup>
                </select>
              </div>
            )}
          </div>
        </div>)
        {/* } */}

 
 </div>
      </aside>
    </>
  );
});

export default Drawer;
