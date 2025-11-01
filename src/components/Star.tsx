import React from 'react';
import { Animated, ViewStyle } from 'react-native';
import useFadeIn from '../hooks/useFadeIn';

interface StarProps {
  style?: ViewStyle;
}

function Star({ style = {} }: StarProps) {
  const animatedOpacity = useFadeIn(200);
  return (
    <Animated.View
      style={[style, { opacity: animatedOpacity }]}
    />
  );
}

export default Star;

