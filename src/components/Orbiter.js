import React, {
  memo, useRef, useEffect, useCallback,
} from 'react';
import {
  Animated, Easing, Dimensions, ViewPropTypes,
} from 'react-native';
import {
  number, string, func, bool, oneOfType, object,
} from 'prop-types';
import { lightBlue } from '../styles';
import { getRandomInt, getRandomColor } from '../utils';

const { width } = Dimensions.get('window');

const useOrbit = ({
  radius, duration, orbitCallback, startPoint,
}) => {
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
    // const y = -Math.cos(value * Math.PI * 2) * (r * 0.5);
    // const scale = 0.25 * (Math.cos(value * Math.PI * 2)) + 0.75;
    const y = -Math.cos(value * Math.PI * 2) * (r);
    const scale = 1;
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

  const orbit = useCallback(() => {
    animatedOrbit.setValue(0);
    Animated.timing(
      animatedOrbit,
      {
        toValue: 1,
        duration: d,
        easing: Easing.linear,
        useNativeDriver: true,
      },
    ).start((e) => {
      if (e.finished) { // must make this check to prevent memory leak - not documented in RN docs
        orbit();
        if (orbitCallback) {
          orbitCallback();
        }
      }
    });
  }, [animatedOrbit, d, orbitCallback]);

  useEffect(() => {
    orbit();
  }, [orbit]);

  return [scale, translateY, translateX];
};

function Orbiter({
  size,
  radius,
  duration,
  orbitCallback,
  customStyle,
  color,
  randomStart,
  scaleY,
}) {
  const startPoint = randomStart ? Math.random() : 0;
  const [scale, translateY, translateX] = useOrbit({
    radius, duration, orbitCallback, startPoint,
  });
  const diameter = size || getRandomInt(1, 10);
  const backgroundColor = color.length ? color : getRandomColor();

  return (
    <Animated.View
      style={{
        transform: [
          { scale },
          { translateY },
          { translateX },
        ],
      }}
    >
      <Animated.View
        style={[{
          height: diameter,
          width: diameter,
          borderRadius: diameter / 2,
          backgroundColor,
          shadowColor: lightBlue,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 5,
          elevation: 1,
          transform: [{ scaleY }],
        }, customStyle]}
      />
    </Animated.View>
  );
}

Orbiter.propTypes = {
  size: number,
  duration: number,
  radius: number,
  color: string,
  orbitCallback: oneOfType([func, bool]),
  randomStart: bool,
  customStyle: ViewPropTypes.style,
  scaleY: oneOfType([number, object]),
};

Orbiter.defaultProps = {
  size: 0,
  duration: 0,
  radius: 0,
  color: '',
  orbitCallback: false,
  randomStart: false,
  customStyle: {},
  scaleY: 1,
};

// the size prop will never change so this component should never re-render
const isEqual = (prevProps, nextProps) => nextProps.size === prevProps.size;

const OrbiterMemo = memo(Orbiter, isEqual);

export default OrbiterMemo;
