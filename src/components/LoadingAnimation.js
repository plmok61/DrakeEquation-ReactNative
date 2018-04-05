import React, { Component } from 'react';
import { View, Animated, Dimensions, Easing } from 'react-native';
import { PropTypes } from 'prop-types';
import { LinearGradient } from 'expo';
import { lightBlue, black } from '../styles';

const { height, width } = Dimensions.get('window');

class LoadingAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orbitCount: 0,
    };
    this.animatedOrbit = new Animated.Value(0);
    this.interpolateScale = this.animatedOrbit.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.5, 1],
    });

    this.animated = new Animated.Value(0);
    const snapshot = 50;
    const radius = 100;
    // / translateX
    const inputRangeX = [];
    const outputRangeX = [];
    for (let i = 0; i <= snapshot; i += 1) {
      const value = i / snapshot;
      const move = Math.sin(value * Math.PI * 2) * radius;
      inputRangeX.push(value);
      outputRangeX.push(move);
    }
    this.translateX = this.animated.interpolate({
      inputRange: inputRangeX,
      outputRange: outputRangeX,
    });

    // / translateY
    const inputRangeY = [];
    const outputRangeY = [];
    for (let i = 0; i <= snapshot; i += 1) {
      const value = i / snapshot;
      const move = -Math.cos(value * Math.PI * 2) * (radius * 0.5);
      inputRangeY.push(value);
      outputRangeY.push(move);
    }
    this.translateY = this.animated.interpolate({
      inputRange: inputRangeY,
      outputRange: outputRangeY,
    });

    this.animatedValueTop = new Animated.Value(0);
  }

  componentDidMount() {
    this.orbit();
  }

  componentDidUpdate() {
    // loop orbit animation twice before starting topAnimation
    if (!this.props.animating && this.state.orbitCount >= 2) {
      this.topAnimation();
    }
  }

  orbit() {
    this.animatedOrbit.setValue(0);
    this.animated.setValue(0);
    Animated.parallel([
      Animated.timing(
        this.animatedOrbit,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
        },
      ),
      Animated.timing(
        this.animated,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
        },
      ),
    ]).start(() => {
      this.orbit();
      // check the viewRef to make sure we don't call setState
      // on an unmounted component
      if (this.viewRef) {
        this.setState({ orbitCount: this.state.orbitCount + 1 });
      }
    });
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
            <Animated.View
              style={{
                height: 30,
                width: 30,
                backgroundColor: lightBlue,
                borderRadius: 15,
                transform: [
                  { scale: this.interpolateScale },
                  { translateY: this.translateY },
                  { translateX: this.translateX },
                ],
              }}
            />
          </LinearGradient>
        </Animated.View>
      </View>
    );
  }
}

LoadingAnimation.propTypes = {
  animating: PropTypes.bool.isRequired,
  animationComplete: PropTypes.func.isRequired,
};

export default LoadingAnimation;
