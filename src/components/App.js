import React, { Component } from 'react'
import { View } from 'react-native'
import styles from '../styles'
import TextPrimary from './TextPrimary'
import Equation from './Equation'
import APODModal from './APODModal'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextPrimary style={{fontSize: 30, marginBottom: 10}}>
          Drake Equation
        </TextPrimary>
        <Equation />
        <APODModal />
      </View>
    )
  }
}
