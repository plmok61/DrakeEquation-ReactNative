import React, { useEffect, useState, memo } from 'react';
import { Animated, useWindowDimensions } from 'react-native';
import { instanceOf, number } from 'prop-types';
import Star from './Star';
import { lightBlue } from '../styles';
import { getRandomInt } from '../utils';

function StarBackground({ animatedScrollY, scrollDistance }) {
  const { height, width } = useWindowDimensions();
  const [stars, setStars] = useState([]);

  useEffect(() => {
    if (!stars.length) {
      const s = [];
      for (let i = 0; i <= 100; i += 1) {
        const size = getRandomInt(1, 5);
        const radius = size / 2;
        s.push({
          id: i,
          style: {
            height: size,
            width: size,
            borderRadius: radius,
            backgroundColor: lightBlue,
            position: 'absolute',
            top: getRandomInt(0, height),
            left: getRandomInt(0, width),
            shadowColor: lightBlue,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 5,
          },
        });
      }

      setStars(s);
    }
  }, [stars.length, height, width]);

  const animatedOpacity = animatedScrollY.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{
        height,
        width,
        position: 'absolute',
        opacity: animatedOpacity,
      }}
    >
      {stars.map((star) => (
        <Star
          style={star.style}
          key={star.id}
        />
      ))}
    </Animated.View>
  );
}

StarBackground.propTypes = {
  animatedScrollY: instanceOf(Animated.Value).isRequired,
  scrollDistance: number.isRequired,
};

const StarBackgroundMemo = memo(StarBackground);

export default StarBackgroundMemo;
