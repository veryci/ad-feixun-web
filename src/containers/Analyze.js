import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactEcharts from 'echarts-for-react';
import { Container, Tab, Table } from 'semantic-ui-react';
import {
  analyzeTimeActon,
  analyzeBrowserActon,
  analyzeDeviceAction,
  analyzeMissSizeAction,
  analyzeSizeActon,
  analyzeHostAction,
  analyzeUuidAction,
} from '../actions/analyze';
import { arrayClassify, handleDatStatisticsData, mapData } from '../utils';
import SizeOS from './sizeOs';

class Analyze extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeData: [],
      browserData: [],
      deviceData: [],
      missSizeData: [],
      sizeData: [],
      hostData: [],
      uuidData: [],
    };
  }

  componentDidMount() {
    this.props.analyzeTimeActon();
    this.props.analyzeBrowserActon();
    this.props.analyzeDeviceAction();
    this.props.analyzeMissSizeAction();
    this.props.analyzeSizeActon();
    this.props.analyzeHostAction();
    this.props.analyzeUuidAction();
  }

  componentWillReceiveProps(nextProps) {
    const timeData = handleDatStatisticsData(nextProps.timeData);
    const browserData = arrayClassify(nextProps.browserData, 'date');
    const deviceData = arrayClassify(nextProps.deviceData, 'date');
    let missSizeData = JSON.parse(JSON.stringify(nextProps.missSizeData));
    missSizeData = mapData(missSizeData, ['size'], { size: item => `divW${item.divW}/divH${item.divH}` });
    missSizeData = arrayClassify(missSizeData, 'date');
    let sizeData = JSON.parse(JSON.stringify(nextProps.sizeData));
    sizeData = mapData(sizeData, ['size'], { size: item => `divW${item.divW}/divH${item.divH}` });
    sizeData = arrayClassify(sizeData, 'date');
    let { uuidData } = nextProps;
    uuidData = mapData(uuidData, ['date'], { date: item => new Date(item.date).toLocaleDateString() });
    this.setState({
      timeData,
      browserData,
      deviceData,
      missSizeData,
      sizeData,
      uuidData,
      hostData: nextProps.hostData,
    });
  }

  lineOption = () => {
    const legendData = Object.keys(this.state.timeData);
    const xaxis = [];
    const seriesData = [];
    legendData.map((item) => {
      const arr = this.state.timeData[item];
      const newArr = [];
      arr.map((ele) => {
        newArr.push(ele.count);
        return true;
      });
      const seriesObj = {
        type: 'line',
        name: item,
      };
      seriesObj.data = newArr;
      seriesData.push(seriesObj);
      return true;
    });
    if (this.state.timeData[legendData[0]]) {
      this.state.timeData[legendData[0]].map((item) => {
        xaxis.push(item.hourDate);
        return true;
      });
    }
    const option = {
      xAxis: {
        data: xaxis,
        name: '小时',
        nameLocation: 'end',
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}',
        },
        min: 'dataMin',
        max: 'dataMax',
        name: '次数',
        nameLocation: 'end',
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

  pieOption = (pieName, pieData, namekey) => {
    let data = JSON.parse(JSON.stringify(pieData));
    const legendData = [];
    data.map((item) => {
      legendData.push(item[namekey]);
      return true;
    });
    data = mapData(data, ['value', 'name'], {
      value: item => item.count,
      name: item => item[namekey],
    });
    data.sort((a, b) => a.value - b.value);
    const option = {
      title: {
        text: pieName,
        x: 'right',
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
        orient: 'vertical',
        left: 0,
        top: 'middle',
      },
      series: {
        center: namekey === 'browser' ? ['70%', '70%'] : ['70%', '50%'],
        radius: '50%',
        type: 'pie',
        data,
      },
    };
    if (data.length > 150) {
      delete option.legend;
    }
    return option;
  }

  userLineOption = () => {
    const xaxis = [];
    const seriesData = [];
    this.state.uuidData.map((item) => {
      seriesData.push(item.count);
      xaxis.push(item.date);
      return true;
    });
    const option = {
      xAxis: {
        type: 'category',
        data: xaxis,
        name: '日期',
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}',
        },
        min: 'dataMin',
        max: 'dataMax',
        name: '数量',
      },
      tooltip: {
        trigger: 'axis',
      },
      series: {
        data: seriesData,
        type: 'line',
        label: {
          normal: {
            show: true,
            position: 'top',
          },
        },
      },
    };
    return option;
  }

  renderPies = (data, namekey) => {
    const keys = Object.keys(data).reverse();
    const list = keys.map((item, index) => {
      const pieName = new Date(item).toLocaleDateString();
      return (
        <div key={item._id}>
          <ReactEcharts
            className="pie-charts"
            option={this.pieOption(pieName, data[item], namekey)}
            style={{ height: 600, marginBottom: 20 }}
            theme="theme_name"
          />
          {index !== keys.length - 1 && <div className="ui divider" />}
        </div>
      );
    });
    return list;
  }

  renderTable = () => (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>排名</Table.HeaderCell>
          <Table.HeaderCell>网站</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {this.state.hostData.map((item, index) => (
          <Table.Row key={item._id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{item}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )

  renderPanes = () => {
    const panes = [
      {
        menuItem: '用户数量趋势图',
        render: () => (
          <Tab.Pane>
            <ReactEcharts
              option={this.userLineOption()}
              style={{ height: 500 }}
              theme="theme_name"
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: '前100网站',
        render: () => (
          <Tab.Pane>
            {this.renderTable()}
          </Tab.Pane>
        ),
      },
      {
        menuItem: '数量趋势',
        render: () => (
          <Tab.Pane>
            <ReactEcharts
              option={this.userLineOption()}
              style={{ height: 500, display: 'none' }}
              theme="theme_name"
            />
            <ReactEcharts
              option={this.lineOption()}
              style={{ height: 500 }}
              theme="theme_name"
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: '浏览器分布',
        render: () => (
          <Tab.Pane>
            {this.renderPies(this.state.browserData, 'browser')}
          </Tab.Pane>
        ),
      },
      {
        menuItem: '设备分布',
        render: () => (
          <Tab.Pane>
            {this.renderPies(this.state.deviceData, 'os')}
          </Tab.Pane>
        ),
      },
      {
        menuItem: '缺失尺寸',
        render: () => (
          <Tab.Pane>
            {this.renderPies(this.state.missSizeData, 'size')}
          </Tab.Pane>
        ),
      },
      {
        menuItem: '尺寸分布',
        render: () => (
          <Tab.Pane>
            {this.renderPies(this.state.sizeData, 'size')}
          </Tab.Pane>
        ),
      },
      {
        menuItem: '尺寸时间分布',
        render: () => (
          <SizeOS />
        ),
      },
    ];
    return panes;
  }

  render() {
    return (
      <Container style={{ marginTop: '7em' }}>
        <Tab panes={this.renderPanes()} />
      </Container>
    );
  }
}

Analyze.propTypes = {
  timeData: PropTypes.array.isRequired,
  browserData: PropTypes.array.isRequired,
  deviceData: PropTypes.array.isRequired,
  missSizeData: PropTypes.array.isRequired,
  sizeData: PropTypes.array.isRequired,
  hostData: PropTypes.array.isRequired,
  uuidData: PropTypes.array.isRequired,
  analyzeTimeActon: PropTypes.func.isRequired,
  analyzeBrowserActon: PropTypes.func.isRequired,
  analyzeDeviceAction: PropTypes.func.isRequired,
  analyzeMissSizeAction: PropTypes.func.isRequired,
  analyzeSizeActon: PropTypes.func.isRequired,
  analyzeHostAction: PropTypes.func.isRequired,
  analyzeUuidAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  timeData: state.analyzeTime.datas,
  browserData: state.analyzeBrowser.datas,
  deviceData: state.analyzeDevice.datas,
  missSizeData: state.analyzeMissSize.datas,
  sizeData: state.analyzeSize.datas,
  hostData: state.analyzeHost.datas,
  uuidData: state.analyzeUuid.datas,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  analyzeTimeActon,
  analyzeBrowserActon,
  analyzeDeviceAction,
  analyzeMissSizeAction,
  analyzeSizeActon,
  analyzeHostAction,
  analyzeUuidAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Analyze);
