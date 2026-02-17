import React, { useState } from 'react';
import './searchPage.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12`);
    const data = await res.json();
    setBooks(data.items || []);
  };

  const addToWishlist = (book) => {
    const current = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!current.find(b => b.id === book.id)) {
      localStorage.setItem('wishlist', JSON.stringify([...current, book]));
      alert('Added to wishlist!');
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Find Your Next Read</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input 
            className="search-input" 
            placeholder="Search by title or author..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
      </header>

      <div className="book-grid">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <img 
              src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Cover'} 
              alt={book.volumeInfo.title}
            />
            <div className="book-details">
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(', ')}</p>
              <button onClick={() => addToWishlist(book)} className="action-btn">Add to Wishlist</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;