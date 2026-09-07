import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Navbar from './component/common/Navbar';
import FooterComponent from './component/common/Footer';
import HomePage from './component/home/HomePage';
import AllFacilitiesPage from './component/booking_facilities/AllFacilitiesPage';
import FindBookingPage from './component/booking_facilities/FindBookingPage';
import FacilityDetailsPage from './component/booking_facilities/FacilityDetailsPage';
import LoginPage from './component/auth/LoginPage';
import RegisterPage from './component/auth/RegisterPage';
import ProfilePage from './component/profile/ProfilePage';
import EditProfilePage from './component/profile/EditProfilePage';
import { ProtectedRoute ,AdminRoute} from './service/guard';
import AdminPage from './component/admin/AdminPage';
import ManageFacilityPage from './component/admin/ManageFacilityPage';
import ManageBookingsPage from './component/admin/ManageBookingsPage';
import AddFacilityPage from './component/admin/AddFacilityPage';
import EditFacilityPage from './component/admin/EditFacilityPage';
import EditBookingPage from './component/admin/EditBookingPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/facilities" element={<AllFacilitiesPage />} />
            <Route path="/find-booking" element={<FindBookingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route path="/facility-details-book/:facilityId"
             element={<ProtectedRoute element={<FacilityDetailsPage />} />} />
            <Route path="/profile"
              element={<ProtectedRoute element={<ProfilePage />} />}
            />
            <Route path="/edit-profile"
              element={<ProtectedRoute element={<EditProfilePage />} />}
            />

            {/* Admin Routes */}
            <Route path="/admin"
              element={<AdminRoute element={<AdminPage />} />}
              />
              <Route path="/admin/manage-facilities"
              element={<AdminRoute element={<ManageFacilityPage />} />}
            />
            <Route path="/admin/manage-bookings"
              element={<AdminRoute element={<ManageBookingsPage />} />}
            />
            <Route path="/admin/add-facility"
              element={<AdminRoute element={<AddFacilityPage />} />}
            />
            <Route path="/admin/edit-facility/:facilityId"
              element={<AdminRoute element={<EditFacilityPage />} />}
            />
            <Route path="/admin/edit-booking/:bookingCode"
              element={<AdminRoute element={<EditBookingPage />} />}
            />


              {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/login" />} />

            
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
