import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import {
  Container, Segment,
  // Grid, Header,
  // Label, Card,
  // Radio,
  Table,
} from 'semantic-ui-react';

const { REACT_APP_VERSION } = process.env;

class OnLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onLineData: {
        k1: 100,
        k2: 90,
        k3: 80,
      },
    };
  }
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      onLineData: nextProps.onLineData,
    });
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
        orient: 'vertical',
        left: 100,
        top: 'middle',
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
    return (
      <React.Fragment>

        <Container style={{ marginTop: '7em' }}>
          <Table celled>
            <Table.Body>
              {this.renderTable(this.state.onLineData)}
            </Table.Body>
          </Table>
        </Container>

        <Segment vertical style={{ padding: '1em 0em' }}>
          <ReactEcharts
            className="pie-charts"
            option={this.pieOption(this.state.onLineData)}
            style={{ height: 300, marginBottom: 20 }}
            theme="theme_name"
          />
        </Segment>

        <Segment vertical style={{ padding: '1em 0em' }}>
          <Container textAlign="right" >
            {`version:${REACT_APP_VERSION}（目前使用假数据）`}
          </Container>
        </Segment>

      </React.Fragment>
    );
  }
}


OnLine.propTypes = {
  onLineData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  onLineData: state.onLineData,
});

export default connect(mapStateToProps, {
})(OnLine);
