import React from 'react';
import _ from 'underscore';
import {Scrolling3DViewerComponent} from "../components/3dViewerComponent";
import useScrollYPosition from "../helpers/hooks/scrollPosition";

const sources = _.range(48).map((index) => (
  `/images/doughnuts/${index <= 8 ? `000${index + 1}.png` : `00${index + 1}.png`}`)
);

const imageData = {
  sources: sources,
  dimensions: {
    width: 1080,
    height: 1080
  }
}

export default function PhoneAdvertisement() {
  const scrollYPosition = useScrollYPosition();

  return <Scrolling3DViewerComponent
    id='doughnut'
    imageConfig={imageData}
    scrollConfig={{pixelsPerFrame: 10}}
    scrollYPosition={scrollYPosition}
  />;
}
