import  { StyleSheet, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    marginTop: 22
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  equation: {
    backgroundColor: '#d7d7d7',
    padding: 20,
    width: width
  },
  result: {
    alignItems: 'center'
  }
})

export default styles