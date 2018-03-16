import { StyleSheet, Dimensions } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const { height, width } = Dimensions.get('window');

export const black = '#222';
export const purple = '#483d8b';
export const lightBlue = '#d9eaee';
export const red = '#850d14';
export const iPhoneXPadding = ifIphoneX(58, 0);

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
    marginTop: 44,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightBlue,
    width,
    paddingTop: 30,
  },
  infoWebView: {
    height: height - 50,
    width,
  },
  closeButton: {
    backgroundColor: lightBlue,
    width,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
