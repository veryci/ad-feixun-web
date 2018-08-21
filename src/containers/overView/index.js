import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DatePicker from './components/DatePicker';
import GridDashboard from './components/GridDashboard';
import Chart from './components/Chart';
import { dailyDataAction } from '../../actions/dailyActive';
import './components/overView.css';

class OverView extends React.Component {
  constructor() {
    super();
    this.changeTime = this.changeTime.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(dailyDataAction());
  }
  changeTime(startTime, endTime) {
    const { dispatch } = this.props;
    dispatch(dailyDataAction({ startTime, endTime }));
  }
  render() {
    return (
      <React.Fragment>
        <Container style={{ marginTop: '7em' }}>
          <DatePicker changeTime={this.changeTime} />
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

