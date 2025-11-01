import React from 'react';
import { Text, StyleSheet, TextProps, ViewStyle, TextStyle } from 'react-native';
import { lightBlue } from '../styles';

const styles = StyleSheet.create({
  text: {
    color: lightBlue,
    fontFamily: 'Exo2_400Regular',
  },
});

interface TextSecondaryProps extends TextProps {
  children: React.ReactNode;
  style?: ViewStyle | TextStyle | (ViewStyle | TextStyle)[];
}

function TextSecondary({ children, style = {}, ...others }: TextSecondaryProps) {
  return (
    <Text {...others} style={[styles.text, style]}>
      {children}
    </Text>
  );
}

export default TextSecondary;

