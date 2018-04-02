import { StyleSheet, Dimensions } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const { width } = Dimensions.get('window');

export const black = '#222';
export const purple = '#483d8b';
export const lightBlue = '#d9eaee';
export const teal = '#39818e';
export const red = '#850d14';
export const iPhoneXPadding = ifIphoneX(58, 0);
export const iPhoneXMarginTop = ifIphoneX(65, 25);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: black,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  equationContainer: {
    marginTop: iPhoneXMarginTop,
    marginBottom: iPhoneXPadding,
  },
  equation: {
    backgroundColor: lightBlue,
    padding: 20,
    width,
  },
  result: {
    alignItems: 'center',
    marginBottom: 10,
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width,
  },
  infoWebView: {
    width,
  },
  backButton: {
    backgroundColor: lightBlue,
    width,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drakeInput: {
    color: black,
    fontSize: 19,
  },
  drakeTextInput: {
    fontSize: 19,
    color: purple,
    fontFamily: 'Exo-2-Bold',
    textAlign: 'right',
    flex: 1,
  },
});

export default styles;
