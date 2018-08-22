import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Segment, Grid, Header } from 'semantic-ui-react';

const DatePicker = ({ datas }) => {
  const countStyle = { fontSize: '2em' };
  const { flow, active, online } = datas;
  return (
    <Fragment>
      <Container style={{ marginTop: '4em' }}>
        <Grid columns={3} divided>
          <Grid.Row stretched>
            <Grid.Column>
              <Header as="h3">
                流量
                <Header.Subheader>
                  单位（个）
                </Header.Subheader>
              </Header>
              <Segment.Group>
                <Segment color="blue">今天:<p style={countStyle}>{flow && flow.today.toLocaleString('zh-Hans-CN')}</p></Segment>
                <Segment>该段时间内:<p style={countStyle}>{flow && flow.totalNum.toLocaleString('zh-Hans-CN')}</p></Segment>
              </Segment.Group>
            </Grid.Column>
            <Grid.Column>
              <Header as="h3">
                日活
                <Header.Subheader>
                  单位（台）
                </Header.Subheader>
              </Header>
              <Segment.Group>
                <Segment color="green">今天:<p style={countStyle}>{active && active.today.toLocaleString('zh-Hans-CN')}</p></Segment>
                <Segment>该段时间内:<p style={countStyle}>{active && active.totalNum.toLocaleString('zh-Hans-CN')}</p></Segment>
              </Segment.Group>
            </Grid.Column>
            <Grid.Column>
              <Header as="h3">
                在线
                <Header.Subheader>
                  单位（台）
                </Header.Subheader>
              </Header>
              <Segment.Group>
                <Segment color="orange">今天:<p style={countStyle}>{online && online.today.toLocaleString('zh-Hans-CN')}</p></Segment>
                <Segment>该段时间内:<p style={countStyle}>{online && online.totalNum.toLocaleString('zh-Hans-CN')}</p></Segment>
              </Segment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Fragment>
  );
};

DatePicker.propTypes = {
  datas: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  datas: state.dailyActive.datas,
});


export default connect(mapStateToProps)(DatePicker);
