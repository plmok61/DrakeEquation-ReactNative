import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import TextSecondary from './TextSecondary';
import OrbiterAnimation from './OrbiterAnimation';
import styles, { teal } from '../styles';

function Result(props) {
  return (
    <View style={styles.result}>
      <TextSecondary
        style={{ fontSize: 25, textAlign: 'center', marginTop: 20 }}
      >
        Civilizations in our galaxy:
      </TextSecondary>
      {
        props.orbiters.map(i => (
          <OrbiterAnimation
            key={`orbiter-${i}`}
            index={i}
            customStyle={{ position: 'absolute', top: 60 }}
            color={teal}
          />
        ))
      }
      <TextSecondary style={{ fontSize: 40, marginVertical: 20 }}>
        {props.numCivs}
      </TextSecondary>
    </View>
  );
}


Result.propTypes = {
  numCivs: PropTypes.number.isRequired,
  orbiters: PropTypes.array.isRequired,
};

export default Result;
