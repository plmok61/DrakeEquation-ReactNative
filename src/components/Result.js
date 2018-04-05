import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import TextSecondary from './TextSecondary';
import styles from '../styles';

function Result({ numCivs }) {
  return (
    <View style={styles.result}>
      <TextSecondary style={{ fontSize: 25, textAlign: 'center' }}>
        Civilizations in our galaxy:
      </TextSecondary>
      <TextSecondary style={{ fontSize: 40 }}>
        {numCivs}
      </TextSecondary>
    </View>
  );
}

Result.propTypes = {
  numCivs: PropTypes.number.isRequired,
};

export default Result;
