import React, { useState, useEffect } from 'react';
import PageTransition from '../../components/pageTransition.jsx';
import './wishlistPage.css';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(saved);
  }, []);

  const removeBook = (id) => {
    const updatedWishList = wishlist.filter(b => b.id !== id);
    setWishlist(updatedWishList);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishList));
  };

  return (
    <PageTransition>
    <div className="page-container">
      <h1 className="page-title">My Wishlist</h1>
      <div className="book-grid">
        {wishlist.length > 0 ? (
          wishlist.map(book => (
            <div key={book.id} className="book-card">
              <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
              <div className="book-details">
                <h3>{book.volumeInfo.title}</h3>
                <button onClick={() => removeBook(book.id)} className="remove-btn">Remove</button>
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