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
      time: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    };
    this.onChange = this.onChange.bind(this);
    this.searchTime = this.searchTime.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const { time } = this.state;
    dispatch(dailyDataAction(time));
  }
  onChange(value) {
    this.setState({ time: value });
  }
  searchTime(time) {
    const { dispatch } = this.props;
    dispatch(dailyDataAction(time));
  }
  render() {
    const { time } = this.state;
    return (
      <React.Fragment>
        <Container style={{ marginTop: '7em' }}>
          <DatePicker
            time={time}
            searchTime={this.searchTime}
            onChange={this.onChange}
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
