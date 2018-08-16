import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import {
  Table,
  // Checkbox, Dropdown, Button, Icon,
} from 'semantic-ui-react';

const ListRow = ({ item, index }) => {
  const { _id, count } = item;
  const { divW, divH } = _id;
  return (
    <Table.Row>
      <Table.Cell textAlign="right">{index + 1}</Table.Cell>
      <Table.Cell textAlign="right">{divW}</Table.Cell>
      <Table.Cell textAlign="right">{divH}</Table.Cell>
      <Table.Cell textAlign="right">{count}</Table.Cell>
    </Table.Row>
  );
};

ListRow.propTypes = {
  item: PropTypes.object.isRequired,
  // changeValuableAction: PropTypes.func.isRequired,
  // completed: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default ListRow;
