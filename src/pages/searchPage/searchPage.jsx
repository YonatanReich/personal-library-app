import React, { useCallback, useEffect, useState } from 'react';
import { useUserAuth } from '../../context/AuthContext';
import { RotateLoader } from 'react-spinners';
import PageTransition from '../../components/pageTransition.jsx';
import './searchPage.css';
//This page handles the search functionality of the App
const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const { wishlist, addToWishlist } = useUserAuth();
  //We define an arbitrary number of results to load in the API call
  const RESULTS_PER_PAGE = 40;
 //We must memoize the API call functions or we will get an infinite loop later
  const fetchBooks = useCallback(async (searchQuery, index, isAppend = false) => {
    //Dont look for anything if the query is simply whitespaces
    if (!searchQuery?.trim()) {
      setBooks([]);
      return;
    }
    const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_KEY;

    setLoading(true);
    try {
      //The API call - We want all matching books for the query, and each time we want to get them from the index of those we
      //already have. So in the first search we'll get books 0-40 that match the result, when we click load more we get 40-80 etc
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${index}&maxResults=${RESULTS_PER_PAGE}&key=${apiKey}`
      );
      
      const data = await res.json();
      
      // Normalize results: API returns undefined for 'items' if no matches found
      const newItems = data.items || [];

      //We account for pagination - if the set isnt empty, we append the new books to the end of the set
      setBooks((prev) => (isAppend ? [...prev, ...newItems] : newItems));
    } catch (error) {
      console.error("Search failed:", error);
      // Only clear books if this was a fresh search (not a 'load more' failure)
      if (!isAppend) setBooks([]); 
    } finally {
      setLoading(false);
    }
  }, []);

//Debouncing logic
useEffect(() => {
    // Initialize a 500ms delay to prevent excessive API calls while typing
    const timer = setTimeout(() => {
      if (query.trim()) {
        // Reset pagination to the beginning for every new search term
        setStartIndex(0);
        fetchBooks(query, 0, false);
      } else {
        //The query is only whitespaces, reset the book state
        setBooks([]);
      }
    }, 500);

    // Cleanup function: Cancels the timer if the user types again before 500ms
    return () => clearTimeout(timer);
}, [query, fetchBooks]);

  // Manual Search Handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setStartIndex(0);
    fetchBooks(query, 0, false);
  };

  // Pagination Handler
  const handleLoadMore = () => {
    const nextIndex = startIndex + RESULTS_PER_PAGE;
    setStartIndex(nextIndex);
    fetchBooks(query, nextIndex, true);
  };
//Modal opening, set the selected book to be the caller
  const openModal = (book) => {
    setSelectedBook(book);
  }

  const closeModal = () => setSelectedBook(null);

  return (
    <PageTransition>
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Find Your Next Read</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            className="search-input"
            placeholder="What are we reading today?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? <RotateLoader color="#ffffff" size={6} /> : 'Search'}
          </button>
        </form>
      </header>

      <div className="book-grid">
        {books?.map((book) => {
          //How we can tell if a search result is already in our wish list, because we inherit the list from userAuth
          const isAlreadyAdded = wishlist?.some((b) => b.id === book.id);

          return (
            <div key={book.id} className="book-card" onClick={() => openModal(book)}>
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Cover'}
                alt={book.volumeInfo.title}
              />
              <div className="book-details">
                <h3>{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.authors?.join(', ')}</p>
                 <div onClick={(e) => e.stopPropagation()}>
                {isAlreadyAdded ? (
                  <div className="wishlisted-indicator"></div>
                ) : (
                  <button onClick={() => addToWishlist(book)} className="wishlist-btn">
                    Add to Wishlist
                  </button>
                )}
              </div>
              </div>
              </div>
          );
        })}
      </div>

      {(books?.length ?? 0) > 0 && (
        <div className="loadMore-container">
          <button
            onClick={handleLoadMore}
            className="load-more-btn"
            disabled={loading}
          >
            {loading ? <RotateLoader color="#ffffff" size={8} /> : 'Load More Results'}
          </button>
        </div>
      )}
      {selectedBook && (
  <div className="modal-overlay" onClick={closeModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-modal" onClick={closeModal}>&times;</button>
      
      <div className="modal-text-only">
        <h2 className="modal-title">{selectedBook.volumeInfo.title}</h2>
        <p className="modal-author">by {selectedBook.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
        
        <div className="modal-description">
          {selectedBook.volumeInfo.description ? (
            
            <p>{selectedBook.volumeInfo.description.replace(/<[^>]*>/g, '')}</p>
          ) : (
            <p className="italic text-gray-400">No summary available for this book.</p>
          )}
        </div>

        <div className="modal-actions">
           {!wishlist?.some(b => b.id === selectedBook.id) && (
             <button 
               onClick={() => { addToWishlist(selectedBook); closeModal(); }} 
               className="action-btn"
             >
               Add to Wishlist
             </button>
           )}
        </div>
      </div>
    </div>
  </div>
)}
      </div>
      </PageTransition>
  );
};

export default SearchPage;