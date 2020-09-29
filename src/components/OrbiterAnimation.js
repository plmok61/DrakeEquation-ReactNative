import React, { memo, useRef, useEffect } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';
import { number, string, func, bool, oneOfType } from 'prop-types';
import { lightBlue } from '../styles';

const { width } = Dimensions.get('window');

function getRandomInt(mini, maxi) {
  const min = Math.ceil(mini);
  const max = Math.floor(maxi);
  return Math.floor(Math.random() * (max - min)) + min;
}

const useOrbit = ({ radius, duration, orbitCallback }) => {
  const animatedOrbit = useRef(new Animated.Value(0)).current;
  const interpolateScale = animatedOrbit.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.5, 1],
  });

  const r = radius || getRandomInt(1, width / 2);
  const d = duration || 5000 + (r * 50);
  const frames = 50;

  // / translateX
  const inputRangeX = [];
  const outputRangeX = [];
  for (let i = 0; i <= frames; i += 1) {
    const value = i / frames;
    const move = Math.sin(value * Math.PI * 2) * r;
    inputRangeX.push(value);
    outputRangeX.push(move);
  }
  const translateX = animatedOrbit.interpolate({
    inputRange: inputRangeX,
    outputRange: outputRangeX,
  });

  // / translateY
  const inputRangeY = [];
  const outputRangeY = [];
  for (let i = 0; i <= frames; i += 1) {
    const value = i / frames;
    const move = -Math.cos(value * Math.PI * 2) * (r * 0.5);
    inputRangeY.push(value);
    outputRangeY.push(move);
  }

  const translateY = animatedOrbit.interpolate({
    inputRange: inputRangeY,
    outputRange: outputRangeY,
  });

  const orbit = () => {
    animatedOrbit.setValue(0);
    Animated.parallel([
      Animated.timing(
        animatedOrbit,
        {
          toValue: 1,
          duration: d,
          easing: Easing.linear,
          useNativeDriver: true,
        },
      ),
      Animated.timing(
        animatedOrbit,
        {
          toValue: 1,
          duration: d,
          easing: Easing.linear,
          useNativeDriver: true,
        },
      ),
    ]).start(() => {
      orbit();
      if (orbitCallback) {
        orbitCallback();
      }
    });
  }

  useEffect(() => {
    orbit();
  }, []);

  return [interpolateScale, translateY, translateX];
}

function Orbiter({
  size,
  radius,
  duration,
  orbitCallback,
  customStyle,
  color,
  index,
}) {
  console.log('index', index)
  const [interpolateScale, translateY, translateX] = useOrbit({ radius, duration, orbitCallback });
  const diameter = size || getRandomInt(1, 10);
  return (
    <Animated.View
      style={{
        ...customStyle,
        height: diameter,
        width: diameter,
        backgroundColor: color,
        borderRadius: diameter / 2,
        transform: [
          { scale: interpolateScale },
          { translateY: translateY },
          { translateX: translateX },
        ],
      }}
    />
  )
}

Orbiter.propTypes = {
  size: number,
  duration: number,
  radius: number,
  color: string,
  index: number,
  orbitCallback: oneOfType([func, bool]),
};

Orbiter.defaultProps = {
  size: 0,
  duration: 0,
  radius: 0,
  color: lightBlue,
  orbitCallback: false,
  index: 0,
};

const isEqual = (prevProps, nextProps) => nextProps.index === prevProps.index;

const OrbiterMemo = memo(Orbiter, isEqual)

export default OrbiterMemo;
