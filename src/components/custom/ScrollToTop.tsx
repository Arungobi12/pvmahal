import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Get the current page location
  const { pathname } = useLocation();

  // This `useEffect` hook will run every time the pathname changes
  useEffect(() => {
    // Scroll the window to the top left corner (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]); // The effect depends on the pathname

  return null; // This component does not render anything
};

export default ScrollToTop;