import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import Scrolling3DViewerComponent from "../components/3dViewerComponent";

const images = _.range(48).map((index) => (index <= 8 ? `000${index + 1}.png` : `00${index + 1}.png`));

export default function PhoneAdvertisement({ testing }) {
    console.log(images);
    return <Scrolling3DViewerComponent imagePath="/images/doughnuts/" images={images} scrollSpacePerFrame={1000}/>;
}

PhoneAdvertisement.propTypes = {
  testing: PropTypes.string.isRequired
};
