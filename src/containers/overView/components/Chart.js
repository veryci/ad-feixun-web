import React from 'react';
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import { overViewChartLengend } from '../../../lib/mapData';

const test = {
  flow: {
    today: 32,
    totalNum: 3432,
    chart: [
      {
        date: '2018-08-20T16:00:00.000Z',
        num: 81,
      },
      {
        date: '2018-08-19T16:00:00.000Z',
        num: 33,
      },
      {
        date: '2018-08-18T16:00:00.000Z',
        num: 98,
      },
      {
        date: '2018-08-17T16:00:00.000Z',
        num: 60,
      },
      {
        date: '2018-08-16T16:00:00.000Z',
        num: 35,
      },
      {
        date: '2018-08-15T16:00:00.000Z',
        num: 78,
      },
      {
        date: '2018-08-14T16:00:00.000Z',
        num: 80,
      },
      {
        date: '2018-08-13T16:00:00.000Z',
        num: 21,
      },
      {
        date: '2018-08-12T16:00:00.000Z',
        num: 58,
      },
      {
        date: '2018-08-11T16:00:00.000Z',
        num: 86,
      },
      {
        date: '2018-08-10T16:00:00.000Z',
        num: 55,
      },
      {
        date: '2018-08-09T16:00:00.000Z',
        num: 64,
      },
      {
        date: '2018-08-08T16:00:00.000Z',
        num: 23,
      },
      {
        date: '2018-08-07T16:00:00.000Z',
        num: 51,
      },
      {
        date: '2018-08-06T16:00:00.000Z',
        num: 28,
      },
      {
        date: '2018-08-05T16:00:00.000Z',
        num: 45,
      },
      {
        date: '2018-08-04T16:00:00.000Z',
        num: 86,
      },
      {
        date: '2018-08-03T16:00:00.000Z',
        num: 78,
      },
      {
        date: '2018-08-02T16:00:00.000Z',
        num: 69,
      },
      {
        date: '2018-08-01T16:00:00.000Z',
        num: 53,
      },
      {
        date: '2018-07-31T16:00:00.000Z',
        num: 91,
      },
      {
        date: '2018-07-30T16:00:00.000Z',
        num: 12,
      },
      {
        date: '2018-07-29T16:00:00.000Z',
        num: 21,
      },
      {
        date: '2018-07-28T16:00:00.000Z',
        num: 40,
      },
      {
        date: '2018-07-27T16:00:00.000Z',
        num: 8,
      },
      {
        date: '2018-07-26T16:00:00.000Z',
        num: 69,
      },
      {
        date: '2018-07-25T16:00:00.000Z',
        num: 93,
      },
      {
        date: '2018-07-24T16:00:00.000Z',
        num: 39,
      },
      {
        date: '2018-07-23T16:00:00.000Z',
        num: 29,
      },
    ],
  },
  active: {
    today: 32,
    totalNum: 3432,
    chart: [
      {
        date: '2018-08-20T16:00:00.000Z',
        num: 14,
      },
      {
        date: '2018-08-19T16:00:00.000Z',
        num: 35,
      },
      {
        date: '2018-08-18T16:00:00.000Z',
        num: 35,
      },
      {
        date: '2018-08-17T16:00:00.000Z',
        num: 95,
      },
      {
        date: '2018-08-16T16:00:00.000Z',
        num: 95,
      },
      {
        date: '2018-08-15T16:00:00.000Z',
        num: 79,
      },
      {
        date: '2018-08-14T16:00:00.000Z',
        num: 28,
      },
      {
        date: '2018-08-13T16:00:00.000Z',
        num: 83,
      },
      {
        date: '2018-08-12T16:00:00.000Z',
        num: 75,
      },
      {
        date: '2018-08-11T16:00:00.000Z',
        num: 36,
      },
      {
        date: '2018-08-10T16:00:00.000Z',
        num: 0,
      },
      {
        date: '2018-08-09T16:00:00.000Z',
        num: 5,
      },
      {
        date: '2018-08-08T16:00:00.000Z',
        num: 37,
      },
      {
        date: '2018-08-07T16:00:00.000Z',
        num: 9,
      },
      {
        date: '2018-08-06T16:00:00.000Z',
        num: 49,
      },
      {
        date: '2018-08-05T16:00:00.000Z',
        num: 75,
      },
      {
        date: '2018-08-04T16:00:00.000Z',
        num: 75,
      },
      {
        date: '2018-08-03T16:00:00.000Z',
        num: 40,
      },
      {
        date: '2018-08-02T16:00:00.000Z',
        num: 64,
      },
      {
        date: '2018-08-01T16:00:00.000Z',
        num: 93,
      },
      {
        date: '2018-07-31T16:00:00.000Z',
        num: 72,
      },
      {
        date: '2018-07-30T16:00:00.000Z',
        num: 19,
      },
      {
        date: '2018-07-29T16:00:00.000Z',
        num: 87,
      },
      {
        date: '2018-07-28T16:00:00.000Z',
        num: 81,
      },
      {
        date: '2018-07-27T16:00:00.000Z',
        num: 70,
      },
      {
        date: '2018-07-26T16:00:00.000Z',
        num: 80,
      },
      {
        date: '2018-07-25T16:00:00.000Z',
        num: 97,
      },
      {
        date: '2018-07-24T16:00:00.000Z',
        num: 92,
      },
      {
        date: '2018-07-23T16:00:00.000Z',
        num: 90,
      },
    ],
  },
  online: {
    today: 32,
    totalNum: 3432,
    chart: [
      {
        date: '2018-08-20T16:00:00.000Z',
        num: 84,
      },
      {
        date: '2018-08-19T16:00:00.000Z',
        num: 7,
      },
      {
        date: '2018-08-18T16:00:00.000Z',
        num: 97,
      },
      {
        date: '2018-08-17T16:00:00.000Z',
        num: 16,
      },
      {
        date: '2018-08-16T16:00:00.000Z',
        num: 5,
      },
      {
        date: '2018-08-15T16:00:00.000Z',
        num: 53,
      },
      {
        date: '2018-08-14T16:00:00.000Z',
        num: 0,
      },
      {
        date: '2018-08-13T16:00:00.000Z',
        num: 91,
      },
      {
        date: '2018-08-12T16:00:00.000Z',
        num: 67,
      },
      {
        date: '2018-08-11T16:00:00.000Z',
        num: 8,
      },
      {
        date: '2018-08-10T16:00:00.000Z',
        num: 73,
      },
      {
        date: '2018-08-09T16:00:00.000Z',
        num: 26,
      },
      {
        date: '2018-08-08T16:00:00.000Z',
        num: 22,
      },
      {
        date: '2018-08-07T16:00:00.000Z',
        num: 29,
      },
      {
        date: '2018-08-06T16:00:00.000Z',
        num: 23,
      },
      {
        date: '2018-08-05T16:00:00.000Z',
        num: 82,
      },
      {
        date: '2018-08-04T16:00:00.000Z',
        num: 94,
      },
      {
        date: '2018-08-03T16:00:00.000Z',
        num: 3,
      },
      {
        date: '2018-08-02T16:00:00.000Z',
        num: 74,
      },
      {
        date: '2018-08-01T16:00:00.000Z',
        num: 81,
      },
      {
        date: '2018-07-31T16:00:00.000Z',
        num: 45,
      },
      {
        date: '2018-07-30T16:00:00.000Z',
        num: 1,
      },
      {
        date: '2018-07-29T16:00:00.000Z',
        num: 7,
      },
      {
        date: '2018-07-28T16:00:00.000Z',
        num: 86,
      },
      {
        date: '2018-07-27T16:00:00.000Z',
        num: 49,
      },
      {
        date: '2018-07-26T16:00:00.000Z',
        num: 47,
      },
      {
        date: '2018-07-25T16:00:00.000Z',
        num: 87,
      },
      {
        date: '2018-07-24T16:00:00.000Z',
        num: 16,
      },
      {
        date: '2018-07-23T16:00:00.000Z',
        num: 50,
      },
    ],
  },
};

// for (let i = 1; i <= 100; i++) {
//   const item = {
//     date: `8/${i}`,
//     num: Math.ceil(Math.random() * 300),
//   };
//   apiData.flow.push(item);
// }

// for (let i = 1; i <= 100; i++) {
//   const item = {
//     date: `8/${i}`,
//     num: Math.ceil(Math.random() * 300),
//   };
//   apiData.active.push(item);
// }

// for (let i = 1; i <= 100; i++) {
//   const item = {
//     date: `8/${i}`,
//     num: Math.ceil(Math.random() * 300),
//   };
//   apiData.online.push(item);
// }

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  // componentWillReceiveProps(nextProps) {
  // }

  multiLineOption = () => {
    const apiData = this.props.multiLineData || {};
    const lineKeyArr = Object.keys(apiData);
    const newData = {};
    let xaxis = [];
    lineKeyArr.map((item) => {
      newData[item] = apiData[item].chart.map(ele => ele.num);
      return newData[item];
    });
    if (apiData[lineKeyArr[0]]) {
      xaxis = apiData[lineKeyArr[0]].chart.map(item => moment(item.date).format('MM-DD'));
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
