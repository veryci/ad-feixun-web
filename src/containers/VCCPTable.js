import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import moment from 'moment';
import {
  Table, Button,
  // Checkbox, Dropdown,
} from 'semantic-ui-react';

// import ListRow from '../components/ListRow';
import { fetchALLVCCP } from '../actions/vccp';

class UsersTable extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.editVCCPHandler = this.editVCCPHandler.bind(this);
  }
  componentDidMount() {
    this.props.fetchALLVCCP();
  }
  editVCCPHandler(vccp, index) {
    this.props.editVCCP(vccp, index);
  }
  render() {
    const { vccps } = this.props;
    const { datas, errMsg } = vccps;
    if (errMsg) {
      alert(errMsg);
      return null;
    }

    return (
      <Table selectable style={{ border: 'none' }}>
        <Table.Body>
          <Table.Row>
            <Table.Cell>#</Table.Cell>
            <Table.Cell>用户名</Table.Cell>
            <Table.Cell>用户渠道号(cpID)</Table.Cell>
            <Table.Cell>VC-MAC</Table.Cell>
            <Table.Cell />
          </Table.Row>
          { datas.map((vccp, index) => {
            const {
              vcMac = '-', cpId = '-', username = '-',
            } = vccp;

            return (
              <Table.Row key={vccp._id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{username}</Table.Cell>
                <Table.Cell>{cpId}</Table.Cell>
                <Table.Cell>{vcMac}</Table.Cell>
                <Table.Cell textAlign="right">
                  <Button icon="edit" onClick={() => this.editVCCPHandler(vccp, index)} />
                  {/* <Button>Reset</Button> */}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
}


UsersTable.propTypes = {
  vccps: PropTypes.object.isRequired,
  fetchALLVCCP: PropTypes.func.isRequired,
  editVCCP: PropTypes.func.isRequired,
  // completed: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  vccps: state.vccps,
});

export default connect(
  mapStateToProps,
  { fetchALLVCCP },
)(UsersTable);


// export default ALLTable;
