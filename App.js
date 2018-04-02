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
      animationComplete: false,
    };
    this.animationTime = 20;
  }

  async componentWillMount() {
    await Font.loadAsync({
      Audiowide: require('./assets/fonts/Audiowide-Regular.ttf'),
      'Exo-2': require('./assets/fonts/Exo2-Regular.ttf'),
      'Exo-2-Bold': require('./assets/fonts/Exo2-Bold.ttf'),
    });
    // First setTimeout so the user can see the loading animation
    // Second setTimeout so the transition animation can complete
    setTimeout(() => {
      this.setState({ fontsLoaded: true });
      setTimeout(() => {
        this.setState({ animationComplete: true });
      }, this.animationTime);
    }, this.animationTime);
  }

  render() {
    if (this.state.fontsLoaded && this.state.animationComplete) {
      return (
        <Provider store={store}>
          <EquationContainer />
        </Provider>
      );
    }
    return (
      <LoadingAnimation
        animating={!this.state.fontsLoaded}
        animationTime={this.animationTime}
      />
    );
  }
}
