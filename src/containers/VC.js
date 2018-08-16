import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container, Grid, Header, Segment,
  // Dimmer, Loader, Image, Segment,
  // Radio
} from 'semantic-ui-react';

import { vcActon } from '../actions/dashboard';

const countStyle = { fontSize: '2.5em' };

class VC extends React.Component {
  componentDidMount() {
    this.props.vcActon();
  }
  render() {
    const { vc } = this.props;
    const { datas = {} } = vc;
    const { newVC = [0, 0, 0], activeVC = [0, 0, 0] } = datas;
    return (
      <Grid.Column width={13}>
        {/* <Menu.Item>
          <Input action={{
            type: 'submit', content: 'Go', primary: true,
          }} placeholder="Navigate to..." />
        </Menu.Item> */}
        <Container>
          <Grid columns={2} divided>
            <Grid.Row stretched>
              <Grid.Column>
                <Header as="h3">
                  VC 新增
                </Header>
                <Segment.Group>
                  <Segment color="blue">今天<p style={countStyle}>{newVC[0]}</p></Segment>
                  <Segment>昨天<p style={countStyle}>{newVC[1]}</p></Segment>
                  <Segment>七天<p style={countStyle}>{newVC[2]}</p></Segment>
                </Segment.Group>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">
                  VC 活跃
                </Header>
                <Segment.Group>
                  <Segment color="violet">今天<p style={countStyle}>{activeVC[0]}</p></Segment>
                  <Segment>昨天<p style={countStyle}>{activeVC[1]}</p></Segment>
                  <Segment>七天<p style={countStyle}>{activeVC[2]}</p></Segment>
                </Segment.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Grid.Column>
    );
  }
}

VC.propTypes = {
  vc: PropTypes.object.isRequired,
  vcActon: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  vc: state.vc,
});

// export default withRouter(Home);
export default connect(mapStateToProps, { vcActon })(VC);
