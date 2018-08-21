import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import moment from 'moment';
import { DatePicker } from 'antd';
import DailyActive from './components/DailyActive';
import OnLine from './components/OnLine';
import './components/overView.css';

const { RangePicker } = DatePicker;

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

  changeDate = () => {

  }

  render() {
    return (
      <React.Fragment>

        <Container style={{ paddingTop: '5em', paddingBottom: '1em' }}>
          <RangePicker onChange={this.changeDate} />
        </Container>

        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <DailyActive
                  startTime={this.state.startTime}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <OnLine
                  endTime={this.state.endTime}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

      </React.Fragment >
    );
  }
}

export default OverView;

