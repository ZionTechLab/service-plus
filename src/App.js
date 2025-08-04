import React, { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./features/auth/authSlice";
import "./App.css";
import { ModalProvider } from "./helpers/ModalService";
import { LoadingSpinnerProvider } from "./hooks/useLoadingSpinner";
import runAppMigrations from "./helpers/runAppMigrations";


function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    // Theme setup
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    document.documentElement.setAttribute("data-bs-theme", savedTheme);

    // App migration/version logic
    runAppMigrations();
  }, []);

  return (
    <LoadingSpinnerProvider>
      <ModalProvider>
        <div className="App">
          <AppRoutes isLoggedIn={isLoggedIn} />
        </div>
      </ModalProvider>
    </LoadingSpinnerProvider>
  );
}

export default App;