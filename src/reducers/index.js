import { combineReducers } from 'redux'
import apodReducer from './apodReducer'
import equationReducer from './equationReducer'
import routes from './routes'

export default combineReducers({
  equation: equationReducer,
  apod: apodReducer,
  routes,
})
