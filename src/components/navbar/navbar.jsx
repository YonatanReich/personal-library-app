import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/AuthContext.jsx';
import { NavLink } from 'react-router-dom';
import './navbar.css';
//This component is responsible for the navigation bar at the top of the app
const Navbar = () => {
  //We need to know which user to log out from
  const { user, logout } = useUserAuth();
  
  const navigate = useNavigate();
  //Handle logout - Delete user from localStorage and go back to main screen
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
          <NavLink 
         to="/search" 
         className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
        Search
        </NavLink>

         <NavLink 
         to="/wishlist" 
          className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
          My Wishlist
          </NavLink>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;