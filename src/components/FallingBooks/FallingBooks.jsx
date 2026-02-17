import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import './FallingBooks.css';
//This entire component was vibe coded, it is responsible for the falling books loop in the background of the login page.
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
            scale: 1.8,
            // Darts away horizontally and slightly upward against "gravity"
            x: Math.random() > 0.5 ? 250 : -250,
            y: -50, 
            rotateZ: Math.random() > 0.5 ? 90 : -90,
            transition: { 
              type: "spring", 
              stiffness: 500, // High stiffness for a "fast" dodge
              damping: 15     // Low damping for a slight "bounce"
            } 
          }}
        >
          <BookOpen className="book-model-icon text-indigo-600" />
        </motion.div>
      ))}
    </div>
  );
};

export default FallingBooks;