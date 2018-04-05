import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import DrakeInput from './DrakeInput';
import TextSecondary from './TextSecondary';
import styles, { purple } from '../styles';

function Inputs(props) {
  return (
    <View
      style={styles.equation}
      onLayout={event => props.setInputsHeight(event.nativeEvent.layout.height)}
    >
      <DrakeInput
        inputId="rStar"
        updateNumCivs={props.updateNumCivs}
        min={0}
        max={15}
        step={0.1}
        inputValue={props.inputs.rStar}
        descriptionText="Rate of star formation: "
        key="rStar"
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
        updateInput={props.updateInput}
      />
      <DrakeInput
        inputId="nEarthLike"
        updateNumCivs={props.updateNumCivs}
        min={0}
        max={10}
        step={0.1}
        inputValue={props.inputs.nEarthLike}
        descriptionText="Earth-like planets per star: "
        key="nEarthLike"
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
        updateInput={props.updateInput}
      />
      <DrakeInput
        inputId="fIntelligent"
        updateNumCivs={props.updateNumCivs}
        min={0}
        max={1}
        step={0.01}
        inputValue={props.inputs.fIntelligent}
        descriptionText="Fraction with intelligence life: "
        key="fIntelligent"
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
        updateInput={props.updateInput}
      />
      <DrakeInput
        inputId="lComm"
        updateNumCivs={props.updateNumCivs}
        min={0}
        max={1000000000}
        step={100000}
        inputValue={props.inputs.lComm}
        descriptionText="Years communicative: "
        key="lComm"
        updateInput={props.updateInput}
      />
      <TouchableOpacity onPress={props.flip}>
        <TextSecondary style={{ textAlign: 'center', color: purple }}>
          Learn More
        </TextSecondary>
      </TouchableOpacity>
    </View>
  );
}

Inputs.propTypes = {
  updateInput: PropTypes.func.isRequired,
  updateNumCivs: PropTypes.func.isRequired,
  setInputsHeight: PropTypes.func.isRequired,
  flip: PropTypes.func.isRequired,
  inputs: PropTypes.object.isRequired,
};

export default Inputs;
