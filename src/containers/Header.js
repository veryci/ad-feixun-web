import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Menu, Image } from 'semantic-ui-react';

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
    } = this.props;

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

          <Menu.Item as="span" active={pathname === '/'}>
            <Link to="/">总览</Link>
          </Menu.Item>

          {/*<Menu.Item as="span" active={pathname === '/region'}>
            <Link to="/region">地域</Link>
          </Menu.Item>*/}

        </Container>
      </Menu>
    );
  }
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
  logoutAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps, { logoutAction })(Header));
