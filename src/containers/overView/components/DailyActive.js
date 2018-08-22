import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import { Container, Segment, Table, Header } from 'semantic-ui-react';
import moment from 'moment';
import { dailyDataAction } from '../../../actions/dailyActive';

class DailyActive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyActive: [],
    };
  }

  componentDidMount() {
    this.props.dailyDataAction();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dailyActive: nextProps.dailyActive,
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

  renderDate = () => {
    const list = this.state.dailyActive.map(item => (
      <div style={{ marginBottom: 20 }} key={item._id}>
        <h3>{moment(item.date).format('YYYY-MM-DD')}</h3>
        <Segment basic style={{ padding: '1em 0em', width: '80%', margin: '0 auto' }}>
          <ReactEcharts
            className="pie-charts"
            option={this.pieOption(item.info)}
            style={{ height: 300, marginBottom: 20 }}
            theme="theme_name"
          />
        </Segment>
        <Table celled>
          <Table.Body>
            {this.renderTable(item.info)}
          </Table.Body>
        </Table>
      </div>
    ));
    return list;
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
        <Container>
          <Header as="h3" attached="top">
            日活数
          </Header>
          <Segment attached>
            {this.renderDate()}
          </Segment>
        </Container>
      </React.Fragment>
    );
  }
}


DailyActive.propTypes = {
  dailyActive: PropTypes.array.isRequired,
  dailyDataAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  dailyActive: state.dailyActive.datas,
});

export default connect(mapStateToProps, {
  dailyDataAction,
})(DailyActive);
