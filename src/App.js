import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Home from './containers/Home';

const Loading = () => <div>Loading...</div>;

const Region = Loadable({
  loader: () => import('./containers/Region'),
  loading: Loading,
});

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/region" component={Region} />
    </Switch>
  </Router>
);

export default App;
