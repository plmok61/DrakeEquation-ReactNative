import React, { Component } from 'react';
import { View, Animated, Dimensions, Easing } from 'react-native';
import { bool, func, number } from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import OrbiterAnimation from './OrbiterAnimation';
import { black } from '../styles';

const { height, width } = Dimensions.get('window');

class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orbitCount: 0,
    };
    this.countOrbits = this.countOrbits.bind(this);
    this.animatedValueTop = new Animated.Value(0);
  }

  componentDidUpdate() {
    // loop orbit animation twice before starting topAnimation
    if (!this.props.animating && this.state.orbitCount >= 2) {
      this.topAnimation();
    }
  }

  topAnimation() {
    Animated.timing(
      this.animatedValueTop,
      {
        toValue: height,
        duration: 2000,
        easing: Easing.linear,
      },
    ).start(this.props.animationComplete);
  }

  countOrbits() {
    // check the animationRef to make sure we don't call setState
    // on an unmounted component
    if (this.animationRef) {
      this.setState({ orbitCount: this.state.orbitCount + 1 });
    }
  }

  render() {
    return (
      <View ref={(view) => { this.viewRef = view; }} style={{ backgroundColor: black, flex: 1 }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: this.animatedValueTop,
          }}
        >
          <LinearGradient
            colors={['#222', '#483d8b']}
            style={{
              height,
              width,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <OrbiterAnimation
              ref={(component) => { this.animationRef = component; }}
              orbitCallback={this.countOrbits}
              radius={100}
              size={30}
              duration={1000}
            />
          </LinearGradient>
        </Animated.View>
      </View>
    );
  }
}

LoadingScreen.propTypes = {
  animating: bool.isRequired,
  animationComplete: func.isRequired,
};

export default LoadingScreen;
