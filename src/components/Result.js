import React from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import TextSecondary from './TextSecondary';
import OrbiterAnimation from './OrbiterAnimation';
import styles, { teal } from '../styles';

function Result() {
  const numCivs = useSelector((state) => state.equationState.numCivs);
  const orbiters = useSelector((state) => state.equationState.orbiters);
  return (
    <View style={styles.result}>
      <TextSecondary
        style={{ fontSize: 25, textAlign: 'center', marginTop: 20 }}
      >
        Civilizations in our galaxy:
      </TextSecondary>
      {
        orbiters.map(i => (
          <OrbiterAnimation
            key={`orbiter-${i}`}
            index={i}
            customStyle={{ position: 'absolute', top: 60 }}
            color={teal}
          />
        ))
      }
      <TextSecondary style={{ fontSize: 40, marginVertical: 20 }}>
        {numCivs}
      </TextSecondary>
    </View>
  );
}

export default Result;
