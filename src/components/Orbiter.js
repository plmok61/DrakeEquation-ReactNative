import React, { memo, useRef, useEffect } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';
import { number, string, func, bool, oneOfType } from 'prop-types';
import { lightBlue, teal, red, purple } from '../styles';

const { width } = Dimensions.get('window');

const colors = [lightBlue, teal, red, purple];

function getRandomInt(mini, maxi, seed = Math.random()) {
  const min = Math.ceil(mini);
  const max = Math.floor(maxi);
  return Math.floor(seed * (max - min + 1)) + min;
}

function getRandomColor() {
  const index = getRandomInt(0, 3);
  return colors[index];
}

const useOrbit = ({ radius, duration, orbitCallback, startPoint }) => {
  const animatedOrbit = useRef(new Animated.Value(0)).current;

  const r = radius || getRandomInt(1, width / 2);
  const d = duration || 5000 + (r * 50);
  const frames = 50;

  const inputRange = [];
  let outputRangeX = [];
  let outputRangeY = [];
  let outputRangeScale = [];

  for (let i = 0; i < frames; i += 1) {
    const value = i / frames;
    const x = Math.sin(value * Math.PI * 2) * r;
    const y = -Math.cos(value * Math.PI * 2) * (r * 0.5);
    const scale = 0.25 * (Math.cos(value * Math.PI * 2)) + 0.75;
    inputRange.push(value);
    outputRangeX.push(x);
    outputRangeY.push(y);
    outputRangeScale.push(scale);
  }

  // start at random point in orbit
  if (startPoint > 0) {
    const startIndex = getRandomInt(0, frames, startPoint);
    outputRangeX = [...outputRangeX.slice(startIndex), ...outputRangeX.slice(0, startIndex)];  
    outputRangeY = [...outputRangeY.slice(startIndex), ...outputRangeY.slice(0, startIndex)];
    outputRangeScale = [...outputRangeScale.slice(startIndex), ...outputRangeScale.slice(0, startIndex)];  
  }

  const translateX = animatedOrbit.interpolate({
    inputRange,
    outputRange: outputRangeX,
  });

  const translateY = animatedOrbit.interpolate({
    inputRange,
    outputRange: outputRangeY,
  });

  const scale = animatedOrbit.interpolate({
    inputRange,
    outputRange: outputRangeScale,
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
    ]).start((e) => {
      if (e.finished) { // must make this check to prevent memory leak - not documented in RN docs
        orbit();
        if (orbitCallback) {
          orbitCallback();
        }
      }
    });
  }

  useEffect(() => {
    orbit();
  }, []);

  return [scale, translateY, translateX];
}

function Orbiter({
  size,
  radius,
  duration,
  orbitCallback,
  customStyle,
  color,
  randomStart,
  index,
}) {
  const startPoint = randomStart ? Math.random() : 0;
  const [scale, translateY, translateX] = useOrbit({ radius, duration, orbitCallback, startPoint });
  const diameter = size || getRandomInt(1, 10);
  const backgroundColor = color.length ? color : getRandomColor();
  return (
    <Animated.View
      style={{
        ...customStyle,
        height: diameter,
        width: diameter,
        borderRadius: diameter / 2,
        backgroundColor: backgroundColor,
        shadowColor: lightBlue,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 1,
        transform: [
          { scale },
          { translateY },
          { translateX },
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
  randomStart: bool,
};

Orbiter.defaultProps = {
  size: 0,
  duration: 0,
  radius: 0,
  color: '',
  orbitCallback: false,
  index: 0,
  randomStart: false,
};

const isEqual = (prevProps, nextProps) => nextProps.index === prevProps.index;

const OrbiterMemo = memo(Orbiter, isEqual)

export default OrbiterMemo;
