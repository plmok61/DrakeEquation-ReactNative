import React, { Component } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';
import { number, string, func, bool, oneOfType } from 'prop-types';
import { lightBlue } from '../styles';

function getRandomInt(mini, maxi) {
  const min = Math.ceil(mini);
  const max = Math.floor(maxi);
  return Math.floor(Math.random() * (max - min)) + min;
}

const { width } = Dimensions.get('window');

class OrbiterAnimation extends Component {
  constructor(props) {
    super(props);
    this.animatedOrbit = new Animated.Value(0);
    this.interpolateScale = this.animatedOrbit.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.5, 1],
    });
    this.size = this.props.size || getRandomInt(1, 10);
    this.radius = this.props.radius || getRandomInt(1, width / 2);
    const { radius } = this;
    this.duration = this.props.duration || 5000 + (radius * 50);
    const snapshot = 50;

    // / translateX
    const inputRangeX = [];
    const outputRangeX = [];
    for (let i = 0; i <= snapshot; i += 1) {
      const value = i / snapshot;
      const move = Math.sin(value * Math.PI * 2) * radius;
      inputRangeX.push(value);
      outputRangeX.push(move);
    }
    this.translateX = this.animatedOrbit.interpolate({
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

    this.translateY = this.animatedOrbit.interpolate({
      inputRange: inputRangeY,
      outputRange: outputRangeY,
    });
  }


  componentDidMount() {
    this.orbit();
  }

  // avoid uneeded rerenders when input slider moves
  shouldComponentUpdate(nextProps) {
    return nextProps.index !== this.props.index;
  }

  orbit() {
    this.animatedOrbit.setValue(0);
    Animated.parallel([
      Animated.timing(
        this.animatedOrbit,
        {
          toValue: 1,
          duration: this.duration,
          easing: Easing.linear,
          useNativeDriver: true,
        },
      ),
      Animated.timing(
        this.animatedOrbit,
        {
          toValue: 1,
          duration: this.duration,
          easing: Easing.linear,
          useNativeDriver: true,
        },
      ),
    ]).start(() => {
      this.orbit();
      if (this.props.orbitCallback) {
        this.props.orbitCallback();
      }
    });
  }

  render() {
    return (
      <Animated.View
        style={{
          ...this.props.customStyle,
          height: this.size,
          width: this.size,
          backgroundColor: this.props.color,
          borderRadius: this.size / 2,
          transform: [
            { scale: this.interpolateScale },
            { translateY: this.translateY },
            { translateX: this.translateX },
          ],
        }}
      />
    );
  }
}

OrbiterAnimation.propTypes = {
  size: number,
  duration: number,
  radius: number,
  color: string,
  index: number,
  orbitCallback: oneOfType([func, bool]),
};

OrbiterAnimation.defaultProps = {
  size: 0,
  duration: 0,
  radius: 0,
  color: lightBlue,
  orbitCallback: false,
  index: 0,
};

export default OrbiterAnimation;
