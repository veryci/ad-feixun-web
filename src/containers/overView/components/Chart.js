import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Container } from 'semantic-ui-react';
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
  const random = Math.ceil(Math.random() * 300);
  apiData.flow.push(random);
}

for (let i = 1; i <= 15; i++) {
  const random = Math.ceil(Math.random() * 300);
  apiData.active.push(random);
}

for (let i = 1; i <= 15; i++) {
  const random = Math.ceil(Math.random() * 300);
  apiData.online.push(random);
}

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {

  }

  multiLineOption = () => {
    const lineKeyArr = Object.keys(apiData);
    const legendData = lineKeyArr.map(item => (overViewChartLengend[item]));
    const seriesData = lineKeyArr.map((item) => {
      const ele = {
        name: overViewChartLengend[item],
        type: 'line',
        data: apiData[item],
      };
      return ele;
    });
    const option = {
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

        <Container>

          <ReactEcharts
            className="pie-charts"
            option={this.multiLineOption()}
            style={{ height: 500, marginBottom: 20 }}
            theme="theme_name"
          />

        </Container>

      </React.Fragment>
    );
  }
}

Chart.propTypes = {
};


export default Chart;
