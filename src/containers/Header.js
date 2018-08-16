import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Role } from 'ad-dispatch-schema';
import {
  Container, Menu, Image, Dropdown,
  // Divider, Grid, Header, List, Segment
} from 'semantic-ui-react';

import { logoutAction } from '../actions';

// const { vicePresident, operator } = Role;
const {
  // REACT_APP_WEBSITE_NAME,
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
      // match,
      location,
      // history,
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
          {/* accountType & 0b0000001 ?
            <Menu.Item as="span" active={pathname === '/'} >
              <Link to="/">数据</Link>
          </Menu.Item> : null */}
          {accountType & 0b0000100 ?
            <Menu.Item as="span" active={pathname === '/'} >
              <Link to="/">总览</Link>
            </Menu.Item> : null }
          {accountType & 0b0000100 ?
            <Menu.Item as="span" active={pathname === '/vccp'}>
              <Link to="/vccp">VC设备</Link>
            </Menu.Item> : null }
          {/* accountType & 0b0000100 ?
            <Menu.Item as="span" active={pathname === '/flows'}>
              <Link to="/flows">流量</Link>
          </Menu.Item> : null */}
          {/* accountType & 0b0000100 ?
            <Menu.Item as="span" active={pathname === '/views'}>
              <Link to="/views">展示</Link>
          </Menu.Item> : null */ }
          {/* accountType & 0b0000100 ?
            <Menu.Item as="span" active={pathname === '/misses'}>
              <Link to="/misses">丢失</Link>
          </Menu.Item> : null */}
          {/* accountType & 0b000100 ?
            <Menu.Item as="span" active={pathname === '/uuids'}>
              <Link to="/uuids">UUID</Link>
          </Menu.Item> : null */}
          {/* accountType & 0b000100 ?
            <Menu.Item as="span" active={pathname.startsWith('/devices')}>
              <Link to="/devices">设备</Link>
          </Menu.Item> : null */}
          {/* accountType & 0b000100 ?*/
            <Menu.Item as="span" active={pathname === '/area'}>
              <Link to="/area">地域</Link>
            </Menu.Item>/* : null */ }
          { accountType & 0b1111100 ?
            <Menu.Item as="span" active={pathname === '/setting'}>
              <Link to="/setting">渠道用户</Link>
            </Menu.Item> : null }
          { accountType & 0b1111100 ?
            <Menu.Item as="span" active={pathname === '/analyze'}>
              <Link to="/analyze">分析图表</Link>
            </Menu.Item> : null }
          { accountType & 0b1111100 ?
            <Menu.Item as="span" active={pathname === '/editdata'}>
              <Link to="/editdata">修改数据</Link>
            </Menu.Item> : null }

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
          {/*
          <Menu.Menu position="right">
            <Dropdown item simple text={username}>
              <Dropdown.Menu>
                <Dropdown.Item>个人信息</Dropdown.Item>
                <Dropdown.Item>登出</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item as="span">{userRole}</Menu.Item>
          </Menu.Menu >
          */}
        </Container>
      </Menu>
    );
  }
}

Header.propTypes = {
  // match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  logoutAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // active: ownProps.filter === state.visibilityFilter,
  user: state.user,
});

// export default withRouter(Header);
export default withRouter(connect(mapStateToProps, { logoutAction })(Header));
