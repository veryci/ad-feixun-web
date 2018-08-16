import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import {
  Container, Segment, Menu, Button,
  // Dimmer, Loader, Image, Segment,
  // Radio
} from 'semantic-ui-react';

import VCCPEdit from './VCCPEdit';
import VCCPTable from './VCCPTable';

export default class VCCP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      modalVCCP: {},
    };
    this.handleAddVCCP = this.handleAddVCCP.bind(this);
    this.handleEditVCCP = this.handleEditVCCP.bind(this);
  }
  componentDidMount() {
  }
  handleAddVCCP() {
    this.setState({
      openModal: true,
    });
  }
  handleEditVCCP(vccp) {
    this.setState({
      openModal: true,
      modalVCCP: vccp,
    });
  }

  render() {
    const { openModal, modalVCCP } = this.state;
    return (
      <Container style={{ marginTop: '7em' }}>
        <VCCPEdit
          open={openModal}
          vccp={modalVCCP}
          close={() => this.setState({ openModal: false, modalVCCP: {} })}
        />
        <Segment>
          <Menu>
            <Menu.Item as="h4" header>
              VC 设备设置
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item>
                <Button primary onClick={this.handleAddVCCP}>
                  添加VC设备
                </Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          <VCCPTable editVCCP={this.handleEditVCCP} />
        </Segment>
      </Container>
    );
  }
}

