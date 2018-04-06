import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import TextSecondary from './TextSecondary';
import OrbiterAnimation from './OrbiterAnimation';
import styles, { teal } from '../styles';

function getRandomInt(mini, maxi) {
  const min = Math.ceil(mini);
  const max = Math.floor(maxi);
  return Math.floor(Math.random() * (max - min)) + min;
}

const { width } = Dimensions.get('window');

class Result extends Component {
  constructor(props) {
    super(props);
    this.orbiters = [];
  }

  render() {
    return (
      <View style={styles.result}>
        <TextSecondary
          style={{ fontSize: 25, textAlign: 'center', marginTop: 20 }}
        >
          Civilizations in our galaxy:
        </TextSecondary>
        {
          this.props.orbiters.map((i) => {
            const radius = getRandomInt(1, width / 2);
            return (
              <OrbiterAnimation
                key={`orbiter-${i}`}
                customStyle={{ position: 'absolute', top: 60 }}
                size={getRandomInt(1, 10)}
                duration={5000 + (radius * 50)}
                color={teal}
                radius={radius}
              />
            );
          })
        }
        <TextSecondary style={{ fontSize: 40, marginVertical: 20 }}>
          {this.props.numCivs}
        </TextSecondary>
      </View>
    );
  }
}

Result.propTypes = {
  numCivs: PropTypes.number.isRequired,
  orbiters: PropTypes.array.isRequired,
};

export default Result;
