import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Animated, Dimensions, Easing } from 'react-native';
import { bool, func } from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import OrbiterAnimation from './OrbiterAnimation';
import { black } from '../styles';

const { height, width } = Dimensions.get('window');

const useTopAnimation = ({ loading, animationComplete, orbitCount }) => {
  const animatedValueTop = useRef(new Animated.Value(0)).current;

  const topAnimation = () => {
    Animated.timing(
      animatedValueTop,
      {
        toValue: height,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      },
    ).start(animationComplete);
  }
  
  useEffect(() => {
    if (!loading && orbitCount >=2) {
      topAnimation();
    }
  }, [loading, orbitCount]);

  return animatedValueTop;
}

function LoadingScreen({ loading, animationComplete }) {
  const [orbitCount, setOrbitCount] = useState(0)

  const animatedValueTop = useTopAnimation({
    loading,
    animationComplete,
    orbitCount,
  });

  const countOrbits = () => {
      setOrbitCount((prev) => prev + 1)
  };

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
  loading: bool.isRequired,
  animationComplete: func.isRequired,
};

export default LoadingScreen;
