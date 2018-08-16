import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container, Label, Segment,
  // Dimmer, Loader, Image, Segment,
  // Radio,
} from 'semantic-ui-react';

import {
  PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer,
  // Sector,
  // Label, LabelList,
} from 'recharts';
import randomColor from 'randomcolor';

import { renderActiveShape } from '../utils';
import { missActon } from '../actions/dashboard';

const colorsOne = randomColor({ count: 100 });

class Misses extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.onPieEnter = this.onPieEnter.bind(this);
  }
  componentDidMount() {
    this.props.missActon();
  }
  onPieEnter(data, index) {
    this.setState({
      activeIndex: index,
    });
  }

  render() {
    const { miss = {} } = this.props;
    const { datas = {} } = miss;
    const { allMiss = 0, missSize = [] } = datas;
    return (
      <Container style={{ marginTop: '7em' }}>
        {/* 丢失尺寸及分布 */}
        30天 <Label>{allMiss}</Label>
        广告展示分布
        <Segment style={{ height: '500px' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={missSize}
                dataKey="count"
                innerRadius="25%"
                // outerRadius="40%"
                activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={this.onPieEnter}
                isAnimationActive={false}
              >
                {
                  missSize.map((item, index) => (
                    <Cell key={item.name} fill={colorsOne[index % 10]} />
                  ))
                }
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Segment>
      </Container>
    );
  }
}


Misses.propTypes = {
  miss: PropTypes.object.isRequired,
  missActon: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  miss: state.miss,
});

// export default withRouter(Home);
export default connect(mapStateToProps, { missActon })(Misses);
