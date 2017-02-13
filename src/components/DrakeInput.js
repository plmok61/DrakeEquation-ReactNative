import React, { Component, PropTypes } from 'react'
import { View, Slider } from 'react-native'
import InfoModal from './InfoModal'
import TextSecondary from './TextSecondary'
import styles from '../styles'

export default class DrakeInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.inputValue,
    }
  }

  render() {
    const { descriptionText, changeValue, inputId, min, max, step } = this.props
    return (
      <View>
        <View style={styles.flexRow}>
          <TextSecondary style={{ color: 'black', fontSize: 15 }}>
            {descriptionText} {this.state.value}
          </TextSecondary>
          <View style={{ justifyContent: 'center' }}>
            <InfoModal />
          </View>
        </View>
        <Slider
          onValueChange={(value) => {
            const rounded = Math.round(100 * value) / 100
            this.setState({ value: rounded })
          }}
          onSlidingComplete={value => changeValue(inputId, value)}
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={this.state.value}
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
}
