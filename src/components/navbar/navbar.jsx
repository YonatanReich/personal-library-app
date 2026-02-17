import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/AuthContext.jsx';
import './navbar.css';

const Navbar = () => {
  const { user, logout } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-logo">Library<span>Tracker</span></Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Search</Link>
          <Link to="/wishlist" className="nav-link">My Wishlist</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;