import React from 'react';
import { Modal, Button, Input, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { editVCCP, addVCCP } from '../actions/vccp';
// import { userOptions } from '../utils';

class VCCPEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vccp: {
        ...props.vccp,
      },
    };
    this.editVCCP = this.editVCCP.bind(this);
    this.addVCCP = this.addVCCP.bind(this);
    // this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      vccp: { ...nextProps.vccp },
    });
  }

  editVCCP() {
    const { vccp } = this.state;
    this.props.editVCCP(vccp, () => {
      this.props.close();
    });
  }

  addVCCP() {
    const { vccp } = this.state;
    this.props.addVCCP(vccp, () => {
      this.props.close();
    });
  }

  // deleteUser() {
  //   const { user } = this.state;
  //   this.props.delUser(user, () => {
  //     this.props.close();
  //   });
  // }

  render() {
    const { open, close } = this.props;
    const {
      _id = '', vcMac = '', cpId = '',
    } = this.state.vccp;
    return (
      <Modal open={open} onClose={() => close()}>
        <Modal.Header>{_id ? '编辑设备' : '新增设置' }</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Grid columns={3} divided>
              <Grid.Row>
                <Grid.Column>
                  <Input
                    label="用户渠道号"
                    placeholder=""
                    value={cpId}
                    onChange={e => this.setState({
                      vccp: {
                        ...this.state.vccp,
                        cpId: e.target.value,
                      },
                    })}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Input
                    label="MAC地址"
                    placeholder=""
                    value={vcMac}
                    onChange={e => this.setState({
                      vccp: {
                        ...this.state.vccp,
                        vcMac: e.target.value,
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
            删除设备
          </Button>
          {_id ?
            <Button primary onClick={this.editVCCP}>
              保存
            </Button> :
            <Button primary onClick={this.addVCCP}>
              新增
            </Button> }
        </Modal.Actions>
      </Modal>
    );
  }
}

VCCPEditor.propTypes = {
  open: PropTypes.bool.isRequired,
  vccp: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  editVCCP: PropTypes.func.isRequired,
  addVCCP: PropTypes.func.isRequired,
  // delUser: PropTypes.func.isRequired,
};

// export default UserEditor;
export default connect(
  null,
  { editVCCP, addVCCP },
)(VCCPEditor);
