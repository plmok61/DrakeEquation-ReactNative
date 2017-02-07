import React, { Component } from 'react'
import { View, Slider } from 'react-native'
import TextPrimary from './TextPrimary'

export default class DrakeInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.inputValue
    }
  }

  render () {
    const { descriptionText, changeValue, inputId, min, max, step, value } = this.props
    return (
      <View>
        <TextPrimary>
          {descriptionText} {this.state.value}
        </TextPrimary>
        <Slider
          onValueChange={(value) => {
            this.setState({ value: value },
              changeValue(inputId, value)) 
          }}
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={this.state.value}
        />
      </View>
    )
  }
}
