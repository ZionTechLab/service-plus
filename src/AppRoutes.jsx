import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layout/MainLayout";
import BusinessPartner from "./pages/BusinessPartners";
import AddBusinessPartner from "./pages/BusinessPartners/AddBusinessPartner";
import Inquary from "./pages/Inquary";
import AddInquary from "./pages/Inquary/AddInquary";
import InquiryView from "./pages/Inquary/InquiryView";
// import AddBusinessPartner from "./pages/BusinessPartners/AddBusinessPartner";


import ItemMaster from "./pages/ItemMaster";
import ItemCategory from "./pages/ItemCategory";


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
          <MainLayout />
        </ProtectedRoute>
      }
    > <Route path="business-partner" element={<BusinessPartner />} />
      <Route path="business-partner/add" element={<AddBusinessPartner />} />
      <Route path="business-partner/edit/:id" element={<AddBusinessPartner />} />   
      <Route path="inquiry" element={<Inquary />} />
      <Route path="inquiry/add" element={<AddInquary />} />
      <Route path="inquiry/edit/:id" element={<AddInquary />} />

      {/* <Route path="business-partner/edit/:id" element={<AddBusinessPartner />} /> */}
      {/* <Route path="service-inquiry/:id" element={<AddInquary />} /> */}

      <Route path="item-master" element={<ItemMaster />} />
      <Route path="item-category" element={<ItemCategory />} />

      <Route path="inquiry/:id" element={<InquiryView />} />
    
      <Route path="add-item" element={<AddItem />} />
      <Route path="profile" element={<Profile />} />
      <Route path="grn" element={<Grn />} />
    </Route>
  </Routes>
);

export default AppRoutes;
