import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './features/auth/authSlice';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import ServiceInquiry from './components/ServiceInquiry';
import CustomerMaster from './components/CustomerMaster';
import ItemMaster from './components/ItemMaster';
import InquiryList from './components/InquiryList';
import InquiryView from './components/InquiryView';
// import TravelAssistantPage from './components/TravelAssistantPage';
// import Dashboard from './features/Dashboard';
// import UserProfile from './features/UserProfile';
// import NewItinerary from './features/NewItinerary';
import './App.css';

// Protected route wrapper
const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// Public route wrapper
const PublicRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? <Navigate to="/main" replace /> : children;
};

function App() {
  const isLoggedIn =useSelector(selectIsLoggedIn);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" 
          element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route
            path="/main"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <MainPage />
              </ProtectedRoute>
            }
          >
            {/* <Route index element={<Dashboard />} /> */}
           <Route path="travel-assistant" element={<h1 >ddd</h1>} />
           <Route path="service-inquiry" element={<ServiceInquiry />} />
           <Route path="customer-master" element={<CustomerMaster />} />
           <Route path="item-master" element={<ItemMaster />} />
           <Route path="inquiry-list" element={<InquiryList />} />
           <Route path="inquiry/:id" element={<InquiryView />} />
            {/* <Route path="profile" element={<UserProfile />} />
            <Route path="new-itinerary" element={<NewItinerary />} />  */}
          </Route>

          {/* Root Route */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/main/travel-assistant" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;