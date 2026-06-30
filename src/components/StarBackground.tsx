import React, { useEffect, useState, memo } from 'react';
import { useWindowDimensions, ViewStyle } from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Star from './Star';
import { lightBlue } from '../styles';
import { getRandomInt } from '../utils';

interface StarBackgroundProps {
  scrollY: SharedValue<number>;
  scrollDistance: number;
}

interface StarStyle {
  id: number;
  style: ViewStyle;
}

function StarBackground({ scrollY, scrollDistance }: StarBackgroundProps) {
  const { height, width } = useWindowDimensions();
  const [stars, setStars] = useState<StarStyle[]>([]);

  useEffect(() => {
    if (!stars.length) {
      const s: StarStyle[] = [];
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

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, scrollDistance], [0, 1], Extrapolation.CLAMP),
  }));

  return (
    <Animated.View
      style={[
        {
          height,
          width,
          position: 'absolute',
        },
        animatedStyle,
      ]}
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

const StarBackgroundMemo = memo(StarBackground);

export default StarBackgroundMemo;
