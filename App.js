import React from 'react';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import AppWithNavigationState from './src/navigator';
import store from './src/store';

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      </Root>
    );
  }
}
