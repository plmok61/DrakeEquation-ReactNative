import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {
  array, node, object, oneOfType,
} from 'prop-types';
import { lightBlue } from '../styles';

const styles = StyleSheet.create({
  text: {
    color: lightBlue,
    fontFamily: 'Audiowide_400Regular',
  },
});

function TextPrimary({ children, style, ...others }) {
  return (
    <Text {...others} style={[styles.text, style]}>
      {children}
    </Text>
  );
}

TextPrimary.propTypes = {
  style: oneOfType([object, array]),
  children: node.isRequired,
};

TextPrimary.defaultProps = {
  style: {},
};

export default TextPrimary;
