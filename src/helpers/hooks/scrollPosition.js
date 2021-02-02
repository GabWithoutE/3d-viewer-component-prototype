import { useEffect, useState } from 'react';

/**
 * Custom React Hook for keeping track of the scrollPosition.
 * @returns {number}
 */
export default function useScrollYPosition() {
  const [scrollYPosition, setScrollPosition] = useState(window.scrollY);

  /**
   * Registers an event listener on the window's "scroll" event on first render.
   * @returns {callback} De-registers listener when de-rendered.
   */
  useEffect(() => {
    const onScroll = () => {
      setScrollPosition(window.scrollY);
    }
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollYPosition;
}
