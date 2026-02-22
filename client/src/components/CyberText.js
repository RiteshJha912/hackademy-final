import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Restricted to alphanumeric for width stability

const CyberText = ({ text, className = '' }) => {
  // Scramble once immediately to reserve layout space and prevent "broken" flash
  const [displayText, setDisplayText] = useState(() => 
    text.split('').map(l => l === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]).join('')
  );
  const intervalRef = useRef(null);

  useEffect(() => {
    let count = 0;
    const maxGlitches = 10; // Number of scramble cycles
    
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter) => {
            if (letter === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      count += 1;

      if (count >= maxGlitches) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, 40);

    return () => clearInterval(intervalRef.current);
  }, [text]);

  return (
    <motion.span 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1, 
        x: [0, -2, 2, -1, 1, 0],
      }}
      transition={{ 
        duration: 0.4,
        ease: "easeInOut"
      }}
    >
      {displayText}
    </motion.span>
  );
};

export default CyberText;
