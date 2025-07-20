import React, { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./features/auth/authSlice";
import "./App.css";


function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    document.documentElement.setAttribute("data-bs-theme", savedTheme);
  }, []);

  return (
    <div className="App">
      <AppRoutes isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
