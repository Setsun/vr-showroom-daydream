import 'aframe-animation-component';
import 'aframe-layout-component';

import React from 'react';
import PropTypes from 'prop-types';

class CategoriesCarousel extends React.Component {
  static propTypes = {
    products: PropTypes.array,
  }

  constructor(props) {
    super(props);

    this.state = {
      willExit: false,
      rotationDegrees: 0
    }
  }

  handleClose() {
    this.setState({willExit: true});

    setTimeout(() => {
      this.props.onProductClick(false);
    }, 1500);
  }

  rotateLeft() {
    const currentDegrees = this.state.rotationDegrees || 0;

    this.setState({rotationDegrees: currentDegrees - 60});
  }

  rotateRight() {
    const currentDegrees = this.state.rotationDegrees || 0;

    this.setState({rotationDegrees: currentDegrees + 60});
  }

  rotateAnimation() {
    const {rotationDegrees} = this.state;

    return (
      <a-animation
        key={Date.now()}
        attribute="rotation"
        easing="linear"
        dur="500"
        to={`0 0 ${rotationDegrees}`}
      />
    );
  }

  exitAnimation() {
    if (!this.state.willExit) {
      return null;
    }

    return `
      property: scale;
      dur: 1500;
      easing: easeOutSine;
      to: 0 0 0;
    `;
  }

  renderLabel() {
    return (
      <a-entity position="0 1.75 -0.6" rotation="90 0 0">
        <a-circle
          position="0.125 0 0"
          radius="0.125"
        />
        <a-plane
          position="0 0 0"
          height="0.25"
          width="0.25"
        />
        <a-circle
          position="-0.125 0 0"
          radius="0.125"
        />
        <a-text font="exo2semibold" position="-0.185 0.02 0" scale="0.52 0.52 0.52" value="Tables" color="#999999"/>
      </a-entity>
    );
  }

  renderRing() {
    return (
      <a-cylinder
        rotation="90 0 0"
        height="2.5"
        material="side: double; transparent:true; opacity: 0.5;"
        open-ended="true"
        color="gray"
        radius="5"
      />
    );
  }

  renderButtons() {
    return (
      <a-entity position="0 1.75 -0.3" rotation="90 0 0">
        <a-image
          src="#icon-left-circle"
          position="-0.75 0 0"
          height="0.2"
          width="0.2"
          onClick={() => this.rotateLeft()}
        />
        <a-image
          src="#icon-close-circle"
          position="0 0 0"
          height="0.2"
          width="0.2"
          onClick={() => this.handleClose()}
        />
        <a-image
          src="#icon-right-circle"
          position="0.75 0 0"
          height="0.2"
          width="0.2"
          onClick={() => this.rotateRight()}
        />
      </a-entity>
    );
  }

  renderProducts() {
    return (
      <a-entity layout="type: circle; margin: 6; radius: 3.25">
        <a-entity obj-model="obj: #jet-table-brown-obj; mtl: #jet-table-brown-mtl;" rotation="90 0 0" scale="0.25 0.25 0.25" position='0 0 10' />
        <a-entity obj-model="obj: #jet-table-purple-obj; mtl: #jet-table-purple-mtl;" rotation="90 0 0" scale="0.25 0.25 0.25" position='-1 0 0' />
        <a-entity obj-model="obj: #jet-table-red-obj; mtl: #jet-table-red-mtl;" rotation="90 0 0" scale="0.25 0.25 0.25" position='0 0 -1' />
        <a-gltf-model src="#wooden-table" rotation="90 0 0" scale="0.25 0.25 0.25"></a-gltf-model>
        <a-entity obj-model="obj: #jet-table-yellow-obj; mtl: #jet-table-yellow-mtl;" rotation="90 0 0" scale="0.25 0.25 0.25" position='0 0 -1' />
        <a-gltf-model src="#table-2" rotation="90 0 0" scale="0.25 0.25 0.25"></a-gltf-model>
        <a-entity obj-model="obj: #jet-table-brown-obj; mtl: #jet-table-brown-mtl;" rotation="90 0 0" scale="0.25 0.25 0.25" position='0 0 10' />
        <a-entity obj-model="obj: #jet-table-purple-obj; mtl: #jet-table-purple-mtl;" rotation="90 0 0" scale="0.25 0.25 0.25" position='-1 0 0' />
      </a-entity>

    );
  }

  render() {
    return (
      <a-entity
        position="0 1.5 0"
        rotation="-90 0 0"
        scale="0 0 0"
        animation={`
          property: scale;
          dur: 2000;
          to: 1 1 1
        `}
        animation__exit={this.exitAnimation()}>
        <a-entity>
          {this.rotateAnimation()}
          {this.renderRing()}
          <a-entity position="0 0 -0.25">
            {this.renderProducts()}
          </a-entity>
        </a-entity>
        {this.renderLabel()}
        {this.renderButtons()}
      </a-entity>
    );
  }
}

export default CategoriesCarousel;
