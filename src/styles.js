import  { StyleSheet, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 64
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
    justifyContent:'space-between'
  },
  equation: {
    backgroundColor: '#d7d7d7',
    padding: 20,
    width: width
  },
  result: {
    alignItems: 'center'
  },
  apodContainer: {
    height: height,
    padding: 10
  },
  apod: {
    width: width - 30,
    height: width - 30
  }
})

export default styles