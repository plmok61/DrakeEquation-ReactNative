import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import Result from './Result';
import DrakeInput from './DrakeInput';
import styles from '../styles';
import inputInfo from '../inputInfo';

class Equation extends Component {
  // Calculate the numCivs based on the initial values
  componentDidMount() {
    this.props.updateNumCivs(this.props.inputs);
  }

  render() {
    const { props } = this;
    const {
      rStar, fPlanets, nEarthLike, fLife, fIntelligent, fComm, lComm,
    } = this.props.inputs;
    return (
      <View style={styles.container}>
        <ScrollView bounces={false} style={styles.equationContainer}>
          <Result numCivs={props.numCivs} />
          <View style={styles.equation}>
            <DrakeInput
              inputId="rStar"
              updateNumCivs={props.updateNumCivs}
              min={1}
              max={15}
              step={1}
              inputValue={rStar}
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
              inputValue={fPlanets}
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
              inputValue={nEarthLike}
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
              inputValue={fLife}
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
              inputValue={fIntelligent}
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
              inputValue={fComm}
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
              step={10000}
              inputValue={lComm}
              descriptionText="Number of years communicative: "
              key="lComm"
              inputInfo={inputInfo.lComm}
              updateInput={props.updateInput}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

Equation.propTypes = {
  updateNumCivs: PropTypes.func.isRequired,
  inputs: PropTypes.object.isRequired,
};

export default Equation;
