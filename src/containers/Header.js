import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Menu, Image, Dropdown } from 'semantic-ui-react';

import { logoutAction } from '../actions';

const {
  REACT_APP_WEBSITE_DISCRIPTION,
} = process.env;

class Header extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logoutAction();
  }

  render() {
    const {
      location,
      user,
    } = this.props;

    const {
      username = '-', userRole = '-', accountType = 1, cpId,
    } = user;

    const { pathname } = location;
    return pathname === '/login' ? null : (
      <Menu fixed="top" inverted>
        <Container>
          <Link to="/">
            <Menu.Item as="span" header>
              <Image
                size="mini"
                src="/logo.png"
                style={{ marginRight: '1.5em', width: '100px' }}
              />
              {` ${REACT_APP_WEBSITE_DISCRIPTION.toUpperCase()}`}
            </Menu.Item>
          </Link>
          {accountType & 0b0000100 ?
            <Menu.Item as="span" active={pathname === '/'} >
              <Link to="/">总览</Link>
            </Menu.Item> : null}
          {accountType & 0b0000100 ?
            <Menu.Item as="span" active={pathname === '/vccp'}>
              <Link to="/vccp">VC设备</Link>
            </Menu.Item> : null}

          <Menu.Menu position="right">
            {
              accountType > 3 ?
                <Menu.Item as="span">{userRole}</Menu.Item> :
                <Menu.Item as="span">{`渠道ID：${cpId}`}</Menu.Item>
            }
            <Dropdown item simple text={username}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.logout}>登出</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>

        </Container>
      </Menu>
    );
  }
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  logoutAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps, { logoutAction })(Header));
