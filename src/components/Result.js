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

class Result extends Component {
  constructor(props) {
    super(props);
    this.createOrbiters = this.createOrbiters.bind(this);
  }

  createOrbiters() {
    const count = this.props.numCivs ? Math.ceil(this.props.numCivs / 100000) : 0;
    let i;
    const orbiters = [];
    for (i = 0; i < count; i += 1) {
      orbiters.push(i);
    }
    console.log(orbiters);
    return orbiters;
  }

  render() {
    return (
      <View style={styles.result}>
        <TextSecondary style={{ fontSize: 25, textAlign: 'center', paddingTop: 40 }}>
          Civilizations in our galaxy:
        </TextSecondary>
        {
          this.createOrbiters().map((i) => {
            const radius = getRandomInt(1, Dimensions.get('window').width / 2);
            return (
              <OrbiterAnimation
                key={`orbiter-${i}`}
                customStyle={{ position: 'absolute', top: 90 }}
                size={getRandomInt(1, 10)}
                duration={5000 + (radius * 50)}
                color={teal}
                radius={radius}
              />
            );
          })
        }
        <TextSecondary style={{ fontSize: 40 }}>
          {this.props.numCivs}
        </TextSecondary>
      </View>
    );
  }
}

Result.propTypes = {
  numCivs: PropTypes.number.isRequired,
};

export default Result;
