import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button, Form, Segment,
  // Message, Grid, Header, Image
} from 'semantic-ui-react';

import { loginAction } from '../actions';
import { history } from '../store';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      password: '',
      msg: props.user.errMsg,
    };
    this.handleMobile = this.handleMobile.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { mobile = '' } = this.props.user;
    if (mobile) {
      history.goBack();
    }
  }
  componentWillReceiveProps(nextProps) {
    const { errMsg = '' } = nextProps.user;
    if (errMsg) {
      this.setState({ msg: errMsg });
    }
  }
  handleSubmit() {
    const { password, mobile } = this.state;
    this.props.loginAction({ mobile, password, msg: '' });
  }
  handlePassword(event) {
    this.setState({ password: event.target.value, msg: '' });
  }
  handleMobile(event) {
    this.setState({ mobile: event.target.value, msg: '' });
  }
  render() {
    const { password, mobile, msg } = this.state;
    return (
      <Form size="large" onSubmit={this.handleSubmit}>
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="手机号码"
            value={mobile}
            onChange={this.handleMobile}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="密码"
            type="password"
            value={password}
            onChange={this.handlePassword}
          />
          <Button color="teal" fluid size="large" type="submit">Login</Button>
          {msg && <p>{msg}</p>}
        </Segment>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  loginAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});


export default connect(
  mapStateToProps,
  { loginAction },
)(LoginForm);

