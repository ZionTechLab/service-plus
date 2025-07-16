import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess, selectUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './TopNavBar.css';

function TopNavBar({ onToggleDrawer }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [theme, setTheme] = useState('light');

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate('/login', { replace: true });
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  return (
    <nav className="top-nav-bar ">

      <div className="nav-left">
        <button onClick={onToggleDrawer} className="drawer-toggle-btn">
          ☰
        </button>
        <span className="nav-title">Travel Assistant</span>
      </div>
      <div className="nav-right">
        {user && <span className="user-greeting">Hello, {user.name}!</span>}
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
        <button onClick={toggleTheme} className="theme-switcher-btn">
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
    </nav>
  );
}

export default TopNavBar;
