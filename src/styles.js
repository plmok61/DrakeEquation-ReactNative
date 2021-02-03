import { StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';

const { width, height } = Dimensions.get('window');

export const black = '#222';
export const purple = '#483d8b';
export const lightBlue = '#d9eaee';
export const teal = '#39818e';
export const red = '#850d14';
export const marginTop = getStatusBarHeight();
export const marginBottom = getBottomSpace();

export const resultHeight = 150;
export const equationHeight = height - resultHeight - marginTop - marginBottom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: black,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  equationScroll: {
    marginTop,
    marginBottom,
  },
  equationContainer: {
    height: equationHeight,
    width,
  },
  inputsContainer: {
    backgroundColor: lightBlue,
    padding: 20,
    width,
    height: '100%',
    justifyContent: 'space-between',
  },
  equation: {
    backgroundColor: lightBlue,
    padding: 20,
    width,
  },
  resultContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    height: resultHeight,
  },
  civText: {
    fontSize: 25,
  },
  totalText: {
    fontSize: 40,
    marginVertical: 20,
  },
  resultOrbiter: {
    position: 'absolute',
    top: 100,
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width,
  },
  infoWebView: {
    width,
    height: '100%',
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
    fontFamily: 'Exo2_700Bold',
    textAlign: 'right',
    flex: 1,
  },
});

export default styles;
