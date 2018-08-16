import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Loadable from 'react-loadable';
import { store, history } from './store';
import './App.css';

import Login from './components/Login';
import Header from './containers/Header';

const Loading = () => <div>Loading...</div>;

const Overview = Loadable({
  loader: () => import('./containers/Overview'),
  loading: Loading,
});

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Header />
        <Route exact path="/" component={Overview} />
        <Route path="/login" component={Login} />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
