import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useUserAuth } from './context/AuthContext';
import LoginPage from './pages/loginPage/loginPage';
import './App.css';

/**
 * ProtectedRoute checks if a user is logged in.
 * If not, it redirects them to the login page.
 */
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* The Login Page is the entry point */}
          <Route path="/login" element={<LoginPage />} />

          {/* Home Route: Currently protected, but we'll add content soon */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                {/* This is a placeholder until the SearchPage is ready.
                  Note: No welcome messages here; they live in the LoginPage.
                */}
                <div className="main-placeholder" />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all: Redirect any unknown URL back to the root */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;