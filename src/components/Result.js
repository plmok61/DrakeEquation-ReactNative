import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import TextSecondary from './TextSecondary';
import Orbiter from './Orbiter';
import { resultHeight } from '../styles';

const styles = StyleSheet.create({
  resultContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    height: resultHeight,
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

function Result() {
  const numCivs = useSelector((state) => state.equationState.numCivs);
  const orbiters = useSelector((state) => state.equationState.orbiters);
  return (
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
  );
}

export default Result;
