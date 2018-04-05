import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Slider, TextInput } from 'react-native';
import TextSecondary from './TextSecondary';
import styles, { purple } from '../styles';

class DrakeInput extends Component {
  render() {
    const {
      descriptionText,
      updateNumCivs,
      updateInput,
      inputId,
      min,
      max,
      step,
      inputValue,
    } = this.props;

    return (
      <View>
        <View style={[styles.flexRow]}>
          <TextSecondary style={styles.drakeInput}>
            {descriptionText}
          </TextSecondary>
          <TextInput
            keyboardType="numeric"
            returnKeyType="done"
            keyboardAppearance="dark"
            ref={(input) => { this.inputField = input; }}
            defaultValue={`${inputValue}`}
            onEndEditing={(event) => {
              let numVal = +event.nativeEvent.text;
              if (numVal > max) {
                numVal = max;
              } else if (numVal < min) {
                numVal = min;
              } else if (Number.isNaN(numVal)) {
                // if the user enters something like '0.32..3.9'
                numVal = 0;
              }
              updateInput(inputId, numVal);
              updateNumCivs();
            }}
            style={styles.drakeTextInput}
          />
        </View>
        <Slider
          onValueChange={(value) => {
            updateInput(inputId, value);
            updateNumCivs();
          }}
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={inputValue}
          minimumTrackTintColor={purple}
        />
      </View>
    );
  }
}


DrakeInput.propTypes = {
  inputValue: PropTypes.number.isRequired,
  descriptionText: PropTypes.string.isRequired,
  updateNumCivs: PropTypes.func.isRequired,
  updateInput: PropTypes.func.isRequired,
  inputId: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
};

export default DrakeInput;
