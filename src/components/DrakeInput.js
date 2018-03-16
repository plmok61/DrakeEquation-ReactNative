import React from 'react';
import PropTypes from 'prop-types';
import { View, Slider } from 'react-native';
import InfoModal from './InfoModal';
import TextSecondary from './TextSecondary';
import styles from '../styles';

const DrakeInput = (props) => {
  const {
    descriptionText,
    updateNumCivs,
    updateInput,
    inputId,
    min,
    max,
    step,
    inputValue,
    inputInfo,
  } = props;
  return (
    <View>
      <View style={styles.flexRow}>
        <TextSecondary style={{ color: 'black', fontSize: 15 }}>
          {descriptionText} {inputValue}
        </TextSecondary>
        <View style={{ justifyContent: 'center' }}>
          <InfoModal inputInfo={inputInfo} />
        </View>
      </View>
      <Slider
        onValueChange={(value) => {
          updateInput(inputId, value);
          updateNumCivs();
        }}
        onSlidingComplete={() => updateNumCivs()}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={inputValue}
        minimumTrackTintColor="darkslateblue"
      />
    </View>
  );
};


DrakeInput.propTypes = {
  inputValue: PropTypes.number.isRequired,
  descriptionText: PropTypes.string.isRequired,
  updateNumCivs: PropTypes.func.isRequired,
  updateInput: PropTypes.func.isRequired,
  inputId: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  inputInfo: PropTypes.string.isRequired,
};

export default DrakeInput;
