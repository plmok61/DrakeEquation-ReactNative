import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Easing } from 'react-native';
import TextSecondary from './TextSecondary';
import styles, { teal } from '../styles';

function getRandomInt(mini, maxi) {
  const min = Math.ceil(mini);
  const max = Math.floor(maxi);
  return Math.floor(Math.random() * (max - min)) + min;
}

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orbiters: [],
    };
    this.createOrbiters = this.createOrbiters.bind(this);
    this.orbit = this.orbit.bind(this);
    this.orbiters = [];
  }

  // componentWillMount() {
  //   this.createOrbiters();
  // }

  componentDidMount() {
    this.createOrbiters();
    // this.orbiters.map((orbiter, i) => this.orbit(i, orbiter.duration));
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.numCivs !== this.props.numCivs) {
  //     console.log('got here');
  //     this.createOrbiters();
  //     console.log(this.orbiters);
  //   }
  // }

  createOrbiters() {
    const orbiters = [];
    const orbitersCount = this.props.numCivs ? Math.ceil(this.props.numCivs / 100000) : 0;
    for (let j = 0; j <= orbitersCount; j += 1) {
      const orbiter = {};
      // scale shrinks when the orbiter is 'further' away
      this[`animatedScale${j}`] = new Animated.Value(0);
      orbiter.transformScale = this[`animatedScale${j}`].interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0.5, 1],
      });

      this[`animatedOrbit${j}`] = new Animated.Value(0);
      const snapshot = 50;
      const radius = 100;
      // / translateX
      const inputRangeX = [];
      const outputRangeX = [];
      for (let i = 0; i <= snapshot; i += 1) {
        const value = i / snapshot;
        const move = Math.sin(value * Math.PI * 2) * (radius + (j * 5));
        inputRangeX.push(value);
        outputRangeX.push(move);
      }
      orbiter.translateX = this[`animatedOrbit${j}`].interpolate({
        inputRange: inputRangeX,
        outputRange: outputRangeX,
      });

      // / translateY
      const inputRangeY = [];
      const outputRangeY = [];
      for (let i = 0; i <= snapshot; i += 1) {
        const value = i / snapshot;
        const move = -Math.cos(value * Math.PI * 2) * (radius * 0.5);
        inputRangeY.push(value);
        outputRangeY.push(move);
      }
      orbiter.translateY = this[`animatedOrbit${j}`].interpolate({
        inputRange: inputRangeY,
        outputRange: outputRangeY,
      });
      orbiter.duration = getRandomInt(1000, 10000);
      orbiter.size = getRandomInt(5, 30);
      orbiters.push(orbiter);
    }
    this.orbiters = orbiters;
    this.orbiters.map((orbiter, i) => this.orbit(i, orbiter.duration));
  }

  orbit(index, duration) {
    this[`animatedScale${index}`].setValue(0);
    this[`animatedOrbit${index}`].setValue(0);
    Animated.parallel([
      Animated.timing(
        this[`animatedScale${index}`],
        {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        },
      ),
      Animated.timing(
        this[`animatedOrbit${index}`],
        {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        },
      ),
    ]).start(() => this.orbit(index, duration));
  }

  render() {
    return (
      <View style={styles.result}>
        <TextSecondary style={{ fontSize: 25, textAlign: 'center', paddingTop: 40 }}>
          Civilizations in our galaxy:
        </TextSecondary>
        {
          this.orbiters.map((orbiter, i) => (
            <Animated.View
              key={`${i}`}
              style={{
                position: 'absolute',
                top: 90,
                height: this.orbiters[i].size,
                width: this.orbiters[i].size,
                backgroundColor: teal,
                borderRadius: this.orbiters[i].size / 2,
                transform: [
                  { scale: this.orbiters[i].transformScale },
                  { translateY: this.orbiters[i].translateY },
                  { translateX: this.orbiters[i].translateX },
                ],
              }}
            />
          ))
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
