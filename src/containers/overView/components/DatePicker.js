import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Input, Button } from 'semantic-ui-react';

class DatePicker extends Component {
  constructor() {
    super();
    this.onSerch = this.onSerch.bind(this);
  }
  onSerch() {
    const { startTime, endTime, changeTime } = this.props;
    if (startTime && startTime <= endTime) {
      changeTime(startTime, endTime);
    } else {
      alert('请输入正确的查询日期');
    }
  }
  render() {
    const { startTime, endTime, onChangeStart, onChangeEnd } = this.props;
    return (
      <Fragment>
        <Input label={{ content: '开始日期', style: { lineHeight: '20px' } }} value={startTime} type="date" style={{ verticalAlign: 'middle', marginRight: '10px' }} onChange={(e, { value }) => onChangeStart(value)} />
        <Input label={{ content: '结束日期', style: { lineHeight: '20px' } }} value={endTime} type="date" style={{ verticalAlign: 'middle', marginRight: '10px' }} onChange={(e, { value }) => onChangeEnd(value)} />
        <Button
          content="查询"
          style={{ margin: '3px 0' }}
          primary
          onClick={this.onSerch}
        />
      </Fragment>
    );
  }
}

DatePicker.propTypes = {
  changeTime: PropTypes.func.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  onChangeStart: PropTypes.func.isRequired,
  onChangeEnd: PropTypes.func.isRequired,
};

export default DatePicker;
