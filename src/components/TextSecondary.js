import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {
  array, node, object, oneOfType,
} from 'prop-types';
import { lightBlue } from '../styles';

const styles = StyleSheet.create({
  text: {
    color: lightBlue,
    fontFamily: 'Exo2_400Regular',
  },
});

function TextSecondary({ children, style, ...others }) {
  return (
    <Text {...others} style={[styles.text, style]}>
      {children}
    </Text>
  );
}

TextSecondary.propTypes = {
  style: oneOfType([object, array]),
  children: node.isRequired,
};

TextSecondary.defaultProps = {
  style: {},
};

export default TextSecondary;
