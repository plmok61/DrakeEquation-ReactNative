import React, { PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Actions, Router, Scene, Modal } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import store from '../store'
import styles from '../styles'
import EquationContainer from '../containers/EquationContainer'
import APODContainer from '../containers/APODContainer'
import NEOContainer from '../containers/NEOContainer'

const RouterWithRedux = connect()(Router)

const TabIcon = ({ selected, iconName }) => (
  <Icon name={iconName} size={30} color={selected ? 'darkslateblue' : '#222'} />
)

TabIcon.propTypes = {
  selected: PropTypes.bool,
  iconName: PropTypes.string.isRequired,
}

const Scenes = Actions.create(
  <Scene key="modal" component={Modal}>
    <Scene key="root">
      <Scene key="tabbar" tabs tabBarStyle={styles.tabBarStyle}>
        <Scene key="tab1" title="Drake Equation" icon={TabIcon} iconName="plus">
          <Scene key="equation" component={EquationContainer} title="Drake Equation" initial />
        </Scene>
        <Scene key="tab2" title="APOD" icon={TabIcon} iconName="star">
          <Scene key="apod" component={APODContainer} title="APOD" />
        </Scene>
        <Scene key="tab3" title="NEO" icon={TabIcon} iconName="globe">
          <Scene key="neo" component={NEOContainer} title="Near Earth Objects" />
        </Scene>
      </Scene>
    </Scene>
  </Scene>,
)

const App = () => (
  <Provider store={store}>
    <RouterWithRedux
      scenes={Scenes}
      sceneStyle={{ backgroundColor: '#222' }}
      navigationBarStyle={{ backgroundColor: '#D7D7D7' }}
      titleStyle={{ fontFamily: 'Audiowide', color: 'darkslateblue' }}
    />
  </Provider>
)

export default App
