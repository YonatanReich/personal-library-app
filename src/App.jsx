import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useUserAuth } from './context/AuthContext.jsx';
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
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;