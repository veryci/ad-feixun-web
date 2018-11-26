import React from 'react';
import { connect } from 'react-redux';
import { Container, Button, Input, Dropdown, Form } from 'semantic-ui-react';
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
          <Container style={{ marginBottom: '10px', textAlign: 'center' }} >
            <Button.Group style={{ verticalAlign: 'middle', marginRight: '10px' }}>
              <Button style={{ padding: '14px 21px 14px 21px'}}>版本号</Button>
              <Dropdown options={options} style={{ padding: '14px 21px 14px 21px'}} floating button />
            </Button.Group>
            <Input label={{ content: '验证码', style: { lineHeight: '20px' } }} style={{ verticalAlign: 'middle', marginRight: '10px' }} onChange={this.onChangeCode} />
            <DatePicker
              startTime={startTime}
              endTime={endTime}
              onChangeStart={this.onChangeStart}
              onChangeEnd={this.onChangeEnd}
            />
          </Container>
          <Button
            as="a"
            // href={`/api/overviewexcel?startTime=${startTime}&endTime=${endTime}`}
            content="导出Excel"
            style={{float: 'right' }}
            primary
          />
          <Button
            content="查询"
            style={{ float: 'right', marginRight: '10px' }}
            primary
            onClick={this.onSerch}
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
