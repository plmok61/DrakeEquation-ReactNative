import React, { Component } from 'react'
import { View } from 'react-native'
import styles from '../styles'
import TextPrimary from './TextPrimary'
import Equation from './Equation'
import InfoModal from './InfoModal'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextPrimary style={{fontSize: 30}}>
          Drake Equation
        </TextPrimary>
        <Equation />
        <InfoModal />
      </View>
    )
  }
}
