import  { useEffect } from "react";
import { MessageBoxProvider } from "./components/MessageBoxProvider";
import AppRoutes from "./AppRoutes";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./features/auth/authSlice";
// import "./App.css";
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

  // UI theme (shape/elevation) setup
    const savedUiTheme = localStorage.getItem("uiTheme") || "material";
  document.documentElement.setAttribute("data-theme", savedUiTheme);

    // Color palette setup
    const savedColorTheme = localStorage.getItem("colorTheme") || "sky";
    if (savedColorTheme === "default") {
      document.documentElement.removeAttribute("data-color");
    } else {
      document.documentElement.setAttribute("data-color", savedColorTheme);
    }

    // App migration/version logic
    runAppMigrations();
  }, []);

  return (
    <LoadingSpinnerProvider>
      <ModalProvider>
        <MessageBoxProvider>
          <div className="App">
            <AppRoutes isLoggedIn={isLoggedIn} />
          </div>
        </MessageBoxProvider>
      </ModalProvider>
    </LoadingSpinnerProvider>
  );
}

export default App;