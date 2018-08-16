import React from 'react';
// import { Link } from 'react-router-dom';
import {
  Grid, Header, Image,
  // Message, Button, Form, Segment,
} from 'semantic-ui-react';

import LoginForm from '../containers/LoginForm';

const Login = () => (
  <div className="login-form">
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}
    </style>
    <Grid
      textAlign="center"
      style={{ height: '100%' }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="/logo.png" />
        </Header>
        <LoginForm />
      </Grid.Column>
    </Grid>
  </div>
);

export default Login;
