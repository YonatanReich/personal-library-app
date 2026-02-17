import React, { useState } from 'react';
import { useUserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import FallingBooks from '../../components/FallingBooks/FallingBooks.jsx';
import PageTransition from '../../components/pageTransition.jsx';

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
      // Redirects to the wishlist page immediately
      navigate('/wishlist'); 
    }
  };

  return (
    <PageTransition>
    <div className="login-container">
      <FallingBooks />
      <div className="login-box">
          <h1 className="App-name">
            
        <span className="text-indigo-600">Library</span>
        <span className="text-black">Tracker</span>
        </h1>
        <p className="welcome-text">Log in to view your collection</p>
        
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
            Take me to my books!
          </button>
        </form>
      </div>
      </div>
      </PageTransition>
  );
};

export default LoginPage;