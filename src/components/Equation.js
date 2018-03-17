import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated } from 'react-native';
import Result from './Result';
import DrakeInput from './DrakeInput';
import styles from '../styles';
import inputInfo from '../inputInfo';

class Equation extends Component {
  constructor(props) {
    super(props);
    this.animatedOpacity = new Animated.Value(0);
  }

  // Calculate the numCivs based on the initial values
  componentDidMount() {
    console.log(this.props);
    this.props.updateNumCivs(this.props.inputs);
    this.fadeIn();
  }

  fadeIn() {
    Animated.timing(
      this.animatedOpacity,
      {
        toValue: 1,
        duration: 1000,
      },
    ).start();
  }

  render() {
    const { props } = this;
    return (
      <View style={styles.container}>
        { /* show quote here when the user tries to scroll down */}
        <Animated.ScrollView bounces={false} style={[styles.equationContainer, { opacity: this.animatedOpacity }]}>
          <Result numCivs={props.numCivs} />
          <View style={styles.equation}>
            <DrakeInput
              inputId="rStar"
              updateNumCivs={props.updateNumCivs}
              min={1}
              max={15}
              step={1}
              inputValue={props.inputs.rStar}
              descriptionText="Rate of star formation: "
              key="rStar"
              inputInfo={inputInfo.rStar}
              updateInput={props.updateInput}
            />
            <DrakeInput
              inputId="fPlanets"
              updateNumCivs={props.updateNumCivs}
              min={0}
              max={1}
              step={0.01}
              inputValue={props.inputs.fPlanets}
              descriptionText="Fraction of stars with planets: "
              key="fPlanets"
              inputInfo={inputInfo.fPlanets}
              updateInput={props.updateInput}
            />
            <DrakeInput
              inputId="nEarthLike"
              updateNumCivs={props.updateNumCivs}
              min={0}
              max={10}
              step={0.1}
              inputValue={props.inputs.nEarthLike}
              descriptionText="Number of Earth-like planets per star: "
              key="nEarthLike"
              inputInfo={inputInfo.nEarthLike}
              updateInput={props.updateInput}
            />
            <DrakeInput
              inputId="fLife"
              updateNumCivs={props.updateNumCivs}
              min={0}
              max={1}
              step={0.01}
              inputValue={props.inputs.fLife}
              descriptionText="Fraction of stars with life: "
              key="fLife"
              inputInfo={inputInfo.fLife}
              updateInput={props.updateInput}
            />
            <DrakeInput
              inputId="fIntelligent"
              updateNumCivs={props.updateNumCivs}
              min={0}
              max={1}
              step={0.01}
              inputValue={props.inputs.fIntelligent}
              descriptionText="Fraction in which intelligence arises: "
              key="fIntelligent"
              inputInfo={inputInfo.fIntelligent}
              updateInput={props.updateInput}
            />
            <DrakeInput
              inputId="fComm"
              updateNumCivs={props.updateNumCivs}
              min={0}
              max={1}
              step={0.01}
              inputValue={props.inputs.fComm}
              descriptionText="Fraction that are communicative: "
              key="fComm"
              inputInfo={inputInfo.fComm}
              updateInput={props.updateInput}
            />
            <DrakeInput
              inputId="lComm"
              updateNumCivs={props.updateNumCivs}
              min={1000}
              max={1000000000}
              step={100000}
              inputValue={props.inputs.lComm}
              descriptionText="Number of years communicative: "
              key="lComm"
              inputInfo={inputInfo.lComm}
              updateInput={props.updateInput}
            />
          </View>
        </Animated.ScrollView>
      </View>
    );
  }
}

Equation.propTypes = {
  updateNumCivs: PropTypes.func.isRequired,
  inputs: PropTypes.object.isRequired,
};

export default Equation;
