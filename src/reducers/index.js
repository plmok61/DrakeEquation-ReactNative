import { combineReducers } from 'redux';
import equationReducer from './equationReducer';

export default combineReducers({
  equationState: equationReducer,
});
