import React from 'react';
import { Text, StyleSheet, TextProps, ViewStyle, TextStyle } from 'react-native';
import { lightBlue } from '../styles';

const styles = StyleSheet.create({
  text: {
    color: lightBlue,
    fontFamily: 'Audiowide_400Regular',
  },
});

interface TextPrimaryProps extends TextProps {
  children: React.ReactNode;
  style?: ViewStyle | TextStyle | (ViewStyle | TextStyle)[];
}

function TextPrimary({ children, style = {}, ...others }: TextPrimaryProps) {
  return (
    <Text {...others} style={[styles.text, style]}>
      {children}
    </Text>
  );
}

export default TextPrimary;

