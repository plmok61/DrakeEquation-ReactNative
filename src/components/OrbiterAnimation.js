import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import { PropTypes } from 'prop-types';
import { lightBlue } from '../styles';

class OrbiterAnimation extends Component {
  constructor(props) {
    super(props);
    this.animatedOrbit = new Animated.Value(0);
    this.interpolateScale = this.animatedOrbit.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.5, 1],
    });

    const snapshot = 50;
    const { radius } = this.props;

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

  orbit() {
    this.animatedOrbit.setValue(0);
    Animated.parallel([
      Animated.timing(
        this.animatedOrbit,
        {
          toValue: 1,
          duration: this.props.duration,
          easing: Easing.linear,
          useNativeDriver: true,
        },
      ),
      Animated.timing(
        this.animatedOrbit,
        {
          toValue: 1,
          duration: this.props.duration,
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
          height: this.props.size,
          width: this.props.size,
          backgroundColor: this.props.color,
          borderRadius: this.props.size / 2,
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
  size: PropTypes.number,
  duration: PropTypes.number,
  radius: PropTypes.number,
  color: PropTypes.string,
  orbitCallback: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
};

OrbiterAnimation.defaultProps = {
  size: 30,
  duration: 1000,
  radius: 100,
  color: lightBlue,
  orbitCallback: false,
};

export default OrbiterAnimation;
