import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger'
import reducers from './reducers';

const middleware = [thunk];

export default createStore(reducers, applyMiddleware(...middleware));
