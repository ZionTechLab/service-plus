import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import LoadingSpinnerService from "../services/LoadingSpinnerService";

const LoadingSpinnerContext = createContext();

export function useLoadingSpinner() {
  return useContext(LoadingSpinnerContext);
}

export function LoadingSpinnerProvider({ children }) {
  const [spinnerConfig, setSpinnerConfig] = useState({
    show: false,
    message: "",
  });

  let text = "Loading...",
    className = "d-flex justify-content-center align-items-center py-5",
    spinnerClass = "spinner-border text-primary",
    role = "status";

  const showSpinner = useCallback((message = "Loading...") =>
    setSpinnerConfig({ show: true, message }),
  []);
  const hideSpinner = useCallback(() => setSpinnerConfig({ show: false, message: "" }), []);

  useEffect(() => {
    // register the provider's show/hide so non-React code can control the spinner
    LoadingSpinnerService.register(showSpinner, hideSpinner);
    return () => LoadingSpinnerService.unregister();
  }, [showSpinner, hideSpinner]);

  return (
    <LoadingSpinnerContext.Provider value={{ showSpinner, hideSpinner }}>
      {children}
      {spinnerConfig.show && (
        <div
          className={className}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1050,
            background: "rgba(255,255,255,0.6)",
          }}
        >
          <div className={spinnerClass} role={role}>
            <span className="visually-hidden">{text}</span>
          </div>
        </div>
      )}
    </LoadingSpinnerContext.Provider>
  );
}
