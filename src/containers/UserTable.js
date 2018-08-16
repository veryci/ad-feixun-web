import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import moment from 'moment';
import {
  Table, Button,
  // Checkbox, Dropdown,
} from 'semantic-ui-react';

// import ListRow from '../components/ListRow';
import { fetchALLUser } from '../actions/user';
import { userOptions } from '../utils';

const kWord = {
  r: '替换',
  e: '挤入',
  f: '菲搜',
};

class UsersTable extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.editUserHandler = this.editUserHandler.bind(this);
  }
  componentDidMount() {
    this.props.fetchALLUser();
  }
  editUserHandler(user, index) {
    this.props.editUser(user, index);
  }
  render() {
    const { users } = this.props;
    const { datas, errMsg } = users;
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
            <Table.Cell>用户角色</Table.Cell>
            <Table.Cell>手机号码</Table.Cell>
            <Table.Cell>初始密码</Table.Cell>
            <Table.Cell>渠道号(cpID)</Table.Cell>
            <Table.Cell>JS 方案</Table.Cell>
            <Table.Cell>系数</Table.Cell>
            <Table.Cell>价格</Table.Cell>
            <Table.Cell />
          </Table.Row>
          { datas.map((user, index) => {
            const {
              mobile, username, cpId, initPwd, js, factor, price, userRole,
            } = user;
            const jsMethod = [];
            Object.keys(js).forEach((k) => {
              if (js[k] === 1) jsMethod.push(kWord[k]);
            });
            let userIdentfy = '普通用户';
            userOptions.forEach(({ value, text }) => {
              if (value === userRole) userIdentfy = text;
            });
            return (
              <Table.Row key={user._id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{username}</Table.Cell>
                <Table.Cell>{userIdentfy}</Table.Cell>
                <Table.Cell>{mobile}</Table.Cell>
                <Table.Cell>{initPwd}</Table.Cell>
                <Table.Cell>{cpId}</Table.Cell>
                <Table.Cell>{jsMethod.join('-')}</Table.Cell>
                <Table.Cell>{factor}</Table.Cell>
                <Table.Cell>{price}</Table.Cell>
                <Table.Cell textAlign="right">
                  <Button icon="edit" onClick={() => this.editUserHandler(user, index)} />
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
  users: PropTypes.object.isRequired,
  fetchALLUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  // completed: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(
  mapStateToProps,
  { fetchALLUser },
)(UsersTable);


// export default ALLTable;
