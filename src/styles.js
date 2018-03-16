import  { StyleSheet, Dimensions } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper';

const { height, width } = Dimensions.get('window');

export const darkGrey = '#222';
export const iPhoneXPadding = ifIphoneX(58, 0);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkGrey,
    marginTop: 44,
    marginBottom: iPhoneXPadding,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  equation: {
    backgroundColor: '#d7d7d7',
    padding: 20,
    width: width,
  },
  result: {
    alignItems: 'center',
    marginBottom: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d7d7d7',
    width: width,
    paddingTop: 30,
  },
  infoWebView: {
    height: height - 50,
    width: width,
  },
  closeButton: {
    backgroundColor: '#d7d7d7',
    width: width,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default styles
