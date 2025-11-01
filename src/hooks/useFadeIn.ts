import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const useFadeIn = (duration: number = 1000): Animated.Value => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = () => {
      Animated.timing(
        animatedOpacity,
        {
          toValue: 1,
          duration,
          useNativeDriver: true,
        },
      ).start();
    };
    fadeIn();
  }, [animatedOpacity, duration]);

  return animatedOpacity;
};

export default useFadeIn;

