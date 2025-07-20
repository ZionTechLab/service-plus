import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Drawer from "../layout/Drawer";
import Footer from "../layout/Footer";
import Overlay from "../components/Overlay";
import "../components/MainPage/MainPage.css";

function MainPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
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

    if (isDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen]);

  return (
    <div className="main-page-layout">
      <Navbar onToggleDrawer={toggleDrawer} />
      <Overlay isOpen={isDrawerOpen} onClick={() => setIsDrawerOpen(false)} />
      <div className="main-content-area">
        <Drawer ref={drawerRef} isOpen={isDrawerOpen} onClose={toggleDrawer} />
        <main className="content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
