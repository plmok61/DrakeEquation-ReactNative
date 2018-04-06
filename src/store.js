import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';

import reducers from './reducers';

const middleware = applyMiddleware(thunk);

export default createStore(reducers, middleware);
