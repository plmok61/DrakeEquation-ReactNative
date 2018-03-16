import { combineReducers } from 'redux'
import equationReducer from './equationReducer'

export default combineReducers({
  equation: equationReducer,
})
