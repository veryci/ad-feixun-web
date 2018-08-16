import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Loadable from 'react-loadable';

import { store, history } from './store';

import Login from './components/Login';
import Header from './containers/Header';

import './App.css';

const Loading = () => <div>Loading...</div>;

// const Home = Loadable({
//   loader: () => import('./containers/Home'),
//   loading: Loading,
// });
const Overview = Loadable({
  loader: () => import('./containers/Overview'),
  loading: Loading,
});

const VCCP = Loadable({
  loader: () => import('./containers/VCCP'),
  loading: Loading,
});

const Flows = Loadable({
  loader: () => import('./containers/Flows'),
  loading: Loading,
});
const Views = Loadable({
  loader: () => import('./containers/Views'),
  loading: Loading,
});
const Misses = Loadable({
  loader: () => import('./containers/Misses'),
  loading: Loading,
});
const Uuids = Loadable({
  loader: () => import('./containers/Uuids'),
  loading: Loading,
});
const Devices = Loadable({
  loader: () => import('./components/Devices'),
  loading: Loading,
});
const Setting = Loadable({
  loader: () => import('./components/Setting'),
  loading: Loading,
});
const Analyze = Loadable({
  loader: () => import('./containers/Analyze'),
  loading: Loading,
});
const EditData = Loadable({
  loader: () => import('./containers/editData'),
  loading: Loading,
});
const Area = Loadable({
  loader: () => import('./containers/Area'),
  loading: Loading,
});


const App = () => (
  <Provider store={store}>
    {/* <App /> */}
    <ConnectedRouter history={history}>
      <div>
        <Header />
        <Route exact path="/" component={Overview} />
        {/* <Route path="/overview" component={Overview} /> */}
        <Route path="/flows" component={Flows} />
        <Route path="/vccp" component={VCCP} />
        <Route path="/views" component={Views} />
        <Route path="/misses" component={Misses} />
        <Route path="/uuids" component={Uuids} />
        <Route path="/devices" component={Devices} />
        <Route path="/setting" component={Setting} />
        <Route path="/analyze" component={Analyze} />
        <Route path="/editData" component={EditData} />
        <Route path="/login" component={Login} />
        <Route path="/area" component={Area} />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
