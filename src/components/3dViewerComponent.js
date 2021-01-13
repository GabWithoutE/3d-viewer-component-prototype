import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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


// TODO: Make the image float on the page, and change the image depending on the scroll position
function Scrolling3DViewerComponent({imageConfig, scrollConfig}) {
  const [viewerStyle] = useState({
    height: `${(imageConfig.fileNames.length * scrollConfig.pixelsPerFrame) + imageConfig.dimensions.height}px`,
    width: `${imageConfig.dimensions.width}px`,
    margin: '0 auto',
  });

  const [imageStyle] = useState({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  });

  const [currentImage, setCurrentImage] = useState(imageConfig.path + imageConfig.fileNames[0]);

  useEffect(() => {
    let index = Math.floor(scrollConfig.yPosition / scrollConfig.pixelsPerFrame);
    setCurrentImage(imageConfig.path + imageConfig.fileNames[index]);
  }, [scrollConfig.yPosition, scrollConfig.pixelsPerFrame, imageConfig.path, imageConfig.fileNames]);

  return (
    <div className="viewer-3d" style={viewerStyle}>
      <img className="img-3d" style={imageStyle} src={currentImage} />
    </div>
  );
}

Scrolling3DViewerComponent.propTypes = {
  imageConfig: PropTypes.shape({
    path: PropTypes.string.isRequired,
    fileNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    })
  }),
  scrollConfig: PropTypes.shape({
    yPosition: PropTypes.number.isRequired,
    pixelsPerFrame: PropTypes.number.isRequired,
  })
};

export {
  Scrolling3DViewerComponent
};

