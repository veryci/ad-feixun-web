import React from 'react';
import { connect } from 'react-redux';
import { Container, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from './components/DatePicker';
import GridDashboard from './components/GridDashboard';
import Chart from './components/Chart';
import { dailyDataAction } from '../../actions/dailyActive';

class OverView extends React.Component {
  constructor() {
    super();
    this.state = {
      startTime: moment().subtract(8, 'days').format('YYYY-MM-DD'),
      endTime: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const { startTime, endTime } = this.state;
    dispatch(dailyDataAction({ startTime, endTime }));
  }
  onChangeStart = (value) => {
    this.setState({ startTime: value });
  }
  onChangeEnd = (value) => {
    this.setState({ endTime: value });
  }
  changeTime = (startTime, endTime) => {
    const { dispatch } = this.props;
    dispatch(dailyDataAction({ startTime, endTime }));
  }
  render() {
    const { startTime, endTime } = this.state;
    return (
      <React.Fragment>
        <Container style={{ marginTop: '7em' }}>
          <DatePicker
            startTime={startTime}
            endTime={endTime}
            changeTime={this.changeTime}
            onChangeStart={this.onChangeStart}
            onChangeEnd={this.onChangeEnd}
          />&nbsp;&nbsp;
          <Button
            as="a"
            // href={`/api/overviewexcel?startTime=${startTime}&endTime=${endTime}`}
            content="导出Excel"
            style={{ margin: '3px 0' }}
            primary
          />
          <GridDashboard />
          <Chart />
        </Container>
      </React.Fragment>
    );
  }
}

OverView.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(OverView);
