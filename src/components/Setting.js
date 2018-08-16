import React from 'react';
import {
  Container, Segment, Menu, Button,
  // Dimmer, Loader, Image,
  // Radio, Segment
} from 'semantic-ui-react';

import UserEditModal from '../containers/UserEdit';
import UserTable from '../containers/UserTable';

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      modalUser: {},
    };
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
  }
  componentDidMount() {
  }
  handleAddUser() {
    this.setState({
      openModal: true,
    });
  }
  handleEditUser(user) {
    this.setState({
      openModal: true,
      modalUser: user,
    });
  }

  render() {
    const { openModal, modalUser } = this.state;
    return (
      <Container style={{ marginTop: '7em' }}>
        <UserEditModal
          open={openModal}
          user={modalUser}
          close={() => this.setState({ openModal: false, modalUser: {} })}
        />
        <Segment>
          <Menu>
            <Menu.Item as="h4" header>
              用户设置
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item>
                <Button primary onClick={this.handleAddUser}>
                  添加用户
                </Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          <UserTable editUser={this.handleEditUser} />
        </Segment>
        {/* <Segment>
          <h4>系统设置</h4>
        </Segment> */}
      </Container>
    );
  }
}

