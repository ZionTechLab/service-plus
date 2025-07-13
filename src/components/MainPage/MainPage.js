import React, { useState, useEffect, useRef } from 'react';
import TopNavBar from './TopNavBar';
import Drawer from './Drawer';
import Footer from './Footer';
import Overlay from './Overlay'; // Import the Overlay component
import { Outlet } from 'react-router-dom'; // Import Outlet
import './MainPage.css';

function MainPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null); // Ref for the Drawer component/element

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Click outside to close drawer logic
  useEffect(() => {
    function handleClickOutside(event) {
      // If drawer is open, drawerRef exists, and click is outside the drawer
      if (isDrawerOpen && drawerRef.current && !drawerRef.current.contains(event.target)) {
        // Optional: Check if the click was on the toggle button itself to prevent immediate re-close
        // This might be needed if the toggle button is not part of the drawerRef
        const toggleButton = document.querySelector('.drawer-toggle-btn'); // Be specific if multiple toggles
        if (toggleButton && toggleButton.contains(event.target)) {
          return;
        }
        setIsDrawerOpen(false);
      }
    }

    if (isDrawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDrawerOpen]); // Re-run effect if isDrawerOpen changes

  return (
    <div className="main-page-layout">
      <TopNavBar onToggleDrawer={toggleDrawer} />
      <Overlay isOpen={isDrawerOpen} onClick={() => setIsDrawerOpen(false)} />
      <div className="main-content-area">
        {/* Pass the ref to the Drawer component. The Drawer component itself needs to forward this ref. */}
        <Drawer ref={drawerRef} isOpen={isDrawerOpen} onClose={toggleDrawer} />
        <main className="content"> {/* No longer need drawer-open class for margin */}
          <Outlet /> {/* Child routes will render here */}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
