import React, { createContext, useContext, useState, useEffect } from 'react';

// Our user context name
const loggedUser = createContext();

export const AuthProvider = ({ children }) => {
  // We make sure to set the user state to the logged user utilizing localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('Personal_library_user_ID');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  //We set shared data (wishlist) here becasue both searchpage and wishlist page need to accsess it
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist') || '[]'));

  // Naive login function, building an ID from the username and using localStorage
  const login = (username) => {
    const userData = {
      username,
      id: username.toLowerCase().trim().replace(/\s+/g, '_')
    };
    setUser(userData);
    localStorage.setItem('Personal_library_user_ID', JSON.stringify(userData));
  };
  // Logginh out, delete userfrom localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('Personal_library_user_ID');
  };
  
  const addToWishlist = (book) => {
    const updated = [...wishlist, book];
    localStorage.setItem('wishlist', JSON.stringify(updated));
    setWishlist(updated);
  };

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(b => b.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    setWishlist(updated);
  };

  // Provide user auth tools to all children components.
  return (
    <loggedUser.Provider value={{ user, login, logout, wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </loggedUser.Provider>
  );
};

//Naming shortcut
export const useUserAuth = () => useContext(loggedUser);