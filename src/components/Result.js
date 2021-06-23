import React from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet, Animated, View, useWindowDimensions,
} from 'react-native';
import { instanceOf } from 'prop-types';
import TextSecondary from './TextSecondary';
import Orbiter from './Orbiter';
import { resultHeight } from '../styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  resultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  civText: {
    fontSize: 25,
  },
  resultOrbiter: {
    position: 'absolute',
  },
  totalText: {
    fontSize: 40,
    marginVertical: 20,
  },
});

function Result({ animatedScrollY }) {
  const { height } = useWindowDimensions();
  const scrollDistance = (height - resultHeight) < 0 ? 1 : height - resultHeight;

  const numCivs = useSelector((state) => state.equationState.numCivs);
  const orbiters = useSelector((state) => state.equationState.orbiters);

  const animateY = animatedScrollY.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [resultHeight, height],
    extrapolate: 'clamp',
  });

  const animateRotateX = animatedScrollY.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: ['-60deg', '0deg'],
    extrapolate: 'clamp',
  });

  // TODO figure out trigonometry for this
  const animateScaleY = animatedScrollY.interpolate({
    inputRange: [0, (scrollDistance / 2), scrollDistance],
    outputRange: [2, 1.41, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { height: animateY },
      ]}
    >
      <View style={styles.resultContainer}>
        <TextSecondary style={styles.civText}>
          Civilizations in our galaxy:
        </TextSecondary>
        <Animated.View style={{ transform: [{ rotateX: animateRotateX }] }}>
          {orbiters.map((id) => (
            <Orbiter
              key={id}
              customStyle={styles.resultOrbiter}
              randomStart
              animateY={animatedScrollY}
              scaleY={animateScaleY}
            />
          ))}
        </Animated.View>
        <TextSecondary style={styles.totalText}>
          {numCivs}
        </TextSecondary>
      </View>
    </Animated.View>
  );
}

Result.propTypes = {
  animatedScrollY: instanceOf(Animated.Value).isRequired,
};

export default Result;
