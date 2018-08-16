import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Segment, Menu, Button, Table, Modal, Input, Grid } from 'semantic-ui-react';
import {
  getEditListActon,
  toEditDataActon,
} from '../actions/editData';


class EditData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      openModal: false,
      current: {
        cpId: '',
        count: '',
      },
    };
  }

  componentDidMount() {
    this.props.getEditListActon();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listData: nextProps.listData,
    });
  }

  handleModal = () => {
    this.setState({
      openModal: false,
      current: {
        cpId: '',
        count: '',
      },
    });
  }

  save = () => {
    this.props.toEditDataActon(this.state.current, () => {
      this.handleModal();
    });
  }

  update = () => {
    this.props.toEditDataActon({
      cpId: this.state.current.cpId,
      count: this.state.current.count,
      id: this.state.current._id,
    }, () => {
      this.handleModal();
    });
  }

  edit = (item) => {
    this.setState({
      openModal: true,
      current: item,
    });
  }

  renderEditTabel() {
    return (
      <Table selectable style={{ border: 'none' }}>
        <Table.Body>
          <Table.Row>
            <Table.Cell>#</Table.Cell>
            <Table.Cell>cpId</Table.Cell>
            <Table.Cell>数量</Table.Cell>
            <Table.Cell>时间</Table.Cell>
          </Table.Row>
          {this.state.listData.map((item, index) => (
            <Table.Row key={item._id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{item.cpId}</Table.Cell>
              <Table.Cell>{item.count}</Table.Cell>
              <Table.Cell>{item.hourTime
                && new Date(item.hourTime).toLocaleString('chinese', { hour12: false })}
              </Table.Cell>
              <Table.Cell textAlign="right">
                <Button icon="edit" onClick={() => this.edit(item)} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }

  renderModel() {
    const {
      _id = '',
      cpId = '',
      count = '',
      hourTime = '',
    } = this.state.current;
    return (
      <Modal open={this.state.openModal} onClose={() => { this.handleModal(); }}>
        <Modal.Header>{_id ? '编辑' : '新增'}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column>
                  <Input
                    label="cpId"
                    placeholder="请输入cpId"
                    value={cpId || ''}
                    onChange={e => this.setState({
                      current: {
                        ...this.state.current,
                        cpId: e.target.value,
                      },
                    })}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Input
                    label="数量"
                    placeholder="请输入数量"
                    value={count || ''}
                    onChange={e => this.setState({
                      current: {
                        ...this.state.current,
                        count: e.target.value,
                      },
                    })}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Input
                    label="时间"
                    placeholder="格式：2018-06-07 17:00:00"
                    value={(hourTime && new Date(hourTime).toLocaleString('chinese', { hour12: false })) || ''}
                    onChange={e => this.setState({
                      current: {
                        ...this.state.current,
                        hourTime: e.target.value,
                      },
                    })}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          {/* {_id &&
          <Button negative onClick={this.delete}>
            删除
          </Button>} */}
          <Button primary onClick={this.update}>
            保存
          </Button>
          <Button onClick={this.handleModal}>
            取消
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  render() {
    const {
      cpId = '',
      count = '',
      time = '',
    } = this.state.current;
    return (
      <Container style={{ marginTop: '7em' }}>
        <Segment>
          <Menu>
            <Menu.Item as="h4" header>
              <Input
                label="cpId"
                placeholder="cpId"
                value={cpId || ''}
                onChange={e => this.setState({
                  current: {
                    ...this.state.current,
                    cpId: e.target.value,
                  },
                })}
              />
            </Menu.Item>
            <Menu.Item as="h4" header>
              <Input
                label="数量"
                placeholder="请输入数量"
                value={count || ''}
                onChange={e => this.setState({
                  current: {
                    ...this.state.current,
                    count: e.target.value,
                  },
                })}
              />
            </Menu.Item>
            <Menu.Item as="h4" header>
              <Input
                label="时间"
                placeholder="格式：2018-06-07 17:00:00"
                value={time || ''}
                onChange={e => this.setState({
                  current: {
                    ...this.state.current,
                    time: e.target.value,
                  },
                })}
              />
            </Menu.Item>
            <Menu.Item as="h4" header>
              <Button
                primary
                onClick={() => {
                  this.save();
                }}
              >
                添加
              </Button>
            </Menu.Item>
            {/* <Menu.Menu position="right">
              <Menu.Item>
                <Button primary onClick={()=>{
                  this.setState({
                    openModal:true
                  })
                }}>
                  添加
                </Button>
              </Menu.Item>
            </Menu.Menu> */}
          </Menu>
          {this.renderEditTabel()}
        </Segment>
        {this.renderModel()}
      </Container>
    );
  }
}

EditData.propTypes = {
  listData: PropTypes.array.isRequired,
  getEditListActon: PropTypes.func.isRequired,
  toEditDataActon: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  listData: state.editDataList.datas,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getEditListActon,
  toEditDataActon,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditData);
