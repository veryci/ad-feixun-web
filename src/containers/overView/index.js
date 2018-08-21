import React from 'react';
import DailyActive from './components/DailyActive';
import { Container, Grid, Table } from 'semantic-ui-react';
import OnLine from './components/OnLine';
import './components/overView.css';

class OverView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: '',
      endTime: '',
    };
  }
  componentDidMount() {
  }

  render() {
    return (
      <React.Fragment>

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

      </React.Fragment >
    );
  }
}

export default OverView;

