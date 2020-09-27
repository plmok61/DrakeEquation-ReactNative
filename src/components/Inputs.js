import React from 'react';
import { useDispatch } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import { func } from 'prop-types';
import DrakeInput from './DrakeInput';
import TextSecondary from './TextSecondary';
import styles, { purple } from '../styles';
import { setInputsHeight } from '../actions/equationActions';

function Inputs({ toggleFlip }) {
  const dispatch = useDispatch()
  return (
    <View
      style={styles.equation}
      onLayout={event => dispatch(setInputsHeight(event.nativeEvent.layout.height))}
    >
      <DrakeInput
        inputId="rStar"
        min={0}
        max={15}
        step={0.1}
        descriptionText="Rate of star formation: "
        key="rStar"
      />
      <DrakeInput
        inputId="fPlanets"
        min={0}
        max={1}
        step={0.01}
        descriptionText="Fraction of stars with planets: "
        key="fPlanets"
      />
      <DrakeInput
        inputId="nEarthLike"
        min={0}
        max={10}
        step={0.1}
        descriptionText="Earth-like planets per star: "
        key="nEarthLike"
      />
      <DrakeInput
        inputId="fLife"
        min={0}
        max={1}
        step={0.01}
        descriptionText="Fraction of stars with life: "
        key="fLife"
      />
      <DrakeInput
        inputId="fIntelligent"
        min={0}
        max={1}
        step={0.01}
        descriptionText="Fraction with intelligence life: "
        key="fIntelligent"
      />
      <DrakeInput
        inputId="fComm"
        min={0}
        max={1}
        step={0.01}
        descriptionText="Fraction that are communicative: "
        key="fComm"
      />
      <DrakeInput
        inputId="lComm"
        min={0}
        max={1000000000}
        step={100000}
        descriptionText="Years communicative: "
        key="lComm"
      />
      <TouchableOpacity onPress={toggleFlip}>
        <TextSecondary style={{ textAlign: 'center', color: purple }}>
          Learn More
        </TextSecondary>
      </TouchableOpacity>
    </View>
  );
}

Inputs.propTypes = {
  toggleFlip: func.isRequired,
};

export default Inputs;
