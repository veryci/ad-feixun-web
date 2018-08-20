import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
// import color from 'randomcolor';
import {
  Container, Segment,
  // Grid, Header,
  // Label, Card,
  // Radio,
  Table,
} from 'semantic-ui-react';
import {
// XAxis, YAxis, Tooltip, CartesianGrid,
// Line, LineChart, Legend, ResponsiveContainer,
} from 'recharts';

import {
  flowActon, viewActon, missActon,
  uuidActiveActon, uuidActon, dashboardActon, dashboardNewAction,
} from '../actions/dashboard';
// import { Object } from 'core-js';

const { REACT_APP_VERSION } = process.env;

// function formatNumber(num) {
//   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// }

class OverView extends React.Component {
  componentDidMount() {
    this.props.flowActon();
    this.props.viewActon();
    this.props.missActon();
    this.props.dashboardActon();
    this.props.dashboardNewAction();
    this.props.uuidActiveActon();
  }

  pieOption = (data) => {
    const seriesData = [];
    const legendData = Object.keys(data);
    legendData.map((item) => {
      const ele = {};
      ele.name = item;
      ele.value = data[item];
      seriesData.push(ele);
      return true;
    });
    seriesData.sort((a, b) => a.value - b.value);
    const option = {
      title: {
        text: '占比图',
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}（{d}%）',
      },
      itemStyle: {
        normal: {
          label: {
            formatter(params) {
              let percent = 0;
              let total = 0;
              for (let i = 0; i < data.length; i++) {
                total += data[i].value;
              }
              percent = ((params.value / total) * 100).toFixed(0);
              if (params.name !== '') {
                return `${params.name}\n{white|${percent}%}`;
              }
              return '';
            },
          },
        },
      },
      legend: {
        data: legendData,
        orient: 'horizontal',
        top: 'bottom',
      },
      series: {
        type: 'pie',
        data: seriesData,
      },
    };
    return option;
  }

  renderTable = (datas) => {
    const keyArr = Object.keys(datas);
    const tableCell = keyArr.map(item => (
      <Table.Row key={item}>
        <Table.Cell>
          {item}
        </Table.Cell>
        <Table.Cell>
          {datas[item]}
        </Table.Cell>
      </Table.Row>
    ));
    return tableCell;
  }

  render() {
    const {
      // flow = {}, view = {}, miss = {},
      uuidActive = {},
      // dashboard = {},
      dashboardnew = {},
      // uuid = {},
    } = this.props;
    // const flowDatas = flow.datas || [0, 0, 0];
    // const viewDatas = view.datas || [0, 0, 0];
    // const missDatas = miss.datas || [0, 0, 0];
    const activeDatas = uuidActive.datas.data || [0, 0, 0];
    // const overViewChartDatas = dashboard.datas || [];
    const overViewChartCPNewDatas = dashboardnew.datas || [];
    const cpIds = [];
    if (overViewChartCPNewDatas[0]) {
      Object.keys(overViewChartCPNewDatas[0]).forEach((k) => {
        const ks = k.split('-');
        if (ks[0].length === 7) cpIds.push(k);
      });
    }
    // const countStyle = { fontSize: '2em' };
    return (
      <React.Fragment>
        <Container style={{ marginTop: '7em' }}>
          {/* <Grid columns={3} divided>
            <Grid.Row stretched>
              <Grid.Column>
                <Header as="h3">
                  流量
                  <Header.Subheader>
                    可使用数量（个）
                  </Header.Subheader>
                </Header>
                <Segment.Group>
                  <Segment color="blue">
                    今天<p style={countStyle}>{formatNumber(flowDatas[0])}</p>
                  </Segment>
                  <Segment>昨天<p style={countStyle}>{formatNumber(flowDatas[1])}</p></Segment>
                  <Segment>七天<p style={countStyle}>{formatNumber(flowDatas[2])}</p></Segment>
                </Segment.Group>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">
                  展示
                  <Header.Subheader>
                    使用的数量（个）
                  </Header.Subheader>
                </Header>
                <Segment.Group>
                  <Segment color="green">
                    今天<p style={countStyle}>{formatNumber(viewDatas[0])}</p>
                  </Segment>
                  <Segment>昨天<p style={countStyle}>{formatNumber(viewDatas[1])}</p></Segment>
                  <Segment>七天<p style={countStyle}>{formatNumber(viewDatas[2])}</p></Segment>
                </Segment.Group>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">
                  丢失
                  <Header.Subheader>
                    没有使用数量（个）
                  </Header.Subheader>
                </Header>
                <Segment.Group>
                  <Segment color="orange">
                    今天<p style={countStyle}>{formatNumber(missDatas[0])}</p>
                  </Segment>
                  <Segment>昨天<p style={countStyle}>{formatNumber(missDatas[1])}</p></Segment>
                  <Segment>七天<p style={countStyle}>{formatNumber(missDatas[2])}</p></Segment>
                </Segment.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid> */}

          <Table celled>
            <Table.Body>
              {this.renderTable(activeDatas)}
            </Table.Body>
          </Table>
          {/* <Segment style={{ height: '300px' }}>
            <ResponsiveContainer>
              <LineChart
                data={overViewChartDatas}
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
                <Line isAnimationActive={false} type="monotone" dataKey="view" stroke="#82ca9d" />
                <Line isAnimationActive={false} type="monotone" dataKey="miss" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Segment> */}

          {/* <h3 className="ui header">分渠道流量贡献</h3>
          <Segment style={{ height: '600px' }}>
            <ResponsiveContainer>
              <LineChart
                data={overViewChartCPNewDatas}
                margin={{
                  top: 20, right: 20, bottom: 20, left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" align="left" layout="vertical" height={36} />
                {
                  cpIds.map
                  (cpId =>
                     <Line key={cpId} isAnimationActive={false}
                     type="monotone" dataKey={cpId} stroke={color()} />)
                }
              </LineChart>
            </ResponsiveContainer>
          </Segment> */}
          {/* <h3>用户渠道分布</h3>
          <Grid columns={3} divided>
            <Grid.Row stretched>
              <Grid.Column>
                <Segment>今日</Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>昨日</Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>七天</Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid> */}
        </Container>

        <Segment
          basic
          style={{
            padding: '1em 0em', width: '80%', margin: '0 auto',
          }}
        >
          <ReactEcharts
            className="pie-charts"
            option={this.pieOption(activeDatas)}
            style={{ height: 300, marginBottom: 20 }}
            theme="theme_name"
          />
        </Segment>

        <Segment basic style={{ padding: '1em 0em' }}>
          <Container textAlign="right" >
            {`version:${REACT_APP_VERSION}`}
          </Container>
        </Segment>
      </React.Fragment>
    );
  }
}
OverView.propTypes = {
  // flow: PropTypes.object.isRequired,
  // view: PropTypes.object.isRequired,
  // miss: PropTypes.object.isRequired,
  uuidActive: PropTypes.object.isRequired,
  // uuid: PropTypes.object.isRequired, // 新增
  flowActon: PropTypes.func.isRequired,
  viewActon: PropTypes.func.isRequired,
  missActon: PropTypes.func.isRequired,
  // uuidActon: PropTypes.func.isRequired,
  uuidActiveActon: PropTypes.func.isRequired,
  // dashboard: PropTypes.object.isRequired,
  dashboardActon: PropTypes.func.isRequired,
  dashboardnew: PropTypes.object.isRequired,
  dashboardNewAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  dashboard: state.dashboard,
  dashboardnew: state.dashboardnew,
  flow: state.flow,
  view: state.view,
  miss: state.miss,
  uuidActive: state.uuidActive,
  uuid: state.uuid,
});

// export default withRouter(Home);
export default connect(mapStateToProps, {
  flowActon, viewActon, missActon, uuidActiveActon, uuidActon, dashboardActon, dashboardNewAction,
})(OverView);

