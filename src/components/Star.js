import React from 'react';
import { Animated, ViewPropTypes } from 'react-native';
import useFadeIn from '../hooks/useFadeIn';

function Star({ style }) {
  const animatedOpacity = useFadeIn(200);
  return (
    <Animated.View
      style={[style, { opacity: animatedOpacity }]}
    />
  );
}

Star.propTypes = {
  style: ViewPropTypes.style,
};

Star.defaultProps = {
  style: {},
};

export default Star;
