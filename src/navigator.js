import React from 'react';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import EquationContainer from './containers/EquationContainer';
import TestContainer from './containers/TestContainer';

export const AppNavigator = StackNavigator({
  Equation: { screen: EquationContainer },
});

function AppWithNavigationState({ dispatch, nav }) {
  return <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />;
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
