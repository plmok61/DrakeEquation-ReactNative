import React, { Component, PropTypes } from 'react'
import { View, Slider } from 'react-native'
import InfoModal from './InfoModal'
import TextSecondary from './TextSecondary'
import styles from '../styles'

class DrakeInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: this.props.inputValue,
    }
  }

  render() {
    const { descriptionText, changeValue, inputId, min, max, step, inputValue, inputInfo } = this.props
    return (
      <View>
        <View style={styles.flexRow}>
          <TextSecondary style={{ color: 'black', fontSize: 15 }}>
            {descriptionText} {this.state.inputValue}
          </TextSecondary>
          <View style={{ justifyContent: 'center' }}>
            <InfoModal inputInfo={inputInfo} />
          </View>
        </View>
        <Slider
          onValueChange={(value) => {
            const rounded = Math.round(value * 100) / 100
            this.setState({ inputValue: rounded })
          }}
          onSlidingComplete={value => changeValue(inputId, value)}
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={inputValue}
          minimumTrackTintColor="darkslateblue"
        />
      </View>
    )
  }
}

DrakeInput.propTypes = {
  inputValue: PropTypes.number.isRequired,
  descriptionText: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  inputId: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  inputInfo: PropTypes.string.isRequired,
}

export default DrakeInput
