import  { StyleSheet, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 64,
    marginBottom: 50,
  },
  tabBarStyle: {
    backgroundColor: '#d7d7d7',
    borderTopColor: 'darkslateblue',
    borderTopWidth: 1,
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
  apod: {
    width: width,
    height: width,
  },
  apodText: {
    padding: 15,
  },
  apodVideo: {
    height: Dimensions.get('window').width * 0.5625,
    width: Dimensions.get('window').width,
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
