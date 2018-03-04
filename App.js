import React from 'react';
import { Provider } from 'react-redux';
import AppWithNavigationState from './src/navigator';
import store from './src/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
