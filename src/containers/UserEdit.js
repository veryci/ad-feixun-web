import React from 'react';
import { Modal, Button, Input, Checkbox, Grid, Select, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { editUser, delUser } from '../actions/user';
import { userOptions } from '../utils';

class UserEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        ...props.user,
      },
    };
    this.saveUser = this.saveUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: { ...nextProps.user },
    });
  }

  saveUser() {
    const { user } = this.state;
    this.props.editUser(user, () => {
      this.props.close();
    });
  }

  deleteUser() {
    const { user } = this.state;
    this.props.delUser(user, () => {
      this.props.close();
    });
  }

  render() {
    const { open, close } = this.props;
    const {
      _id = '', mobile = '', username = '', userRole = 'normal', factor = 100, js = { r: 0, e: 0, f: 0 },
    } = this.state.user;
    return (
      <Modal open={open} onClose={() => close()}>
        <Modal.Header>{_id ? '编辑用户' : '新增用户' }</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Grid columns={1} divided>
              <Grid.Row>
                <Grid.Column>
                  <Input
                    label="手机"
                    placeholder="手机号"
                    value={mobile || ''}
                    onChange={e => this.setState({
                      user: {
                        ...this.state.user,
                        mobile: e.target.value,
                      },
                    })}
                  />
                  <Input
                    label="用户"
                    placeholder="用户名"
                    value={username}
                    onChange={e => this.setState({
                      user: {
                        ...this.state.user,
                        username: e.target.value,
                      },
                    })}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Input
                    label="系数"
                    placeholder="100"
                    value={factor}
                    onChange={e => this.setState({
                      user: {
                        ...this.state.user,
                        factor: e.target.value,
                      },
                    })}
                  />
                  <div className="ui labeled input">
                    <Label>角色</Label>
                    <Select
                      options={userOptions}
                      value={userRole}
                      onChange={(e, data) => this.setState({
                        user: {
                          ...this.state.user,
                          userRole: data.value,
                        },
                      })}
                    />
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div>JS 方案:</div>
                  <Checkbox
                    label="替换"
                    checked={js.r === 1}
                    onClick={() => this.setState({
                      user: {
                        ...this.state.user,
                        js: {
                          ...this.state.user.js,
                          r: js.r === 1 ? 0 : 1,
                        },
                      },
                    })}
                  /><br />
                  <Checkbox
                    label="挤入"
                    checked={js.e === 1}
                    onClick={() => this.setState({
                      user: {
                        ...this.state.user,
                        js: {
                          ...this.state.user.js,
                          e: js.e === 1 ? 0 : 1,
                        },
                      },
                    })}
                  /><br />
                  <Checkbox
                    label="feelso"
                    checked={js.f === 1}
                    onClick={() => this.setState({
                      user: {
                        ...this.state.user,
                        js: {
                          ...this.state.user.js,
                          f: js.f === 1 ? 0 : 1,
                        },
                      },
                    })}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.deleteUser}>
            删除用户
          </Button>
          <Button primary onClick={this.saveUser}>
            保存
          </Button>
          {/* <Button onClick={close}>
            取消
          </Button> */}
        </Modal.Actions>
      </Modal>
    );
  }
}

UserEditor.propTypes = {
  open: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  delUser: PropTypes.func.isRequired,
};

// export default UserEditor;
export default connect(
  null,
  { editUser, delUser },
)(UserEditor);
