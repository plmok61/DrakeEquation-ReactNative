import React, { useEffect, useRef, useState } from 'react';
import {
  View, Animated, Easing, useWindowDimensions, ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { black, purple, lightBlue } from '../styles';
import { getRandomInt } from '../utils';
import Star from './Star';

interface LoadingScreenProps {
  loading?: boolean;
  animationComplete: () => void;
}

interface StarStyle {
  id: number;
  style: ViewStyle;
}

const useTopAnimation = ({ height, animationComplete }: { height: number; animationComplete: () => void }) => {
  const animatedValueTop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const topAnimation = () => {
      Animated.timing(
        animatedValueTop,
        {
          toValue: height,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
          delay: 2000,
        },
      ).start(animationComplete);
    };

    topAnimation();
  }, [animatedValueTop, height, animationComplete]);

  return animatedValueTop;
};

function LoadingScreen({ animationComplete }: LoadingScreenProps) {
  const { height, width } = useWindowDimensions();
  const [stars, setStars] = useState<StarStyle[]>([]);
  const animatedValueTop = useTopAnimation({
    height,
    animationComplete,
  });

  useEffect(() => {
    if (!height || !width) return;

    let t: NodeJS.Timeout;
    if (stars.length < 200) {
      t = setTimeout(() => {
        const size = getRandomInt(2, 10);
        const radius = size / 2;
        setStars((prev) => {
          const safePrev = prev && Array.isArray(prev) ? prev : [];
          const newStars = [...safePrev];
          newStars.push({
            id: safePrev.length + 1,
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
          return newStars;
        });
      }, 5);
    }
    return () => {
      if (t) {
        clearTimeout(t);
      }
    };
  }, [height, stars, width]);

  return (
    <View style={{ backgroundColor: black, flex: 1 }}>
      <Animated.View style={{ backgroundColor: black, transform: [{ translateY: animatedValueTop }] }}>
        <LinearGradient
          colors={[black, purple]}
          style={{
            height,
            width,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {stars.map((star) => (
            <Star
              style={star.style}
              key={star.id}
            />
          ))}
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

export default LoadingScreen;

