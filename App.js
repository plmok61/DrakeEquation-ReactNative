import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { Font } from 'expo';
import EquationContainer from './src/containers/EquationContainer';
import store from './src/store';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Audiowide: require('./assets/fonts/Audiowide-Regular.ttf'),
      'Exo-2': require('./assets/fonts/Exo2-Regular.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <Provider store={store}>
          <EquationContainer />
        </Provider>
      );
    }
    return (
      <View style={{ backgroundColor: '#222', flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="darkslateblue" />
      </View>
    );
  }
}
