import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useUserAuth } from './context/AuthContext.jsx';

import { AnimatePresence } from 'framer-motion';
import Navbar from './components/navbar/navbar.jsx';
import LoginPage from './pages/loginPage/loginPage.jsx';
import SearchPage from './pages/searchPage/searchPage.jsx';
import WishlistPage from './pages/wishlistPage/wishlistPage.jsx';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const location = useLocation(); 

  return (
    <AuthProvider>
      <Navbar />
      
      {/* mode="wait" ensures the old page fades out before the new one slides in */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/search" element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          } />
          
          <Route path="/wishlist" element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        </AnimatePresence>
     
    </AuthProvider>
  );
}

export default App;