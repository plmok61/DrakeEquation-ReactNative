import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import App from './src/components/App'

export default class DrakeEquation extends Component {
  render() {
    return <App />
  }
}

AppRegistry.registerComponent('DrakeEquation', () => DrakeEquation)
