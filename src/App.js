import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Header from './containers/Header';
import Footer from './containers/Footer';
import overView from './containers/overView';

const Loading = () => <div>Loading...</div>;

const Region = Loadable({
  loader: () => import('./containers/Region'),
  loading: Loading,
});

const App = () => (
  <Router>
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={overView} />
        <Route path="/region" component={Region} />
      </Switch>
      <Footer />
    </React.Fragment>
  </Router>
);

export default App;
