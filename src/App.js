import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Loadable from 'react-loadable';
import { store, history } from './store';
import './App.css';
import Header from './containers/Header';
import Footer from './containers/Footer';

const Loading = () => <div>Loading...</div>;

const DailyActive = Loadable({
  loader: () => import('./containers/DailyActive'),
  loading: Loading,
});

const OnLine = Loadable({
  loader: () => import('./containers/OnLine'),
  loading: Loading,
});

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Header />
        <Route exact path="/" component={DailyActive} />
        <Route path="/online" component={OnLine} />
        <Footer />
      </div>
    </ConnectedRouter>
  </Provider >
);

export default App;
