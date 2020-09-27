import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Animated, Dimensions, Easing } from 'react-native';
import { bool, func } from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import OrbiterAnimation from './OrbiterAnimation';
import { black } from '../styles';

const { height, width } = Dimensions.get('window');

const useTopAnimation = ({ animating, animationComplete, orbitCount }) => {
  const animatedValueTop = useRef(new Animated.Value(0)).current;

  const topAnimation = () => {
    Animated.timing(
      animatedValueTop,
      {
        toValue: height,
        duration: 2000,
        easing: Easing.linear,
      },
    ).start(animationComplete);
  }
  
  useEffect(() => {
    if (!animating && orbitCount >= 2) {
      topAnimation();
    }
  }, [animating, orbitCount]);

  return animatedValueTop;
}

function LoadingScreen({ animating, animationComplete }) {
  const [orbitCount, setOrbitCount] = useState(0)
  const animationRef = useRef(null);

  const animatedValueTop = useTopAnimation({
    animating,
    animationComplete,
    orbitCount,
  });

  const countOrbits = useCallback(() => {
    // check the animationRef to make sure we don't call setState
    // on an unmounted component
    if (animationRef.current) {
      setOrbitCount(orbitCount + 1)
    }
  }, [orbitCount]);

  return (
    <View style={{ backgroundColor: black, flex: 1 }}>
      <Animated.View
        style={{
          position: 'absolute',
          top: animatedValueTop,
        }}
      >
        <LinearGradient
          colors={['#222', '#483d8b']}
          style={{
            height,
            width,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <OrbiterAnimation
            ref={animationRef}
            orbitCallback={countOrbits}
            radius={100}
            size={30}
            duration={1000}
          />
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

LoadingScreen.propTypes = {
  animating: bool.isRequired,
  animationComplete: func.isRequired,
};

export default LoadingScreen;
