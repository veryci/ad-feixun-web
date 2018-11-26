import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'semantic-ui-react';

const DatePicker = ({ startTime, endTime, onChangeStart, onChangeEnd }) => (
  <Fragment>
    <Input label={{ content: '开始日期', style: { lineHeight: '20px' } }} value={startTime} type="date" style={{ verticalAlign: 'middle', marginRight: '10px' }} onChange={(e, { value }) => onChangeStart(value)} />
    <Input label={{ content: '结束日期', style: { lineHeight: '20px' } }} value={endTime} type="date" style={{ verticalAlign: 'middle', marginRight: '10px' }} onChange={(e, { value }) => onChangeEnd(value)} />
  </Fragment>
);

DatePicker.propTypes = {
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  onChangeStart: PropTypes.func.isRequired,
  onChangeEnd: PropTypes.func.isRequired,
};

export default DatePicker;