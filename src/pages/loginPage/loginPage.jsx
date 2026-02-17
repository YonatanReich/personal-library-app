import React, { useState } from 'react';
import { useUserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import FallingBooks from '../../components/FallingBooks/FallingBooks.jsx';
import './loginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const { login } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      // Calls the login function from our context
      login(username); 
      // Redirects to the search page immediately
      navigate('/'); 
    }
  };

  return (
    <div className="login-container">
      <FallingBooks />
      <div className="login-box">
        <h1 className="brand-name">LibraryTracker</h1>
        <p className="welcome-text">Enter a username to start your collection</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <input 
            type="text" 
            placeholder="Username" 
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
          <button type="submit" className="enter-btn">
            Enter Library
          </button>
        </form>
        
        <p className="hint-text">
          No password needed. Your list is saved to this browser.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;