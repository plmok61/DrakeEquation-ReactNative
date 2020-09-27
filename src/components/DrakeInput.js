import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { number, string } from 'prop-types';
import { View, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import TextSecondary from './TextSecondary';
import styles, { purple } from '../styles';
import { updateNumCivs, updateInput, createOrbiters } from '../actions/equationActions';

function DrakeInput({
  inputId,
  min,
  max,
  step,
  descriptionText
}) {
  const dispatch = useDispatch();
  const inputValue = useSelector((state) => state.equationState.inputs[inputId]);

  return (
    <View>
      <View style={styles.flexRow}>
        <TextSecondary style={styles.drakeInput}>
          {descriptionText}
        </TextSecondary>
        <TextInput
          keyboardType="numeric"
          returnKeyType="done"
          keyboardAppearance="dark"
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
            dispatch(updateInput(inputId, numVal));
            dispatch(updateNumCivs());
            dispatch(createOrbiters());
          }}
          style={styles.drakeTextInput}
        />
      </View>
      <Slider
        onValueChange={(value) => {
          dispatch(updateInput(inputId, value));
          dispatch(updateNumCivs());
        }}
        onSlidingComplete={() => dispatch(createOrbiters())}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={inputValue}
        minimumTrackTintColor={purple}
      />
    </View>
  );
}


DrakeInput.propTypes = {
  descriptionText: string.isRequired,
  inputId: string.isRequired,
  min: number.isRequired,
  max: number.isRequired,
  step: number.isRequired,
};

export default DrakeInput;
