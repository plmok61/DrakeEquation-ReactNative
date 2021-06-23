import { StyleSheet } from 'react-native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';

export const black = '#222';
export const purple = '#483d8b';
export const lightBlue = '#d9eaee';
export const teal = '#39818e';
export const red = '#850d14';
export const marginTop = getStatusBarHeight();
export const marginBottom = getBottomSpace();
export const resultHeight = 150;

export const sharedStyles = StyleSheet.create({
  flipButton: {
    backgroundColor: lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
  },
  flipButtonText: {
    textAlign: 'center',
    color: purple,
  },
});
