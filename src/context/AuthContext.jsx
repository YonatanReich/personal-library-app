import React, { createContext, useContext, useState, useEffect } from 'react';

const loggedUser = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('Personal_library_user_ID');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Start with an empty list; we will fill it based on the user session
  const [wishlist, setWishlist] = useState([]);

  
  useEffect(() => {
    if (user) {
      // Use the user's unique ID to isolate their data from others
      const saved = localStorage.getItem(`wishlist_${user.id}`);
      setWishlist(saved ? JSON.parse(saved) : []);
    } else {
      setWishlist([]); // Clear the list on logout to prevent data leakage
    }
  }, [user]);

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
  
  const addToWishlist = (book) => {
    // Only proceed if a user session exists
    if (!user) return;
    const updated = [...wishlist, book];
    // Sync to a user-specific key
    localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updated));
    setWishlist(updated);
  };

  const removeFromWishlist = (id) => {
    if (!user) return;
    const updated = wishlist.filter(b => b.id !== id);
    // Sync to a user-specific key
    localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updated));
    setWishlist(updated);
  };

  return (
    <loggedUser.Provider value={{ user, login, logout, wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </loggedUser.Provider>
  );
};

export const useUserAuth = () => useContext(loggedUser);