import React, { Component } from 'react';
import { Text } from 'react-native';
import {
  array, node, object, oneOfType,
} from 'prop-types';
import { lightBlue } from '../styles';

class TextPrimary extends Component {
  constructor(props) {
    super(props);
    this.style = [{
      color: lightBlue,
      fontFamily: 'Audiowide_400Regular',
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
    const { children, ...others } = this.props;
    return (
      <Text {...others} style={this.style}>
        {children}
      </Text>
    );
  }
}

TextPrimary.propTypes = {
  style: oneOfType([object, array]),
  children: node.isRequired,
};

TextPrimary.defaultProps = {
  style: {},
};

export default TextPrimary;
