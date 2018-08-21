import React from 'react';
import ReactEcharts from 'echarts-for-react';
// import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { overViewChartLengend } from '../../../lib/mapData';

const apiData = {
  flow: [],
  active: [],
  online: [],
};

const dateArr = [];
for (let i = 1; i <= 15; i++) {
  dateArr.push(`8/${i}`);
}

for (let i = 1; i <= 15; i++) {
  const item = {
    date: `8/${i}`,
    num: Math.ceil(Math.random() * 300),
  };
  apiData.flow.push(item);
}

for (let i = 1; i <= 15; i++) {
  const item = {
    date: `8/${i}`,
    num: Math.ceil(Math.random() * 300),
  };
  apiData.active.push(item);
}

for (let i = 1; i <= 15; i++) {
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
    };
  }

  componentDidMount() {
    // this.getData(this.props.startTime, this.props.endTime);
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps.startTime, nextProps.endTime, 6666666);
  // }

  getData = () => {

  }

  multiLineOption = () => {
    const lineKeyArr = Object.keys(apiData);
    const newData = {};
    lineKeyArr.map((item) => {
      newData[item] = [];
      apiData[item].map((ele) => {
        newData[item].push(ele.num);
        return true;
      });
      return true;
    });
    const legendData = lineKeyArr.map(item => (overViewChartLengend[item]));
    const seriesData = lineKeyArr.map((item) => {
      const ele = {
        name: overViewChartLengend[item],
        type: 'line',
        data: newData[item],
      };
      return ele;
    });
    const option = {
      color: ['#2185d0', '#21ba45', '#f2711c'],
      xAxis: {
        data: dateArr,
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
};

const mapStateToProps = state => ({
  multiLineData: state.multiLineData || [],
});

export default connect(mapStateToProps, {})(Chart);
