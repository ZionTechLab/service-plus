import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./features/auth/authSlice";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import ServiceInquiry from "./components/ServiceInquiry";
import CustomerMaster from "./components/CustomerMaster";
import ItemMaster from "./components/ItemMaster";
import InquiryList from "./components/InquiryList";
import InquiryView from "./components/InquiryView";
import AddCustomer from "./components/AddCustomer";
import AddItem from "./components/AddItem";
import Profile from "./components/Profile";
import Grn from "./components/Grn";
import "./App.css";

// Protected route wrapper
const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// Public route wrapper
const PublicRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? <Navigate to="/" replace /> : children;
};

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
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                <LoginPage />
              </PublicRoute>
            }
          />

         <Route
        path="/"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <MainPage />
          </ProtectedRoute>
        }
      >
          <Route path="service-inquiry" element={<ServiceInquiry />} />
          <Route path="service-inquiry/:id" element={<ServiceInquiry />} />
          <Route path="customer-master" element={<CustomerMaster />} />
          <Route path="item-master" element={<ItemMaster />} />
          <Route path="inquiry-list" element={<InquiryList />} />
          <Route path="inquiry/:id" element={<InquiryView />} />

          <Route path="add-customer" element={<AddCustomer />} />
          <Route path="add-item" element={<AddItem />} />
          <Route path="profile" element={<Profile />} />
          <Route path="grn" element={<Grn />} />
    </Route>
          {/* <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/main/travel-assistant" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
