import React from 'react';
import { connect } from 'react-redux';
import { Container, Button, Input, Dropdown, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import GridDashboard from './components/GridDashboard';
import Chart from './components/Chart';
import Alert from '../Alert';
import { dailyDataAction, versionDataAction } from '../../actions';

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
      version: '',
      message: '',
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(versionDataAction());
  }
  onChangeCode = (e) => {
    const { dailyActive: { datas } } = this.props;
    this.setState({ code: e.target.value, message: '' });
    datas.message = '';
  }
  changeVersion = (e, { value }) => {
    const { dailyActive: { datas } } = this.props;
    this.setState({ version: value, message: '' });
    datas.message = '';
  }
  onChangeStart = (value) => {
    const { dailyActive: { datas } } = this.props;
    this.setState({ startTime: value, message: '' });
    datas.message = '';
  }
  onChangeEnd = (value) => {
    const { dailyActive: { datas } } = this.props;
    this.setState({ endTime: value, message: '' });
    datas.message = '';
  }
  onSerch = () => {
    const { startTime, endTime, code, version } = this.state;
    const { dispatch } = this.props;
    if (startTime && startTime <= endTime && code && version) {
      dispatch(dailyDataAction({ startTime, endTime, code, version }));
    } else if (!version) this.setState({ message: '请选择版本号' });
    else if (!code) this.setState({ message: '请输入验证码' });
    else this.setState({ message: '请输入正确的开始日期' });
  }
  render() {
    const { startTime, endTime, code, message, version } = this.state;
    const { dailyActive: { datas }, versionData } = this.props;
    const options = versionData.datas.map(e => ({ key: e._id, text: e.version, value: e.version }));
    return (
      <React.Fragment>
        <Container style={{ marginTop: '7em' }}>
          <Grid style={{ marginBottom: '.5em' }}>
            <Grid.Column width={4}>
              <Button.Group style={{ verticalAlign: 'middle', marginRight: '16px' }}>
                <Button style={{ padding: '14px 21px 14px 21px'}}>版本号</Button>
                <Dropdown placeholder='选择版本' scrolling loading={!options[0]} value={version} onChange={this.changeVersion} options={options} style={{ padding: '14px 21px 14px 21px'}} floating button />
              </Button.Group>
            </Grid.Column>
            <Grid.Column width={4}>
              <Input label={{ content: '验证码', style: { lineHeight: '20px' } }} value={code} style={{ verticalAlign: 'middle', marginRight: '16px' }} onChange={this.onChangeCode} />
            </Grid.Column>
            <Grid.Column width={4}>
              <Input label={{ content: '开始日期', style: { lineHeight: '20px' } }} value={startTime} type="date" style={{ verticalAlign: 'middle', marginRight: '16px' }} onChange={(e, { value }) => this.onChangeStart(value)} />
            </Grid.Column>
            <Grid.Column width={4}>
              <Input label={{ content: '结束日期', style: { lineHeight: '20px' } }} value={endTime} type="date" style={{ verticalAlign: 'middle', marginRight: '16px' }} onChange={(e, { value }) => this.onChangeEnd(value)} />
            </Grid.Column>
          </Grid>
          <Container>
            {datas.flow && <Button content="下载固件" primary />}
            <Button
              as="a"
              // href={`/api/overviewexcel?startTime=${startTime}&endTime=${endTime}`}
              content="导出Excel"
              primary
              style={{ float: 'right' }}
            />
            <Button content="查询" style={{ float: 'right' }} primary onClick={this.onSerch} />
          </Container>
          {datas.flow &&
            <React.Fragment>
              <GridDashboard />
              <Chart />
            </React.Fragment>
          }
          {datas.message && <Alert message={datas.message} />}
          {message && <Alert message={message} />}
        </Container>
      </React.Fragment>
    );
  }
}

OverView.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps({ dailyActive, versionData }) {
  return { dailyActive, versionData };
}

export default connect(mapStateToProps)(OverView);
