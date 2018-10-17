import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'semantic-ui-react';

const DatePicker = ({ time, onChange, searchTime }) => (
  <Fragment>
    <Input label={{ content: '查询日期', style: { lineHeight: '20px' } }} value={time} type="date" style={{ verticalAlign: 'middle', marginRight: '10px' }} onChange={(e, { value }) => onChange(value)} />
    <Button
      content="查询"
      style={{ margin: '3px 0' }}
      primary
      onClick={() => searchTime(time)}
    />
  </Fragment>
);

DatePicker.propTypes = {
  searchTime: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DatePicker;
