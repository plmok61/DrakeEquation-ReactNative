import React, { Component } from 'react'
import { View } from 'react-native'
import { Provider, connect } from 'react-redux'
import { Actions, Router, Scene, Modal } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import store from '../store'
import styles from '../styles'
import TextPrimary from './TextPrimary'
import Equation from './Equation'
import APOD from './APOD'

const RouterWithRedux = connect()(Router)

const TabIcon = ({ selected, iconName }) => (
  <Icon name={iconName} size={30} color={selected ? '#222' : 'darkslateblue'} />
)


const Scenes = Actions.create(
  <Scene key='modal' component={Modal}>
    <Scene key='root'>
      <Scene key='tabbar' tabs={true} tabBarStyle={styles.tabBarStyle}>
        <Scene key='tab1' title='Drake Equation' icon={TabIcon} iconName='plus'>
          <Scene key='equation' component={Equation} title='Drake Equation' initial={true} />
        </Scene>
        <Scene key='tab2' title='Astronomy Picture of the Day' icon={TabIcon} iconName='star'>
          <Scene key='apod' component={APOD} title='Astronomy Picture of the Day' />
        </Scene>
      </Scene>
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
          titleStyle={{fontFamily: 'Audiowide', color: 'darkslateblue'}}
        />
      </Provider>
    )
  }
}
