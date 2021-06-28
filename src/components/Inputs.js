import React, { memo } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native';
import { func } from 'prop-types';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import DrakeInput from './DrakeInput';
import TextSecondary from './TextSecondary';
import { lightBlue, sharedStyles } from '../styles';

const styles = StyleSheet.create({
  inputsContainer: {
    backgroundColor: lightBlue,
    paddingTop: 20,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

function Inputs({ toggleFlip }) {
  return (
    <KeyboardAvoidingView
      style={styles.inputsContainer}
      keyboardVerticalOffset={ifIphoneX(-58, 0)}
      behavior="padding"
    >
      <DrakeInput
        inputId="rStar"
        min={0}
        max={15}
        step={0.1}
        descriptionText="Rate of star formation: "
        key="rStar"
        defaultValue={3}
      />
      <DrakeInput
        inputId="fPlanets"
        min={0}
        max={1}
        step={0.01}
        descriptionText="Fraction of stars with planets: "
        key="fPlanets"
        defaultValue={1}
      />
      <DrakeInput
        inputId="nEarthLike"
        min={0}
        max={10}
        step={0.1}
        descriptionText="Earth-like planets per star: "
        key="nEarthLike"
        defaultValue={0.4}
      />
      <DrakeInput
        inputId="fLife"
        min={0}
        max={1}
        step={0.01}
        descriptionText="Fraction of stars with life: "
        key="fLife"
        defaultValue={0.01}
      />
      <DrakeInput
        inputId="fIntelligent"
        min={0}
        max={1}
        step={0.01}
        descriptionText="Fraction with intelligence life: "
        key="fIntelligent"
        defaultValue={0.1}
      />
      <DrakeInput
        inputId="fComm"
        min={0}
        max={1}
        step={0.01}
        descriptionText="Fraction that are communicative: "
        key="fComm"
        defaultValue={0.1}
      />
      <DrakeInput
        inputId="lComm"
        min={0}
        max={1_000_000}
        step={10_000}
        descriptionText="Years communicative: "
        key="lComm"
        defaultValue={10_000}
      />
      <TouchableOpacity
        onPress={toggleFlip}
        style={sharedStyles.flipButton}
      >
        <TextSecondary style={sharedStyles.flipButtonText}>
          Learn More
        </TextSecondary>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

Inputs.propTypes = {
  toggleFlip: func.isRequired,
};

export default memo(Inputs);
