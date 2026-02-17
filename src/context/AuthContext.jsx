import React, { createContext, useContext, useState, useEffect } from 'react';

const loggedUser = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('Personal_library_user_ID');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Global state for the active user's wishlist
  const [wishlist, setWishlist] = useState([]);

  /**
   * Syncs the wishlist whenever the user changes (Login/Logout).
   * Prevents cross-user data leakage by using user-specific keys.
   */
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`wishlist_${user.id}`);
      setWishlist(saved ? JSON.parse(saved) : []);
    } else {
      setWishlist([]); // Reset state on logout
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
  
  /**
   * Adds a book to the current user's isolated storage bucket.
   */
  const addToWishlist = (book) => {
    if (!user) return;
    setWishlist((prev) => {
      if (prev.find(b => b.id === book.id)) return prev; // Duplicate check
      const updated = [...prev, book];
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  /**
   * Removes a book and updates the specific user's storage.
   */
  const removeFromWishlist = (id) => {
    if (!user) return;
    const updated = wishlist.filter(b => b.id !== id);
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