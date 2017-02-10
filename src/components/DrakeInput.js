import React, { Component } from 'react'
import { View, Slider, TouchableHighlight } from 'react-native'
import InfoModal from './InfoModal'
import TextSecondary from './TextSecondary'
import styles from '../styles'

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
        <View style={styles.flexRow}>
          <TextSecondary style={{color: 'black', fontSize: 15}}>
            {descriptionText} {this.state.value}
          </TextSecondary>
          <View style={{justifyContent: 'center'}}>
            <InfoModal />
          </View>
        </View>
        <Slider
          onValueChange={(value) => {
            const rounded = Math.round(100*value)/100
            this.setState({ value: rounded }) 
          }}
          onSlidingComplete={(value) => changeValue(inputId, value)}
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
