import { useState, useEffect } from 'react';

interface StickyResult {
  sticky: boolean;
}

const UseSticky = (): StickyResult => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Header becomes sticky after scrolling 100px
      if (scrollTop > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { sticky };
};

export default UseSticky;