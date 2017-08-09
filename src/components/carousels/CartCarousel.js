import 'aframe-animation-component';
import 'aframe-layout-component';
import 'aframe-svgfile-component';

import React from 'react';
import PropTypes from 'prop-types';
import {Entity} from 'aframe-react';

class CartCarousel extends React.Component {
  static propTypes = {
    products: PropTypes.array,
  }

  render() {
    return (
      <Entity position="0 0 0" rotation="-90 0 0">
        <a-ring color="gray" radius-inner="2.5" radius-outer="4" />
        <a-entity layout="type: circle; margin: 6; radius: 3.25">
          <a-entity obj-model="obj: #tree-obj; mtl: #tree-mtl" rotation="90 0 0" scale="0.5 0.5 0.5"/>
          <a-entity obj-model="obj: #tree-obj; mtl: #tree-mtl" rotation="90 0 0" scale="0.5 0.5 0.5"/>
          <a-entity obj-model="obj: #tree-obj; mtl: #tree-mtl" rotation="90 0 0" scale="0.5 0.5 0.5"/>
          <a-entity obj-model="obj: #tree-obj; mtl: #tree-mtl" rotation="90 0 0" scale="0.5 0.5 0.5"/>
          <a-entity obj-model="obj: #tree-obj; mtl: #tree-mtl" rotation="90 0 0" scale="0.5 0.5 0.5"/>
          <a-entity obj-model="obj: #tree-obj; mtl: #tree-mtl" rotation="90 0 0" scale="0.5 0.5 0.5"/>
          <a-entity obj-model="obj: #tree-obj; mtl: #tree-mtl" rotation="90 0 0" scale="0.5 0.5 0.5"/>
          <a-entity obj-model="obj: #tree-obj; mtl: #tree-mtl" rotation="90 0 0" scale="0.5 0.5 0.5"/>
          <a-entity obj-model="obj: #tree-obj; mtl: #tree-mtl" rotation="90 0 0" scale="0.5 0.5 0.5"/>
          <a-entity obj-model="obj: #tree-obj; mtl: #tree-mtl" rotation="90 0 0" scale="0.5 0.5 0.5"/>
        </a-entity>
      </Entity>
    );
  }
}

export default CartCarousel;
