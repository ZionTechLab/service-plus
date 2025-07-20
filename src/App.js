import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./features/auth/authSlice";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ServiceInquiry from "./pages/ServiceInquiry";
import CustomerMaster from "./pages/CustomerMaster";
import ItemMaster from "./pages/ItemMaster";
import ItemCategory from "./pages/ItemCategory";
import InquiryList from "./pages/InquiryList";
import InquiryView from "./pages/InquiryView";
import AddCustomer from "./pages/AddCustomer";
import AddItem from "./pages/AddItem";
import Profile from "./pages/Profile";
import Grn from "./pages/Grn";
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
        <Route path="item-category" element={<ItemCategory />} />
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
    
  );
}

export default App;
