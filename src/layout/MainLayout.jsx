import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Drawer from "./Drawer";
import Footer from "./Footer";
import Overlay from "./Overlay";
import "./MainPage.css";

function MainLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerMinimized, setIsDrawerMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const drawerRef = useRef(null);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 992; // Bootstrap lg breakpoint
      setIsMobile(mobile);
      
      // Reset states when switching between mobile/desktop
      if (mobile) {
        setIsDrawerOpen(false);
        setIsDrawerMinimized(false);
      } else {
        setIsDrawerOpen(true); // Always open on desktop
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleDrawer = () => {
    if (isMobile) {
      setIsDrawerOpen(!isDrawerOpen);
    } else {
      setIsDrawerMinimized(!isDrawerMinimized);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isMobile &&
        isDrawerOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target)
      ) {
        const toggleButton = document.querySelector(".drawer-toggle-btn");
        if (toggleButton && toggleButton.contains(event.target)) {
          return;
        }
        setIsDrawerOpen(false);
      }
    }

    if (isMobile && isDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen, isMobile]);

  return (
    <div className="main-page-layout">
      <Navbar onToggleDrawer={toggleDrawer} />
      <div className={`main-container ${!isMobile ? (isDrawerMinimized ? 'drawer-minimized' : 'drawer-expanded') : ''}`}>
        <Drawer 
          ref={drawerRef} 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)}
          isMinimized={isDrawerMinimized}
          isMobile={isMobile}
        />
        {isMobile && <Overlay isOpen={isDrawerOpen} onClick={() => setIsDrawerOpen(false)} />}
        <main className="content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
