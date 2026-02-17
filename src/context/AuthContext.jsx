import React, { createContext, useContext, useState, useEffect } from 'react';

// Your preferred context name
const loggedUser = createContext();

export const AuthProvider = ({ children }) => {
  // We make sure to set the user state to the logged user utilizing localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('Personal_library_user_ID');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Naive login function, building an ID from the username and using localStorage
  const login = (username) => {
    const userData = {
      username,
      id: username.toLowerCase().trim().replace(/\s+/g, '_')
    };
    setUser(userData);
    localStorage.setItem('Personal_library_user_ID', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('Personal_library_user_ID');
  };

  // Provide user auth tools to all children components.
  return (
    <loggedUser.Provider value={{ user, login, logout }}>
      {children}
    </loggedUser.Provider>
  );
};

// IMPORTANT: Added 'use' prefix to satisfy React's compiler rules
export const useUserAuth = () => useContext(loggedUser);