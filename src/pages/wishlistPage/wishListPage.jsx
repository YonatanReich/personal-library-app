import React from 'react';
import { useUserAuth } from '../../context/AuthContext.jsx';
import PageTransition from '../../components/pageTransition.jsx';
import './wishlistPage.css';

/**
 * Renders the saved collection for the currently authenticated user.
 * Consumes global state from AuthContext to stay in sync with the Search page.
 */
const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useUserAuth();

  return (
    <PageTransition>
      <div className="page-container">
        <h1 className="page-title">My Wishlist</h1>
        <div className="book-grid">
          {wishlist.length > 0 ? (
            wishlist.map(book => (
              <div key={book.id} className="book-card">
                <img 
                  src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Cover'} 
                  alt={book.volumeInfo.title} 
                />
                <div className="book-details">
                  <h3>{book.volumeInfo.title}</h3>
                  {/* Triggers global removal logic */}
                  <button onClick={() => removeFromWishlist(book.id)} className="remove-btn">
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-msg">Your wishlist is empty.</p>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default WishlistPage;