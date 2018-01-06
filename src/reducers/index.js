import { combineReducers } from 'redux';
import apodReducer from './apodReducer';
import equationReducer from './equationReducer';
import navReducer from './navReducer';

export default combineReducers({
  equation: equationReducer,
  apod: apodReducer,
  nav: navReducer,
});
