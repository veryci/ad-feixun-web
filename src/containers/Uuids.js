import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container, Label, Segment,
  // Dimmer, Loader, Image,
  // Radio, Segment
} from 'semantic-ui-react';

import {
  XAxis, YAxis, Tooltip, CartesianGrid,
  Line, LineChart, Legend, ResponsiveContainer,
} from 'recharts';

import { uuidActon } from '../actions/dashboard';

class Uuids extends React.Component {
  componentDidMount() {
    this.props.uuidActon();
  }
  render() {
    const { uuid = {} } = this.props;
    const { datas = {} } = uuid;
    const {
      activeCount = 0, newUuidCount = 0, chartData = [],
    } = datas;
    return (
      <Container style={{ marginTop: '7em' }}>
        {/* 30天新增/活跃走势图 渠道贡献 UUID 情况 uuid 设备平台情况 */}
        30天
        <Label>{`新增:${newUuidCount}`}</Label>
        <Label>{`活跃:${activeCount}`}</Label>
        <Segment style={{ height: '400px' }}>
          <ResponsiveContainer>
            <LineChart
              data={chartData}
              margin={{
                top: 20, right: 20, bottom: 20, left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line isAnimationActive={false} type="monotone" dataKey="new" stroke="#ff7300" />
              <Line isAnimationActive={false} type="monotone" dataKey="active" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Segment>
      </Container>
    );
  }
}
Uuids.propTypes = {
  uuid: PropTypes.object.isRequired,
  uuidActon: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  uuid: state.uuid,
});

// export default withRouter(Home);
export default connect(mapStateToProps, { uuidActon })(Uuids);

