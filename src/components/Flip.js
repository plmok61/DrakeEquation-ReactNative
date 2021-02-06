import React, { useRef, useEffect } from 'react';
import { bool, node, number } from 'prop-types';
import {
  View, Animated, Easing, ViewPropTypes,
} from 'react-native';

const useFlip = ({
  isFlipped, scale, scaleDuration, rotateDuration,
}) => {
  const animatedScale = useRef(new Animated.Value(0)).current;
  const animatedView = useRef(new Animated.Value(0)).current;

  const frontInterpolate = animatedView.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = animatedView.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });
  const scaleInterpolate = animatedScale.interpolate({
    inputRange: [0, 1],
    outputRange: [1, scale],
  });

  useEffect(() => {
    const flip = () => {
      const toValue = isFlipped ? 1 : 0;
      Animated.sequence([
        Animated.timing(
          animatedScale,
          {
            toValue: 1,
            duration: scaleDuration,
            easing: Easing.linear,
            useNativeDriver: true,
          },
        ),
        Animated.timing(
          animatedView,
          {
            toValue,
            duration: rotateDuration,
            easing: Easing.linear,
            useNativeDriver: true,
          },
        ),
        Animated.timing(
          animatedScale,
          {
            toValue: 0,
            duration: scaleDuration,
            easing: Easing.linear,
            useNativeDriver: true,
          },
        ),
      ]).start();
    };
    flip();
  }, [animatedScale, animatedView, isFlipped, rotateDuration, scaleDuration]);

  return [frontInterpolate, backInterpolate, scaleInterpolate];
};

function Flip({
  isFlipped,
  frontView,
  backView,
  scale,
  frontPerspective,
  backPerspective,
  scaleDuration,
  rotateDuration,
  containerStyles,
  frontStyles,
  backStyles,
}) {
  const [frontInterpolate, backInterpolate, scaleInterpolate] = useFlip({
    isFlipped, scale, scaleDuration, rotateDuration,
  });
  const frontAnimatedStyle = { rotateY: frontInterpolate };
  const backAnimatedStyle = { rotateY: backInterpolate };
  const scaleAnimatedStyle = { scale: scaleInterpolate };
  return (
    <View style={containerStyles}>
      <Animated.View
        style={[
          {
            backfaceVisibility: 'hidden',
            transform: [
              { perspective: frontPerspective },
              frontAnimatedStyle,
              scaleAnimatedStyle,
            ],
          },
          frontStyles,
        ]}
        pointerEvents={isFlipped ? 'none' : 'auto'}
      >
        {frontView}
      </Animated.View>
      <Animated.View
        style={[
          {
            backfaceVisibility: 'hidden',
            position: 'absolute',
            transform: [
              { perspective: backPerspective },
              backAnimatedStyle,
              scaleAnimatedStyle,
            ],
          },
          backStyles,
        ]}
        pointerEvents={isFlipped ? 'auto' : 'none'}
      >
        {backView}
      </Animated.View>
    </View>
  );
}

Flip.propTypes = {
  isFlipped: bool.isRequired,
  frontView: node.isRequired,
  backView: node.isRequired,
  scale: number,
  frontPerspective: number,
  backPerspective: number,
  scaleDuration: number,
  rotateDuration: number,
  containerStyles: ViewPropTypes.style,
  frontStyles: ViewPropTypes.style,
  backStyles: ViewPropTypes.style,
};

Flip.defaultProps = {
  scale: 0.8,
  frontPerspective: 1000,
  backPerspective: 1000,
  scaleDuration: 100,
  rotateDuration: 300,
  containerStyles: null,
  frontStyles: null,
  backStyles: null,
};

export default Flip;
