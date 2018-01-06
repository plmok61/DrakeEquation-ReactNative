import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Text, TouchableHighlight } from 'react-native'
import styles from '../styles'

class ButtonPrimary extends Component {
  constructor(props) {
    super(props)
    this.btnStyle = [styles.buttonStyle]
    this.txtStyle = [{ color: 'white' }]
    this.underlayColor = '#D7D7D7'

    // Combine passed in styles with default styles
    if (props.btnStyle) {
      if (Array.isArray(props.btnStyle)) {
        this.btnStyle = this.btnStyle.concat(props.btnStyle)
      } else {
        this.btnStyle.push(props.btnStyle)
      }
    }

    // Combine passed in styles with default styles
    if (props.txtStyle) {
      if (Array.isArray(props.txtStyle)) {
        this.txtStyle = this.txtStyle.concat(props.txtStyle)
      } else {
        this.txtStyle.push(props.txtStyle)
      }
    }
    // If an underlay color was passed in, replace the default color
    if (props.underlayColor) {
      this.underlayColor = props.underlayColor
    } else {
      this.underlayColor = '#D7D7D7'
    }
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={this.btnStyle}
        underlayColor={this.underlayColor}
      >
        <Text style={this.txtStyle}>{this.props.btnText}</Text>
      </TouchableHighlight>
    )
  }
}

ButtonPrimary.defaultProps = {
  underlayColor: false,
}

ButtonPrimary.propTypes = {
  onPress: PropTypes.func.isRequired,
  btnStyle: PropTypes.object,
  txtStyle: PropTypes.object,
  underlayColor: PropTypes.string,
  btnText: PropTypes.string.isRequired,
}

export default ButtonPrimary
