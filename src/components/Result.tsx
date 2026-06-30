import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import TextSecondary from './TextSecondary';
import Orbiter from './Orbiter';
import StarBackground from './StarBackground';
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

interface ResultProps {
  scrollY: SharedValue<number>;
}

function Result({ scrollY }: ResultProps) {
  const { height, width } = useWindowDimensions();

  const scrollDistance = (height - resultHeight) < 0 ? 1 : height - resultHeight;

  const numCivs = useSelector((state: any) => state.equationState.numCivs);
  const orbiters = useSelector((state: any) => state.equationState.orbiters);

  // Expand the result area as the panel is dragged down.
  const containerStyle = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, scrollDistance], [resultHeight, height], Extrapolation.CLAMP),
  }));

  return (
    <Animated.View style={[styles.container, { width }, containerStyle]}>
      <StarBackground scrollY={scrollY} scrollDistance={scrollDistance} />
      <View style={styles.resultContainer}>
        <TextSecondary style={styles.civText}>
          Civilizations in our galaxy:
        </TextSecondary>
        <View>
          {orbiters.map((id: number) => (
            <Orbiter
              key={id}
              customStyle={styles.resultOrbiter}
              randomStart
              scrollY={scrollY}
              scrollDistance={scrollDistance}
            />
          ))}
        </View>
        <TextSecondary style={styles.totalText}>
          {numCivs}
        </TextSecondary>
      </View>
    </Animated.View>
  );
}

export default Result;
