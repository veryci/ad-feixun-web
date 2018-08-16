import thunk from 'redux-thunk';
// import createHistory from 'history/createBrowserHistory';
import createHistory from 'history/createHashHistory';

import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import reducers from './reducers';

const history = createHistory();
const middlewares = [
  routerMiddleware(history),
  thunk.withExtraArgument(),
];

if (process.env.NODE_ENV === 'development') {
  /* eslint global-require: 0 */
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(reducers);
export { store, history };
