import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import PropTypes from 'prop-types';
import {
  Container, Menu, Grid,
  // Header, Segment,
  // Dimmer, Loader, Image, Segment,
  // Radio
} from 'semantic-ui-react';

import VC from '../containers/VC';
import Luyouqi from '../containers/Luyouqi';

export default class Devices extends React.Component {
  componentDidMount() {
  }
  render() {
    const { match, location } = this.props;
    const { pathname } = location;
    return (
      <Container style={{ marginTop: '7em' }}>
        <Grid>
          <Grid.Column width={3}>
            <Menu fluid vertical tabular>
              <Menu.Item active={pathname === `${match.url}`}>
                <Link to={match.url}>vc</Link>
              </Menu.Item>
              <Menu.Item active={pathname === `${match.url}/router`}>
                <Link to={`${match.url}/router`}>路由器</Link>
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Route exact path={match.url} component={VC} />
          <Route path={`${match.url}/router`} component={Luyouqi} />
        </Grid>
      </Container>
    );
  }
}

Devices.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
