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

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
if (process.env.NODE_ENV !== 'development') {
  composeEnhancers = compose;
}

const store = composeEnhancers(applyMiddleware(...middlewares))(createStore)(reducers);
export { store, history };
