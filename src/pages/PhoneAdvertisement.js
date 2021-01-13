import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { Scrolling3DViewerComponent } from "../components/3dViewerComponent";

const images = _.range(48).map((index) => (index <= 8 ? `000${index + 1}.png` : `00${index + 1}.png`));

const imageData = {
  path: '/images/doughnuts/',
  fileNames: images,
  dimensions: {
    width: 1080,
    height: 1080
  }
}

export default function PhoneAdvertisement({ testing }) {
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);

  useEffect(() => {
    const onScroll = (event) => {
      setScrollPosition(window.scrollY);
    }
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <Scrolling3DViewerComponent
    imageConfig={imageData}
    scrollConfig={{yPosition: scrollPosition, pixelsPerFrame: 10}}
  />;
}

PhoneAdvertisement.propTypes = {
  testing: PropTypes.string.isRequired
};
