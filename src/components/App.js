import React, { Component } from 'react'
import { View } from 'react-native'
import { Provider, connect } from 'react-redux'
import { Actions, Router, Scene } from 'react-native-router-flux'
import store from '../store'
import styles from '../styles'
import TextPrimary from './TextPrimary'
import Equation from './Equation'
import APODModal from './APODModal'

const RouterWithRedux = connect()(Router)

const Scenes = Actions.create(
  <Scene key='root'>
    <Scene
      key='equation'
      component={Equation}
      title='Drake Equation'
      titleStyle={{color:'darkslateblue'}}
      initial={true}
    >
    </Scene>
  </Scene>
)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux
          scenes={Scenes}
          sceneStyle={{backgroundColor: '#222'}} 
          navigationBarStyle={{backgroundColor:'#D7D7D7'}}
          titleStyle={{fontFamily: 'Audiowide'}}
        />
      </Provider>
    )
  }
}

// export default class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <View style={styles.container}>
//           <TextPrimary style={{fontSize: 30, marginBottom: 10}}>
//             Drake Equation
//           </TextPrimary>
//           <Equation />
//           <APODModal />
//         </View>
//       </Provider>
//     )
//   }
// }
