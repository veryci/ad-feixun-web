import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import geoCoord from '../lib/geoData';
import { regionDataAction } from '../actions';

require('echarts/map/js/china.js');

class Region extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      option: {
        backgroundColor: '#404a59',
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicInOut',
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'cubicInOut',
        title: [
          {
            text: '全国主要城市 用户统计',
            left: 'center',
            top: 18,
            textStyle: { color: '#fff' },
          },
          {
            id: 'statistic',
            right: 120,
            top: 40,
            width: 100,
            textStyle: { color: '#fff', fontSize: 16 },
          },
        ],
        toolbox: {
          top: 12,
          iconStyle: {
            normal: {
              borderColor: '#fff',
            },
            emphasis: { borderColor: '#b1e4ff' },
          },
        },
        brush: {
          outOfBrush: { color: '#abc' },
          brushStyle: {
            borderWidth: 2,
            color: 'rgba(0,0,0,0.2)',
            borderColor: 'rgba(0,0,0,0.5)',
          },
          seriesIndex: [0, 1],
          throttleType: 'debounce',
          throttleDelay: 300,
          geoIndex: 0,
        },
        grid: {
          right: 40,
          top: 100,
          bottom: 40,
          width: '30%',
        },
        xAxis: {
          type: 'value',
          scale: true,
          position: 'top',
          boundaryGap: false,
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { margin: 2, textStyle: { color: '#aaa' } },
        },
        yAxis: {
          type: 'category',
          name: 'TOP 20',
          nameGap: 16,
          axisLine: { show: false, lineStyle: { color: '#ddd' } },
          axisTick: { show: false, lineStyle: { color: '#ddd' } },
          axisLabel: { interval: 0, textStyle: { color: '#ddd' } },
        },
        geo: {
          map: 'china',
          left: '10',
          right: '35%',
          center: [110, 29],
          zoom: 2,
          label: {
            emphasis: {
              show: true,
              color: '#fff',
            },
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: '#111',
            },
            emphasis: { areaColor: '#2a333d' },
          },
        },
      },
    };
    this.renderBrushed = this.renderBrushed.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(regionDataAction());
  }
  componentWillReceiveProps(nextProps) {
    const { areaData } = nextProps;
    const dataTop = areaData.sort((a, b) => b.value[2] - a.value[2]).slice(0, 5);
    const dataOption = {
      tooltip: {
        trigger: 'item',
        formatter: ({ name, data }) => `${name}:
        ${typeof data === 'number' ? data.toLocaleString('zh-Hans-CN') : data.value[2].toLocaleString('zh-Hans-CN')}`,
      },
      series: [
        {
          name: '当前',
          type: 'scatter',
          coordinateSystem: 'geo',
          large: true,
          data: areaData,
          symbolSize: val => Math.min(Math.max(val[2] / 2000, 6), 50),
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false,
            },
            emphasis: { show: true },
          },
          itemStyle: {
            normal: { color: '#ddb926' },
          },
        },
        {
          name: 'Top 5',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: dataTop,
          symbolSize: 70,
          rippleEffect: {
            brushType: 'stroke',
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{a}: {b}',
              position: 'right',
              show: true,
            },
          },
          itemStyle: {
            normal: {
              color: '#f4e925',
              shadowBlur: 10,
              shadowColor: '#333',
            },
          },
          zlevel: 1,
        },
        {
          id: 'bar',
          zlevel: 2,
          type: 'bar',
          symbol: 'none',
          itemStyle: {
            normal: { color: '#ddb926' },
          },
        },
      ],
    };
    this.setState({ option: dataOption, loading: false });
  }
  renderBrushed(params) {
    const { areaData } = this.props;
    const mainSeries = params.batch[0].selected[0];

    const selectedItems = [];
    const categoryData = [];
    const barData = [];
    const maxBar = 30;
    let sum = 0;
    let count = 0;

    for (let i = 0; i < mainSeries.dataIndex.length; i++) {
      const rawIndex = mainSeries.dataIndex[i];
      const dataItem = areaData[rawIndex];
      const pmValue = dataItem.value[2];
      sum += pmValue;
      count++;
      selectedItems.push(dataItem);
    }
    selectedItems.sort((a, b) => a.value[2] - b.value[2]);

    for (let i = 0; i < Math.min(selectedItems.length, maxBar); i++) {
      categoryData.push(selectedItems[i].name);
      barData.push(selectedItems[i].value[2]);
    }
    this.setState({
      option: {
        yAxis: {
          data: categoryData,
        },
        xAxis: {
          axisLabel: { show: count },
        },
        title: {
          id: 'statistic',
          text: count ? `平均: ${(sum / count).toFixed(4)}` : '',
        },
        series: {
          id: 'bar',
          data: barData,
        },
      },
    });
  }
  render() {
    const { loading, option } = this.state;
    return (
      <ReactEcharts
        option={option}
        style={{ height: `${window.innerHeight}px`, width: '100%', paddingTop: '60px' }}
        showLoading={loading}
        loadingOption={{
          text: '加载中...',
          color: '#4413c2',
          textColor: '#270240',
          maskColor: 'rgba(255, 255, 255, 0.2)',
          zlevel: 0,
        }}
        onEvents={{
          brushselected: this.renderBrushed,
        }}
      />
    );
  }
}

Region.propTypes = {
  dispatch: PropTypes.func.isRequired,
  areaData: PropTypes.array.isRequired,
};

function mapStateToProps({ regionData: { datas } }) {
  const areaData = datas.map(e => ({
    name: e.name,
    value: geoCoord[e.name] ? geoCoord[e.name].concat(e.value) : [],
  })).filter(e => e.value[2]);
  return { areaData };
}

export default connect(mapStateToProps)(Region);
