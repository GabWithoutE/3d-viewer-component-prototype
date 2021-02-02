import { useState, useEffect } from 'react';

/**
 * @brief Preloads images and persists in memory using a hook
 *
 * @param sources
 * @return loading (returns whether the images have finished preloading or not)
 */
export default function useImagePreload(sources) {
  const [,setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * @brief Preloads image on first render, sets loading state when images are preloaded.
   */
  useEffect(() => {
    const preloadImages = sources.map((source) => new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };

      image.src = source;
    }));

    /**
     * Uses state hook to store preloaded images to keep in memory.
     */
    Promise.all(preloadImages).then((values) => {
      setLoading(false);
      setImages(values);
    });
  }, [sources]);

  return loading;
}
