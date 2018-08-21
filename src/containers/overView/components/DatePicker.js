import React, { Component, Fragment } from 'react';
import { Input, Button } from 'semantic-ui-react';

class DatePicker extends Component {
  constructor() {
    super();
    this.state = {
      startTime: '',
      endTime: '',
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
    if (startTime && startTime <= endTime) {
      console.log(startTime)
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
        />
      </Fragment>
    );
  }
}

export default DatePicker;
