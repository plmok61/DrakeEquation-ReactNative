import React, { Component } from 'react';
import { Text } from 'react-native';
import {
  array, node, object, oneOfType,
} from 'prop-types';
import { lightBlue } from '../styles';

class TextSecondary extends Component {
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
    const { children, ...others } = this.props;
    return (
      <Text {...others} style={this.style}>
        {children}
      </Text>
    );
  }
}

TextSecondary.propTypes = {
  style: oneOfType([object, array]),
  children: node.isRequired,
};

TextSecondary.defaultProps = {
  style: {},
};

export default TextSecondary;
