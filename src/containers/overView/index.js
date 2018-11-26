import React from 'react';
import { connect } from 'react-redux';
import { Container, Button, Input, Dropdown, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from './components/DatePicker';
import GridDashboard from './components/GridDashboard';
import Chart from './components/Chart';
import { dailyDataAction } from '../../actions/dailyActive';

const options = [
  { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
  { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
  { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
]

class OverView extends React.Component {
  constructor() {
    super();
    this.state = {
      startTime: moment().subtract(8, 'days').format('YYYY-MM-DD'),
      endTime: moment().subtract(1, 'days').format('YYYY-MM-DD'),
      code: '',
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const { startTime, endTime } = this.state;
    dispatch(dailyDataAction({ startTime, endTime }));
  }
  onChangeCode = (e) => {
    this.setState({ code: e.target.value });
  }
  onChangeStart = (value) => {
    this.setState({ startTime: value });
  }
  onChangeEnd = (value) => {
    this.setState({ endTime: value });
  }
  onSerch = () => {
    const { startTime, endTime } = this.state;
    const { dispatch } = this.props;
    if (startTime && startTime <= endTime) {
      dispatch(dailyDataAction({ startTime, endTime }));
    } else {
      alert('请输入正确的查询日期');
    }
  }
  render() {
    const { startTime, endTime } = this.state;
    return (
      <React.Fragment>
        <Container style={{ marginTop: '7em' }}>
          <Grid style={{ marginBottom: '1em' }}>
            <Grid.Column width={4}>
              <Button.Group style={{ verticalAlign: 'middle', marginRight: '16px' }}>
                <Button style={{ padding: '14px 21px 14px 21px'}}>版本号</Button>
                <Dropdown defaultValue={options[0].value} options={options} style={{ padding: '14px 21px 14px 21px'}} floating button />
              </Button.Group>
            </Grid.Column>
            <Grid.Column width={4}>
              <Input label={{ content: '验证码', style: { lineHeight: '20px' } }} style={{ verticalAlign: 'middle', marginRight: '16px' }} onChange={this.onChangeCode} />
            </Grid.Column>
            <Grid.Column width={4}>
              <Input label={{ content: '开始日期', style: { lineHeight: '20px' } }} value={startTime} type="date" style={{ verticalAlign: 'middle', marginRight: '16px' }} onChange={(e, { value }) => this.onChangeStart(value)} />
            </Grid.Column>
            <Grid.Column width={4}>
              <Input label={{ content: '结束日期', style: { lineHeight: '20px' } }} value={endTime} type="date" style={{ verticalAlign: 'middle', marginRight: '16px' }} onChange={(e, { value }) => this.onChangeEnd(value)} />
            </Grid.Column>
          </Grid>
          <Container textAlign='right'>
            <Button content="查询" primary onClick={this.onSerch} />
            <Button
              as="a"
              // href={`/api/overviewexcel?startTime=${startTime}&endTime=${endTime}`}
              content="导出Excel"
              primary
            />
          </Container>
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
