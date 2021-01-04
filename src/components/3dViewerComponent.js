import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';



/**
 * @return {number}
 */
function calculateCurrentImage(currentImage, action) {
  if (action.scrollPosition < action.imagePosition) return currentImage;

  return Math.min(
    Math.floor((action.scrollPosition - action.imagePosition) / action.scrollSpacePerFrame),
    action.numberOfImages);
}

/**
 * Scrolling3DViewerComponent:
 * (Functionality):
 *    Imitates the 3d scrolling product viewers on apple.com... see: https://www.apple.com/airpods-max/
 *
 * (How it works):
 *    set CSS of the image element to make it stop scrolling with the rest of the page when the page's scroll is equal
 *    to the images position
 *    swap out images based on the number of scrollSpacePerFrame's are occupied
 *    allow normal scrolling when scrollSpacePerFrame * number of frames + element position is exceeded
 *
 * @param imagePathPrefix
 *    path and prefix of the set of images to scroll through
 * @param scrollSpacePerFrame
 *    amount of scrolling y distance between each frame
 * @returns {*}
 *
 */

export default function Scrolling3DViewerComponent({imagePath, images, scrollSpacePerFrame, scrollPosition}) {
  // const [currentImage, setCurrentImage] = useReducer(, 0, () => return 0);
  const [currentImage, dispatchCurrentImage] = useReducer(calculateCurrentImage, 0);

  const [imagePosition] = useState(
    document.getElementById("first-3d-image").getBoundingClientRect().y
  );

  useEffect(() => {
    dispatchCurrentImage({
      imagePosition: imagePosition,
      scrollPosition: scrollPosition,
      scrollSpacePerFrame: scrollSpacePerFrame,
      numberOfImages: images.length
    });
  }, [scrollPosition, images.length, scrollSpacePerFrame, imagePosition]);

  return (
    <div>
      {images.map((image, index) => (
        <img
          className={`3d-img ${index === currentImage ? "visible" : ""}`}
          id={index === 0 && "3d-image"}
          key={index}
          src={imagePath + image}
        />
      ))}
    </div>
  );
}

Scrolling3DViewerComponent.propTypes = {
  imagePath: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  scrollPosition: PropTypes.number.isRequired,
  scrollSpacePerFrame: PropTypes.number.isRequired,
};

Scrolling3DViewerComponent.defaultProps = {
  scrollSpacePerFrame: 1
};
