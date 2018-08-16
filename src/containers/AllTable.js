import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Table, Dimmer, Loader, Image, Segment, Button, Label,
  // Checkbox, Dropdown,
} from 'semantic-ui-react';

import ListRow from '../components/ListRow';
import { fetchALL } from '../actions';

class ALLTable extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const { all } = this.props;
    const { datas = [] } = all;
    if (datas.length === 0) {
      this.props.fetchALL();
    }
  }
  render() {
    const { all } = this.props;
    const { datas = [], errMsg } = all;
    if (errMsg) {
      return <div>{errMsg}</div>;
    }
    if (all.isFetching) {
      return (
        <Segment basic>
          <Dimmer active inverted>
            <Loader inverted content="Loading" />
          </Dimmer>
          <Image src="/images/short-paragraph.png" />
          <Image src="/images/short-paragraph.png" />
          {/* <Image src="/images/short-paragraph.png" /> */}
        </Segment>
      );
    }
    return (
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="right">#</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">广告宽（divW）</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">广告高（divH）</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">数量</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { datas.map(({ data, date }, index) => (
            <React.Fragment key={date}>
              <Table.Row>
                <Table.Cell disabled>
                  <Label color="orange" ribbon>{moment(date).format('YYYY-MM-DD')}</Label>
                  <Label color="blue">总量：12</Label>
                </Table.Cell>
              </Table.Row>
              {data.map((item) => {
                const id = `${item._id.divW}-${item._id.divH}`;
                return (
                  <ListRow key={id} {...{ item, index }} />
                );
              })}
            </React.Fragment>
          ))}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell textAlign="center" colSpan="4">
              <Button primary size="small">
                加载更多
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}


ALLTable.propTypes = {
  user: PropTypes.object.isRequired,
  all: PropTypes.object.isRequired,
  fetchALL: PropTypes.func.isRequired,
  // completed: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  all: state.all,
});

export default connect(
  mapStateToProps,
  { fetchALL },
)(ALLTable);


// export default ALLTable;
