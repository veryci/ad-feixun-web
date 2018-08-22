import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Input, Button } from 'semantic-ui-react';

class DatePicker extends Component {
  constructor() {
    super();
    this.state = {
      startTime: moment().subtract(7, 'days').format('YYYY-MM-DD'),
      endTime: moment().format('YYYY-MM-DD'),
    };
    this.onChangeStart = this.onChangeStart.bind(this);
    this.onChangeEnd = this.onChangeEnd.bind(this);
    this.onSerch = this.onSerch.bind(this);
  }
  onChangeStart(ev, { value }) {
    this.setState({ startTime: value });
  }
  onChangeEnd(ev, { value }) {
    this.setState({ endTime: value });
  }
  onSerch() {
    const { startTime, endTime } = this.state;
    const { changeTime } = this.props;
    if (startTime && startTime <= endTime) {
      changeTime(startTime, endTime);
    } else {
      alert('请输入正确的查询日期');
    }
  }
  render() {
    const { startTime, endTime } = this.state;
    return (
      <Fragment>
        <Input label={{ content: '开始日期', style: { lineHeight: '20px' } }} value={startTime} type="date" style={{ verticalAlign: 'middle', marginRight: '10px' }} onChange={this.onChangeStart} />
        <Input label={{ content: '结束日期', style: { lineHeight: '20px' } }} value={endTime} type="date" style={{ verticalAlign: 'middle', marginRight: '10px' }} onChange={this.onChangeEnd} />
        <Button
          content="查询"
          style={{ margin: '3px 0' }}
          primary
          onClick={this.onSerch}
        />&nbsp;&nbsp;
        <Button
          as="a"
          href={`/api/admin/export?type=1&startTime=${startTime}&endTime=${endTime}`}
          content="导出Excel"
          style={{ margin: '3px 0' }}
          primary
        />
      </Fragment>
    );
  }
}

DatePicker.propTypes = {
  changeTime: PropTypes.func.isRequired,
};

export default DatePicker;
