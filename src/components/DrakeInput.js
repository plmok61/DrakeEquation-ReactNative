import React, { Component } from 'react'
import { View, Slider } from 'react-native'
import TextSecondary from './TextSecondary'

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
        <TextSecondary style={{color: 'black', fontSize: 15}}>
          {descriptionText} {this.state.value}
        </TextSecondary>
        <Slider
          onValueChange={(value) => {
            const rounded = Math.round(100*value)/100
            this.setState({ value: rounded },
              changeValue(inputId, rounded)) 
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
