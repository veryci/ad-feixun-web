import React, { Component, Fragment } from 'react';
import { Container, Segment, Grid, Header } from 'semantic-ui-react';

class DatePicker extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  render() {
    const countStyle = { fontSize: '2em' };
    const num = 13265;
    return (
      <Fragment>
        <Container style={{ marginTop: '4em' }}>
          <Grid columns={3} divided>
            <Grid.Row stretched>
              <Grid.Column>
                <Header as="h3">
                  流量
                  <Header.Subheader>
                    可使用数量（个）
                  </Header.Subheader>
                </Header>
                <Segment.Group>
                  <Segment color="blue">今天<p style={countStyle}>{num.toLocaleString('zh-Hans-CN')}</p></Segment>
                  <Segment>十天<p style={countStyle}>{num.toLocaleString('zh-Hans-CN')}</p></Segment>
                </Segment.Group>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">
                  日活
                  <Header.Subheader>
                    使用的数量（个）
                  </Header.Subheader>
                </Header>
                <Segment.Group>
                  <Segment color="green">今天<p style={countStyle}>{num.toLocaleString('zh-Hans-CN')}</p></Segment>
                  <Segment>十天<p style={countStyle}>{num.toLocaleString('zh-Hans-CN')}</p></Segment>
                </Segment.Group>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">
                  在线
                  <Header.Subheader>
                    没有使用数量（个）
                  </Header.Subheader>
                </Header>
                <Segment.Group>
                  <Segment color="orange">今天<p style={countStyle}>{num.toLocaleString('zh-Hans-CN')}</p></Segment>
                  <Segment>十天<p style={countStyle}>{num.toLocaleString('zh-Hans-CN')}</p></Segment>
                </Segment.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

export default DatePicker;
