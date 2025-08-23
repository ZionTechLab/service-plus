import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layout/MainLayout";
import BusinessPartner from "./pages/BusinessPartners";
import AddBusinessPartner from "./pages/BusinessPartners/AddBusinessPartner";
import VehicaleConfirmation from "./pages/VehicaleConfirmation";
import AddConfirmation from "./pages/VehicaleConfirmation/AddConfirmation";
import UserMaster from "./pages/UserMaster";
import AddUser from "./pages/UserMaster/AddUser";
import Inquary from "./pages/Inquary";
import AddInquary from "./pages/Inquary/AddInquary";
import InquiryView from "./pages/Inquary/InquiryView";
import Invoice from "./pages/Invoice";
import AddInvoice from "./pages/Invoice/Invoice";
import DailyReportIndex from "./pages/DailyReport";
import AddDailyReport from "./pages/DailyReport/AddReport";
import Dashboard from "./pages/Dashboard";
import Refferances from "./pages/Refferances";
import AddRefferances from "./pages/Refferances/AddRefferances";
// import AddBusinessPartner from "./pages/BusinessPartners/AddBusinessPartner";


import ItemMaster from "./pages/ItemMaster";
import AddItem from "./pages/ItemMaster/AddItem";
import ItemCategory from "./pages/ItemCategory";



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
const dynamicRoutes = [
  { path: "test", element: <div>Test Page</div> },
  { path: "example-page-2", element: <DailyReportIndex /> },
];

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
      <Route index element={<Dashboard />} />
      <Route path="business-partner/add" element={<AddBusinessPartner />} />
      <Route path="business-partner/edit/:id" element={<AddBusinessPartner />} />   

      <Route path="vehicale-confirmation" element={<VehicaleConfirmation />} />
      <Route path="vehicale-confirmation/add" element={<AddConfirmation />} />
      <Route path="vehicale-confirmation/edit/:id" element={<AddConfirmation />} />
      <Route path="inquiry" element={<Inquary />} />
      <Route path="inquiry/add" element={<AddInquary />} />
      <Route path="inquiry/edit/:id" element={<AddInquary />} />

      <Route path="user-master" element={<UserMaster />} />
      <Route path="user-master/add" element={<AddUser />} />
      <Route path="user-master/edit/:id" element={<AddUser />} />

      <Route path="item-master" element={<ItemMaster />} />
      <Route path="item-master/add" element={<AddItem />} />
      <Route path="item-category" element={<ItemCategory />} />

      <Route path="inquiry/:id" element={<InquiryView />} />
    
      <Route path="add-item" element={<AddItem />} />
      <Route path="profile" element={<Profile />} />
      <Route path="grn" element={<Grn />} />

      <Route path="invoice" element={<Invoice />} />
      <Route path="invoice/add" element={<AddInvoice />} />
      <Route path="invoice/edit/:id" element={<AddInvoice />} />

      <Route path="tax-invoice" element={<Invoice />} />
      <Route path="tax-invoice/add" element={<AddInvoice />} />
      <Route path="tax-invoice/edit/:id" element={<AddInvoice />} />

      <Route path="daily-report" element={<DailyReportIndex />} />
      <Route path="daily-report/add" element={<AddDailyReport />} />
      <Route path="daily-report/edit/:id" element={<AddDailyReport />} />

      <Route path="refferance" element={<Refferances />} />
      <Route path="refferance/add" element={<AddRefferances />} />
      <Route path="refferance/edit/:id" element={<AddRefferances   />} />
       {dynamicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Route>
  </Routes>
);

export default AppRoutes;
