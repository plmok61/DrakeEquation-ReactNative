import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Animated, View } from 'react-native';
import TextSecondary from './TextSecondary';
import Orbiter from './Orbiter';
import { height, resultHeight } from '../styles';

const styles = StyleSheet.create({
  resultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    position: 'relative',
    // height: resultHeight,
  },
  civText: {
    fontSize: 25,
  },
  resultOrbiter: {
    position: 'absolute',
    top: 100,
  },
  totalText: {
    fontSize: 40,
    marginVertical: 20,
  },
});

export const startHeight = resultHeight;

function Result({ animatedScrollY }) {
  const numCivs = useSelector((state) => state.equationState.numCivs);
  const orbiters = useSelector((state) => state.equationState.orbiters);

  const animationHeight = animatedScrollY.interpolate({
    inputRange: [0, height - startHeight],
    outputRange: [height - 200, startHeight],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.resultContainer,
        { height: animationHeight },
      ]}
    >
      <TextSecondary style={styles.civText}>
        Civilizations in our galaxy:
      </TextSecondary>
      {
          orbiters.map((id) => (
            <Orbiter
              key={id}
              customStyle={styles.resultOrbiter}
              randomStart
            />
          ))
        }
      <TextSecondary style={styles.totalText}>
        {numCivs}
      </TextSecondary>
    </Animated.View>
  );
}

export default Result;
