import React, { useState, useEffect } from 'react';
import useImagePreload from "../helpers/hooks/preloadImages";
import PropTypes from 'prop-types';

const imageStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

/**
 * Scrolling3DViewerComponent:
 * (Functionality):
 *    Imitates the 3d scrolling product viewers on apple.com... see: https://www.apple.com/airpods-max/
 *
 * (How it Works)
 *
 * @param imagePathPrefix
 *    path and prefix of the set of images to scroll through
 * @param scrollSpacePerFrame
 *    amount of scrolling y distance between each frame
 * @returns {*}
 *
 */

function Scrolling3DViewerComponent({id, imageConfig, scrollConfig, scrollYPosition}) {
  const [viewerStyle] = useState({
    height: `${(imageConfig.sources.length * scrollConfig.pixelsPerFrame) + imageConfig.dimensions.height}px`,
    width: `${imageConfig.dimensions.width}px`,
    margin: '0 auto',
  });

  const [domPosition, setDomPosition] = useState(0);

  useEffect(() => {
    setDomPosition(document.getElementById(id).getBoundingClientRect().top);
  }, [id]);
  console.log(domPosition)
  // const loading = useImagePreload(imageConfig.sources);
  useImagePreload(imageConfig.sources);

  const [currentImage, setCurrentImage] = useState(imageConfig.sources[0]);

  useEffect(() => {
    // TODO: make a clamp utility?
    let index = Math.max(Math.min(Math.floor(scrollYPosition / scrollConfig.pixelsPerFrame), imageConfig.sources.length), 0);
    setCurrentImage(imageConfig.sources[index]);
  }, [scrollYPosition, scrollConfig.pixelsPerFrame, imageConfig.sources]);

  return (
    <div className="viewer-3d" style={viewerStyle}>
      <img id={id} className="img-3d" style={imageStyle} src={currentImage} alt="" />
    </div>
  );
}

Scrolling3DViewerComponent.propTypes = {
  id: PropTypes.string.isRequired,
  imageConfig: PropTypes.shape({
    sources: PropTypes.arrayOf(PropTypes.string).isRequired,
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    })
  }),
  scrollConfig: PropTypes.shape({
    pixelsPerFrame: PropTypes.number.isRequired,
  }),
  scrollYPosition: PropTypes.number.isRequired,
};

export {
  Scrolling3DViewerComponent
};
