import React, { PropTypes } from 'react'
import { View, Slider } from 'react-native'
import InfoModal from './InfoModal'
import TextSecondary from './TextSecondary'
import styles from '../styles'

const DrakeInput = ({ descriptionText, changeValue, inputId, min, max, step, inputValue }) => (
  <View>
    <View style={styles.flexRow}>
      <TextSecondary style={{ color: 'black', fontSize: 15 }}>
        {descriptionText} {inputValue}
      </TextSecondary>
      <View style={{ justifyContent: 'center' }}>
        <InfoModal />
      </View>
    </View>
    <Slider
      onValueChange={value => changeValue(inputId, value)}
      minimumValue={min}
      maximumValue={max}
      step={step}
      value={inputValue}
      minimumTrackTintColor="darkslateblue"
    />
  </View>
)

DrakeInput.propTypes = {
  inputValue: PropTypes.number.isRequired,
  descriptionText: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  inputId: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
}

export default DrakeInput
