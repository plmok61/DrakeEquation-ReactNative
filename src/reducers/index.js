import { combineReducers } from 'redux'
import apodReducer from './apodReducer'
import routes from './routes'

export default combineReducers({
  apod: apodReducer,
  routes,
})
