import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container, Segment, Label,
  // Dimmer, Loader, Image, Segment, Grid,
  // Radio
} from 'semantic-ui-react';

import {
  PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer,
  // Sector,
  // Label, LabelList,
} from 'recharts';
import randomColor from 'randomcolor';

import { flowActon } from '../actions/dashboard';
import { renderActiveShape } from '../utils';

const colorsOne = randomColor({ count: 100 });
const colorsTwo = randomColor({ count: 10 });

class Flows extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.onPieEnter = this.onPieEnter.bind(this);
  }
  componentDidMount() {
    this.props.flowActon();
  }
  onPieEnter(data, index) {
    this.setState({
      activeIndex: index,
    });
  }

  render() {
    const { flow = {} } = this.props;
    const { flowSize = [], flowCP = [], allView = 0 } = flow.datas;
    return (
      <Container style={{ marginTop: '7em' }}>
        {/* 流量来源情况，哪些渠道贡献了多少（并柱状图）
        流量尺寸分布情况，尺寸分布及占比多少（并柱状图？） */}
        30天 <Label>{allView}</Label>
        流量尺寸分布情况，尺寸分布及占比多少 (30天)
        <Segment style={{ height: '500px' }}>
          <ResponsiveContainer>
            <PieChart  width={250} height={250}>
              <Pie
                data={flowSize}
                dataKey="count"
                innerRadius="25%"
                // outerRadius="40%"
                activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={this.onPieEnter}
                isAnimationActive={false}
              >
                {
                  flowSize.map((item, index) => (
                    <Cell key={item.name} fill={colorsOne[index % 10]} />
                  ))
                }
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Segment>
        流量来源情况 (30天)
        <Segment style={{ height: '500px' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={flowCP}
                dataKey="count"
                innerRadius="25%"
                // outerRadius="40%"
                activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={this.onPieEnter}
                isAnimationActive={false}
              >
                {
                  flowCP.map((item, index) => (
                    <Cell key={item.name} fill={colorsTwo[index % 10]} />
                  ))
                }
              </Pie>
              <Legend />
              {/*
              <Legend layout="vertical" verticalAlign="top" align="right" height={36} />
              <Pie
                data={data02}
                dataKey="value"
                // cx={600}
                // cy={200}
                // startAngle={180}
                // endAngle={-180}
                // innerRadius={60}
                // outerRadius={80}
                // label={renderLabelContent}
                // paddingAngle={5}
                // isAnimationActive={this.state.animation}
              >
                {
                  data02.map((entry, index) => (
                    <Cell key={`slice-${index}`} fill={colors[index % 10]} />
                  ))
                }
              </Pie>
              */}
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Segment>
      </Container>
    );
  }
}

Flows.propTypes = {
  flow: PropTypes.object.isRequired,
  flowActon: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  flow: state.flow,
});

// export default withRouter(Home);
export default connect(mapStateToProps, { flowActon })(Flows);

