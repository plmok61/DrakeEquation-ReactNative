import React, { useRef, useEffect } from 'react';
import {
  View, Animated, Easing, useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { resultHeight } from '../styles';

interface UseFlipProps {
  isFlipped: boolean;
}

const useFlip = ({ isFlipped }: UseFlipProps) => {
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
    outputRange: [1, 0.8],
  });

  useEffect(() => {
    const flip = () => {
      const toValue = isFlipped ? 1 : 0;
      Animated.sequence([
        Animated.timing(
          animatedScale,
          {
            toValue: 1,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true,
          },
        ),
        Animated.timing(
          animatedView,
          {
            toValue,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
          },
        ),
        Animated.timing(
          animatedScale,
          {
            toValue: 0,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true,
          },
        ),
      ]).start();
    };
    flip();
  }, [animatedScale, animatedView, isFlipped]);

  return [frontInterpolate, backInterpolate, scaleInterpolate];
};

interface FlipProps {
  isFlipped: boolean;
  frontView: React.ReactNode;
  backView: React.ReactNode;
}

function Flip({ isFlipped, frontView, backView }: FlipProps) {
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [frontInterpolate, backInterpolate, scaleInterpolate] = useFlip({ isFlipped });
  const frontAnimatedStyle = { rotateY: frontInterpolate };
  const backAnimatedStyle = { rotateY: backInterpolate };
  const scaleAnimatedStyle = { scale: scaleInterpolate };

  const flipHeight = height - insets.top - insets.bottom - resultHeight;
  const flipContainer = { height: flipHeight };

  return (
    <View style={flipContainer}>
      <Animated.View
        style={[
          {
            backfaceVisibility: 'hidden',
            transform: [
              { perspective: 1000 },
              frontAnimatedStyle,
              scaleAnimatedStyle,
            ],
          },
          flipContainer,
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
              { perspective: 1000 },
              backAnimatedStyle,
              scaleAnimatedStyle,
            ],
          },
          { ...flipContainer, width },
        ]}
        pointerEvents={isFlipped ? 'auto' : 'none'}
      >
        {backView}
      </Animated.View>
    </View>
  );
}

export default Flip;

