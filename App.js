import React from 'react';
import { Provider } from 'react-redux';
import { Font } from 'expo';
import EquationContainer from './src/containers/EquationContainer';
import LoadingAnimation from './src/components/LoadingAnimation';
import store from './src/store';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      animationDone: false,
    };
    this.fontsLoadingComplete = this.fontsLoadingComplete.bind(this);
    this.animationComplete = this.animationComplete.bind(this);
  }

  async componentWillMount() {
    await Font.loadAsync({
      Audiowide: require('./assets/fonts/Audiowide-Regular.ttf'),
      'Exo-2': require('./assets/fonts/Exo2-Regular.ttf'),
      'Exo-2-Bold': require('./assets/fonts/Exo2-Bold.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  fontsLoadingComplete() {
    this.setState({ fontsLoaded: true });
  }

  animationComplete() {
    this.setState({ animationDone: true });
  }

  render() {
    if (this.state.fontsLoaded && this.state.animationDone) {
      return (
        <Provider store={store}>
          <EquationContainer animationComplete={this.animationComplete} />
        </Provider>
      );
    }
    return (
      <LoadingAnimation
        animating={!this.state.fontsLoaded}
        animationComplete={this.animationComplete}
      />
    );
  }
}
