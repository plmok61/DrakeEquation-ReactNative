import React, { Component } from 'react';
import { Text } from 'react-native';
import { lightBlue } from '../styles';

export default class TextSecondary extends Component {
  constructor(props) {
    super(props);
    this.style = [{
      color: lightBlue,
      fontFamily: 'Exo2_400Regular',
    }];
    if (props.style) {
      if (Array.isArray(props.style)) {
        this.style = this.style.concat(props.style);
      } else {
        this.style.push(props.style);
      }
    }
  }

  render() {
    return (
      <Text {...this.props} style={this.style}>
        {this.props.children}
      </Text>
    );
  }
}
