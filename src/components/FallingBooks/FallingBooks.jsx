import React from 'react';
import { motion } from 'framer-motion';
import { Book } from 'lucide-react';
import './FallingBooks.css';

const FallingBooks = () => {
  const books = Array.from({ length: 25 }); // Number of falling books

  return (
    <div className="animation-container">
      {books.map((_, i) => (
        <motion.div
          key={i}
          className="book-wrapper"
          initial={{ 
            y: -100, 
            x: Math.random() * window.innerWidth, 
            rotate: Math.random() * 360 
          }}
          animate={{ 
            y: window.innerHeight + 100,
            rotate: 360
          }}
          transition={{
            duration: Math.random() * 12 + 8,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          whileHover={{ 
            scale: 2,
            x: Math.random() > 0.5 ? 250 : -250,
            transition: { type: "spring", stiffness: 400 } 
          }}
        >
          <Book className="book-icon" />
        </motion.div>
      ))}
    </div>
  );
};

export default FallingBooks;