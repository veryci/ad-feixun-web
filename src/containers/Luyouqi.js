import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container, Grid, Header, Segment,
  // Dimmer, Loader, Image, Segment,
  // Radio
} from 'semantic-ui-react';

import {
  PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer,
  // Sector,
  // Label, LabelList,
} from 'recharts';
import randomColor from 'randomcolor';

import { renderActiveShape } from '../utils';
import { luyouqiActon } from '../actions/dashboard';

const colorsOne = randomColor({ count: 100 });
const countStyle = { fontSize: '2.5em' };

class Router extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.onPieEnter = this.onPieEnter.bind(this);
  }
  componentDidMount() {
    this.props.luyouqiActon();
  }
  onPieEnter(data, index) {
    this.setState({
      activeIndex: index,
    });
  }
  render() {
    const { luyouqi } = this.props;
    const { datas = {} } = luyouqi;
    const { newRouter = [0, 0, 0], activeRouter = [0, 0, 0], aggRouter = [] } = datas;
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
                  Router 新增
                </Header>
                <Segment.Group>
                  <Segment color="blue">今天<p style={countStyle}>{newRouter[0]}</p></Segment>
                  <Segment>昨天<p style={countStyle}>{newRouter[1]}</p></Segment>
                  <Segment>七天<p style={countStyle}>{newRouter[2]}</p></Segment>
                </Segment.Group>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">
                  Router 活跃
                </Header>
                <Segment.Group>
                  <Segment color="violet">今天<p style={countStyle}>{activeRouter[0]}</p></Segment>
                  <Segment>昨天<p style={countStyle}>{activeRouter[1]}</p></Segment>
                  <Segment>七天<p style={countStyle}>{activeRouter[2]}</p></Segment>
                </Segment.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Header as="h4">路由器品牌分布情况</Header>
          <Segment style={{ height: '500px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={aggRouter}
                  dataKey="count"
                  innerRadius="25%"
                  // outerRadius="40%"
                  activeIndex={this.state.activeIndex}
                  activeShape={renderActiveShape}
                  onMouseEnter={this.onPieEnter}
                  isAnimationActive={false}
                >
                  {
                    aggRouter.map((item, index) => (
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
      </Grid.Column>
    );
  }
}

Router.propTypes = {
  luyouqi: PropTypes.object.isRequired,
  luyouqiActon: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  luyouqi: state.luyouqi,
});

// export default withRouter(Home);
export default connect(mapStateToProps, { luyouqiActon })(Router);
