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

// function throttle(func, delay = 500) {
//   let timeout = null;
//   return function (...args) {
//     if (!timeout) {
//       timeout = setTimeout(() => {
//         func.call(this, ...args);
//         timeout = null;
//       }, delay);
//     }
//   };
// }

// const brackets = [10000000000, 1000000000, 100000000, 10000000, 1000000, 100000, 10000, 1000, 100, 10, 1];
const brackets = [10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000000];
const { width } = Dimensions.get('window');

class Result extends Component {
  constructor(props) {
    super(props);
    this.createOrbiters = this.createOrbiters.bind(this);
    this.orbiters = [];
  }

  createOrbiters() {
    let count = 0;
    const { numCivs } = this.props;
    brackets.forEach((item) => {
      if (numCivs < item) {
        count += (numCivs / (item / 10));
      } else {
        count += 10;
      }
    });

    const { length } = this.orbiters;
    let i;
    if (count > length) {
      for (i = length; i < count; i += 1) {
        this.orbiters.push(i);
      }
    } else if (count < length) {
      for (i = length; i >= count; i -= 1) {
        this.orbiters.pop();
      }
    }

    return this.orbiters;
  }

  render() {
    return (
      <View style={styles.result}>
        <TextSecondary
          onLayout={(event) => {
            console.log('y', event.nativeEvent.layout);
          }}
          style={{ fontSize: 25, textAlign: 'center', marginTop: 20 }}
        >
          Civilizations in our galaxy:
        </TextSecondary>
        {
          this.createOrbiters().map((i) => {
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
};

export default Result;
