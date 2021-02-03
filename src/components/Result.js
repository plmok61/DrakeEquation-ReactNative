import React from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import TextSecondary from './TextSecondary';
import Orbiter from './Orbiter';
import styles from '../styles';

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
