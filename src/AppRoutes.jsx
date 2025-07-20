import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ServiceInquiry from "./pages/ServiceInquiry";
import BusinessPartner from "./pages/BusinessPartners";
import AddBusinessPartner from "./pages/BusinessPartners/AddBusinessPartner";
import ItemMaster from "./pages/ItemMaster";
import ItemCategory from "./pages/ItemCategory";
import InquiryList from "./pages/InquiryList";
import InquiryView from "./pages/InquiryView";

import AddItem from "./pages/AddItem";
import Profile from "./pages/Profile";
import Grn from "./pages/Grn";

// Protected route wrapper
const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// Public route wrapper
const PublicRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? <Navigate to="/" replace /> : children;
};

const AppRoutes = ({ isLoggedIn }) => (
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
    > <Route path="business-partner" element={<BusinessPartner />} />
      <Route path="business-partner/add" element={<AddBusinessPartner />} />
      <Route path="service-inquiry" element={<ServiceInquiry />} />
      <Route path="service-inquiry/:id" element={<ServiceInquiry />} />
     
      <Route path="item-master" element={<ItemMaster />} />
      <Route path="item-category" element={<ItemCategory />} />
      <Route path="inquiry-list" element={<InquiryList />} />
      <Route path="inquiry/:id" element={<InquiryView />} />
    
      <Route path="add-item" element={<AddItem />} />
      <Route path="profile" element={<Profile />} />
      <Route path="grn" element={<Grn />} />
    </Route>
  </Routes>
);

export default AppRoutes;
