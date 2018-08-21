import React from 'react';
import moment from 'moment';
import { Container } from 'semantic-ui-react';
import DatePicker from './components/DatePicker';
import GridDashboard from './components/GridDashboard';
import Chart from './components/Chart';
import './components/overView.css';

class OverView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: moment().subtract(2, 'day').toDate(),
      endTime: moment().toDate(),
    };
  }

  componentDidMount() {
  }


  render() {
    return (
      <React.Fragment>
        <Container style={{ marginTop: '7em' }}>
          <DatePicker />
          <GridDashboard
            startTime={this.state.startTime}
            endTime={this.state.endTime}
          />
          <Chart
            startTime={this.state.startTime}
            endTime={this.state.endTime}
          />
        </Container>
      </React.Fragment >
    );
  }
}

export default OverView;

