import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Animated, View } from 'react-native';
import { instanceOf } from 'prop-types';
import TextSecondary from './TextSecondary';
import Orbiter from './Orbiter';
import { height, resultHeight } from '../styles';

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
  const numCivs = useSelector((state) => state.equationState.numCivs);
  const orbiters = useSelector((state) => state.equationState.orbiters);

  const animationY = animatedScrollY.interpolate({
    inputRange: [0, height - resultHeight],
    outputRange: [resultHeight, height],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { height: animationY },
      ]}
    >
      <View style={styles.resultContainer}>
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
      </View>
    </Animated.View>
  );
}

Result.propTypes = {
  animatedScrollY: instanceOf(Animated.Value).isRequired,
};

export default Result;
