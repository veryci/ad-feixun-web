import React from 'react';
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { overViewChartLengend } from '../../../lib/mapData';

const apiData = {
  flow: [],
  active: [],
  online: [],
};

for (let i = 1; i <= 100; i++) {
  const item = {
    date: `8/${i}`,
    num: Math.ceil(Math.random() * 300),
  };
  apiData.flow.push(item);
}

for (let i = 1; i <= 100; i++) {
  const item = {
    date: `8/${i}`,
    num: Math.ceil(Math.random() * 300),
  };
  apiData.active.push(item);
}

for (let i = 1; i <= 100; i++) {
  const item = {
    date: `8/${i}`,
    num: Math.ceil(Math.random() * 300),
  };
  apiData.online.push(item);
}

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multiLineData: {},
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  getData = () => {

  }

  multiLineOption = () => {
    // let apiData = this.state.multiLineData.chart|| [];
    const lineKeyArr = Object.keys(apiData);
    const newData = {};
    let xaxis = [];
    lineKeyArr.map((item) => {
      newData[item] = apiData[item].map(ele => ele.num);
      return newData[item];
    });
    if (apiData[lineKeyArr[0]]) {
      xaxis = apiData[lineKeyArr[0]].map(item => item.date);
    }
    const legendData = lineKeyArr.map(item => (overViewChartLengend[item]));
    const seriesData = lineKeyArr.map(item => ({
      name: overViewChartLengend[item],
      type: 'line',
      data: newData[item],
    }));
    const option = {
      color: ['#2185d0', '#21ba45', '#f2711c'],
      xAxis: {
        data: xaxis,
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}',
        },
        min: 'dataMin',
        max: 'dataMax',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: legendData,
        top: 0,
      },
      series: seriesData,
    };
    return option;
  }

  render() {
    return (
      <React.Fragment>

        <Segment>

          <ReactEcharts
            className="pie-charts"
            option={this.multiLineOption()}
            style={{ height: 500, marginBottom: 20, marginTop: 20 }}
            theme="theme_name"
          />

        </Segment>

      </React.Fragment>
    );
  }
}

Chart.propTypes = {
  // startTime: PropTypes.any.isRequired,
  // endTime: PropTypes.any.isRequired,
  multiLineData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  multiLineData: state.dailyActive.datas || {},
});

export default connect(mapStateToProps, {})(Chart);
