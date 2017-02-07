import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from '../styles'
import TextPrimary from './TextPrimary'
import Equation from './Equation'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextPrimary>
          Drake Equation
        </TextPrimary>
        <Equation />
      </View>
    )
  }
}
