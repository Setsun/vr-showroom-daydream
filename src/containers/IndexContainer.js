import 'aframe-animation-component';

import React from 'react';
import {connect} from 'react-redux';

import ProductTile from '../components/product/ProductTile';
import CartCarousel from '../components/carousels/CartCarousel';
import CategoriesCarousel from '../components/carousels/CategoriesCarousel';
import LoadingScreen from '../components/LoadingScreen';

import {onTextureChange, onProductClick, addToCart, onCategoryClick, closeCart} from '../data/userState';

const tempData = {
  productMap: {
    table1: {
      name: 'Plain Table',
      price: 23.56,
      modelId: '#jet-table-brown-obj',
      textureId: '#jet-table-brown-mtl',
      variants: [
        {
          modelId: '#jet-table-brown-obj',
          textureId: '#jet-table-brown-mtl',
          color: '#8B4513'
        },
        {
          modelId: '#jet-table-purple-obj',
          textureId: '#jet-table-purple-mtl',
          color: '#8200FF'
        },
        {
          modelId: '#jet-table-red-obj',
          textureId: '#jet-table-red-mtl',
          color: '#EF2D5E'
        },
        {
          modelId: '#jet-table-yellow-obj',
          textureId: '#jet-table-yellow-mtl',
          color: '#FCF838'
        }
      ]
    },
    table2: {
      name: 'Office Chair',
      price: 123.54,
      modelId: '#office-chair',
      textureId: null,
      colors: [
        '#4CC3D9',
        '#EF2D5E',
        '#FFC65D',
        '#8200AF',
        '#999999',
        '#FCF838'
      ]
    },
    drawer: {
      name: 'Some Drawer',
      price: 423.45,
      modelId: '#drawer-obj',
      textureId: '#drawer-mtl',
      colors: [
        '#4CC3D9',
        '#EF2D5E',
        '#FFC65D',
        '#8200AF',
        '#999999',
        '#FCF838'
      ]
    }
  }
}

class IndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingScreenOpen: false,
      cartCarouselOpen: false,
      categoriesCarouselOpen: false,
    }
  }

  componentDidMount() {
    // Test redux actions here
    console.log(this.state)
    console.log(this.props.userState);
  }

  provideAssets() {
    return (
      <a-assets>
        <img id="icon-cart-circle" src="assets/images/icon-cart-circle.png"></img>
        <img id="icon-color-circle" src="assets/images/icon-color-circle.png"></img>
        <img id="icon-collapse-circle" src="assets/images/icon-collapse-circle.png"></img>
        <img id="icon-expand-circle" src="assets/images/icon-expand-circle.png"></img>
        <img id="icon-close-circle" src="assets/images/icon-close-circle.png"></img>
        <img id="icon-left-circle" src="assets/images/icon-left-circle.png"></img>
        <img id="icon-right-circle" src="assets/images/icon-right-circle.png"></img>
        <img id="logo-jet-vr" src="assets/images/logo-jet-vr.png"></img>

        <a-asset-item id="jet-table-brown-obj" src="assets/models/jet_table/jet_table_brown.obj"></a-asset-item>
        <a-asset-item id="jet-table-brown-mtl" src="assets/models/jet_table/jet_table_brown.mtl"></a-asset-item>
        <a-asset-item id="jet-table-purple-obj" src="assets/models/jet_table/jet_table_purple.obj"></a-asset-item>
        <a-asset-item id="jet-table-purple-mtl" src="assets/models/jet_table/jet_table_purple.mtl"></a-asset-item>
        <a-asset-item id="jet-table-red-obj" src="assets/models/jet_table/jet_table_red.obj"></a-asset-item>
        <a-asset-item id="jet-table-red-mtl" src="assets/models/jet_table/jet_table_red.mtl"></a-asset-item>
        <a-asset-item id="jet-table-yellow-obj" src="assets/models/jet_table/jet_table_yellow.obj"></a-asset-item>
        <a-asset-item id="jet-table-yellow-mtl" src="assets/models/jet_table/jet_table_yellow.mtl"></a-asset-item>

        <a-asset-item id="drawer-obj" src="assets/models/drawer/drawer.obj"></a-asset-item>
        <a-asset-item id="drawer-mtl" src="assets/models/drawer/drawer.mtl"></a-asset-item>

        <a-asset-item id="wooden-table" src="assets/models/wooden_table/wooden-coffe-table.gltf"></a-asset-item>
        <a-asset-item id="table-2" src="assets/models/table_2/attach-demo-table.gltf"></a-asset-item>
        <a-asset-item id="office-chair" src="assets/models/office_chair/office-chair.gltf"></a-asset-item>
        <a-asset-item id="yellow-chair" src="assets/models/yellow_chair/chair.gltf"></a-asset-item>
      </a-assets>
    );
  }

  renderCamera() {
    return (
      <a-camera>
        <a-entity
          cursor="fuse: false;"
          position="0 0 -1"
          geometry="primitive: ring; radiusInner: 0.015; radiusOuter: 0.025"
          material="color: #8200FF; shader: flat"
        />
        <a-entity daydream-controls="hand: right"></a-entity>
      </a-camera>
    );
  }

  renderLoadingScreen() {
    return this.state.loadingScreenOpen && <LoadingScreen />;
  }

  renderLoadedScene() {
    if (this.state.loadingScreenOpen) {
      return null;
    }

    return (
      <a-entity>
        {this.renderLogo()}
        {this.renderRoom()}
        {this.renderCartCarousel()}
        {this.renderCategoriesCarousel()}
        <a-text scale="2 2 2"value="LOL, why you look back here" font="exo2bold" rotation="0 180 0" position="2.5 2 5.5" color="#000000"/>
      </a-entity>
    );
  }

  renderRoom() {
    const {
      onCategoryClick,
      onTextureChange,
      onAddToCart
    } = this.props;

    return (
      <a-entity
        position="-0.65 -0.25 -8"
        rotation="8 0 0"
        scale="2 2 2">
        <a-plane
          rotation="-90 0 0"
          color="#2b3d47"
          material="transparent: true; opacity: 0.75"
          height="3"
          width="5.5"
        />
        <a-entity
          rotation="0 15 0"
          position="-1.5 -0.0175 0">
          <ProductTile
            waypointPosition="0.125 1.25 0.25"
            onAddToCart={onAddToCart}
            product={tempData.productMap.table2}
          />
        </a-entity>
        <a-entity
          position="0.25 0 0">
          <ProductTile
            waypointPosition="-0.35 1 0.5"
            onVariantChange={onTextureChange}
            onAddToCart={onAddToCart}
            onCategorySelect={()=>onCategoryClick('Table')}
            product={tempData.productMap.table1}
          />
        </a-entity>
        <a-entity
          position="2 0 0"
          rotation="0 -30 0">
          <ProductTile
            waypointPosition="0.125 0.75 0.5"
            onAddToCart={onAddToCart}
            product={tempData.productMap.drawer}
          />
        </a-entity>
      </a-entity>
    );
  }

  renderLogo() {
    return (
      <a-curvedimage
        src="#logo-jet-vr"
        height="1"
        radius="5.7"
        theta-length="36"
        rotation="0 145 0"
        position="2 4.5 -3"
      />
    );
  }

  renderCartCarousel() {
    return this.props.userState.cartCarouselOpen && <CartCarousel products={this.props.userState.cart} onClick={this.props.closeCart}/>;
  }

  renderCategoriesCarousel() {
    const cat = this.props.userState.currentCategory
    const products = this.props.userState.categories[cat].products;

    return this.props.userState.categoriesCarouselOpen && <CategoriesCarousel products={products} onProductClick={this.props.onProductClicked}/>;
  }

  render () {
    return (
      <a-scene>
        <a-sky color="#ECECEC"></a-sky>
        {this.provideAssets()}
        {this.renderCamera()}
        {this.renderLoadingScreen()}
        {this.renderLoadedScene()}
      </a-scene>
    );
  }
}

const mapStateToProps = (state) => {
  return {userState : state.userState};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToCart: (productId) => dispatch(addToCart(productId)),
    onTextureChange: (textureId) => dispatch(onTextureChange(textureId)),
    onProductClicked: (productId) => dispatch(onProductClick(productId)),
    onCategoryClick: (categoryId) => dispatch(onCategoryClick(categoryId)),
    closeCart: () => dispatch(closeCart(false))
    // addToCart: (product) => dispatch(addToCart(product))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexContainer);
