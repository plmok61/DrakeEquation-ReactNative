import { StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';

const { width, height } = Dimensions.get('window');

export { width, height };
export const black = '#222';
export const purple = '#483d8b';
export const lightBlue = '#d9eaee';
export const teal = '#39818e';
export const red = '#850d14';
export const marginTop = getStatusBarHeight();
export const marginBottom = getBottomSpace();

export const resultHeight = 150;
export const equationHeight = height - resultHeight - marginTop - marginBottom;
