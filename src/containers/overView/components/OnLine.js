import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import { Container, Segment, Table } from 'semantic-ui-react';
import { onlineDataAction } from '../../../actions/online';

class OnLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineData: {},
    };
  }
  componentDidMount() {
    this.props.onlineDataAction();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      onlineData: nextProps.onlineData,
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
    return (
      <React.Fragment>

        <Container style={{ marginTop: '7em' }}>

          <h3>2018-08-20</h3>
          <Segment basic style={{ padding: '1em 0em', width: '80%', margin: '0 auto' }}>
            <ReactEcharts
              className="pie-charts"
              option={this.pieOption(this.state.onlineData)}
              style={{ height: 300, marginBottom: 20 }}
              theme="theme_name"
            />
          </Segment>

          <Table celled>
            <Table.Body>
              {this.renderTable(this.state.onlineData)}
            </Table.Body>
          </Table>

        </Container>

      </React.Fragment>
    );
  }
}

OnLine.propTypes = {
  onlineData: PropTypes.object.isRequired,
  onlineDataAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  onlineData: state.onlineData && state.onlineData.datas,
});

export default connect(mapStateToProps, {
  onlineDataAction,
})(OnLine);
