import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactEcharts from 'echarts-for-react';
import { Container, Segment, Menu, Button, Tab, Table, Header } from 'semantic-ui-react';
import {
  analyzeSizeOsAction
} from '../actions/analyze';
import { arrayClassify } from '../utils';
import { Object } from 'core-js';
const _ = require('lodash');

class SizeOS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeOsData: []
    }
  }

  componentDidMount() {
    this.props.analyzeSizeOsAction();
  }

  componentWillReceiveProps(nextProps) {
    let sizeOsData = _.cloneDeep(nextProps.sizeOsData);
    sizeOsData = this.regroupArr(sizeOsData);
    this.setState({
      sizeOsData: sizeOsData
    })
  }

  regroupArr = arr => {
    arr.map((item) => {
      item.size = 'divW' + item.divW + '/divH' + item.divH
    })
    const newArr = arrayClassify(arr, 'size');
    return newArr
  }

  renderSize = () => {
    const keys = Object.keys(this.state.sizeOsData);
    const list = keys.map((item, index) => {
      return (
        <Table.Row key={index}>
          <Table.Cell style={{ width: '10%' }}>
            <Header as='h4' textAlign='center'>
              {item}
            </Header>
          </Table.Cell>
          {this.renderDate(this.state.sizeOsData[item])}
        </Table.Row>
      )
    })
    return list
  }

  renderDate = (arr) => {
    const newArr = arrayClassify(arr, 'date');
    const keys = Object.keys(newArr);
    const list = keys.map((item, index) => {
      return (
        <Table.Cell style={{ width: '30%' }} key={index} singleLine>
          <ReactEcharts
            option={this.returnPieOption(newArr[item], item)}
            style={{ height: 500 }}
            theme={'theme_name'}
          />
        </Table.Cell>
      )
    })
    return list;
  }

  returnPieOption = (data, name) => {
    let legendData = [];
    let seriesData = [];
    data.map((item, index) => {
      let obj = {};
      obj.name = item.os || '未知';
      obj.value = item.count;
      seriesData.push(obj);
      legendData.push(obj.name)
    })
    legendData.sort((a, b) => { return a.value - b.value })
    let option = {
      title: {
        text: new Date(name).toLocaleDateString(),
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: legendData
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    return option
  }

  render() {
    return (
      <Tab.Pane>
        <Table basic='very' celled collapsing>
          <Table.Body>
            {this.renderSize()}
          </Table.Body>
        </Table>
      </Tab.Pane>
    )
  }
}

const mapStateToProps = state => ({
  sizeOsData: state.analyzeSizeOs.datas,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    analyzeSizeOsAction,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SizeOS);