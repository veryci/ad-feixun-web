import React from 'react';
import ReactDOM from 'react-dom';
import { push } from 'react-router-redux';
// import 'semantic-ui-css/semantic.min.css';
import App from './App';
import api from './api';
import { SET_USER } from './actions';
import { store } from './store';

// console.log(process.env);

// const currentPath = window.location.pathname;
api.initAuth().then((user) => {
  if (typeof user === 'string') throw new Error('auth user err');
  store.dispatch({
    type: SET_USER,
    user,
  });
  if (!user.mobile) store.dispatch(push('/login'));
  // else if (store.dispatch(push('/'));
  ReactDOM.render(<App />, document.getElementById('root'));
}).catch((err) => {
  console.error(err);
  ReactDOM.render(<App />, document.getElementById('root'));
});

// registerServiceWorker();
