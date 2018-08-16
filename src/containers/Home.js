import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Container, Segment, Table,
  // Grid, Header, Label,
  // Label, Card,
  // Radio,
} from 'semantic-ui-react';
// import {
//   XAxis, YAxis, Tooltip, CartesianGrid,
//   Line, LineChart, Legend, ResponsiveContainer,
// } from 'recharts';

import { dataAction } from '../actions';

const { REACT_APP_VERSION } = process.env;

class Home extends React.Component {
  componentDidMount() {
    this.props.dataAction();
  }
  render() {
    const { data = {}, user } = this.props;
    const { all, datas = [] } = data;
    return (
      <React.Fragment>
        <Container style={{ marginTop: '7em' }}>
          总计：{all}
          <Table celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="right">#</Table.HeaderCell>
                { user.accountType > 64 ? <Table.HeaderCell textAlign="right">渠道</Table.HeaderCell> : null}
                <Table.HeaderCell textAlign="right">日期</Table.HeaderCell>
                <Table.HeaderCell textAlign="right">数量/M</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                datas.map((item, index) => {
                  const { _id, count } = item;
                  const { date, cpId } = _id;
                  return (
                    <Table.Row key={`${date}-${cpId}`}>
                      <Table.Cell textAlign="right">{index + 1}</Table.Cell>
                      { user.accountType > 64 ? <Table.Cell textAlign="right">{cpId}</Table.Cell> : null}
                      <Table.Cell textAlign="right">{moment(date).format('YYYY-MM-DD')}</Table.Cell>
                      <Table.Cell textAlign="right">{count / 1000}</Table.Cell>
                    </Table.Row>
                  );
                })
              }
            </Table.Body>
          </Table>
        </Container>
        <Segment vertical style={{ padding: '5em 0em' }}>
          <Container textAlign="right" >
            {`version:${REACT_APP_VERSION}`}
          </Container>
        </Segment>
      </React.Fragment>
    );
  }
}
Home.propTypes = {
  dataAction: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  data: state.data,
  user: state.user,
});

// export default withRouter(Home);
export default connect(mapStateToProps, { dataAction })(Home);

