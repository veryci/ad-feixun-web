import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import reducer from './reducers';
import middleware from './middleware';
import App from './App';
import api from './api';
import { SET_USER } from './actions';


const store = createStore(reducer, middleware);
// console.log(process.env);

// const currentPath = window.location.pathname;
// api.initAuth().then((user) => {
//   if (typeof user === 'string') throw new Error('auth user err');
//   store.dispatch({
//     type: SET_USER,
//     user,
//   });
//   if (!user.mobile) store.dispatch(push('/login'));
//   // else if (store.dispatch(push('/'));
//   ReactDOM.render(<App />, document.getElementById('root'));
// }).catch((err) => {
//   console.error(err);
//   ReactDOM.render(<App />, document.getElementById('root'));
// });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
// registerServiceWorker();
