import { connect } from 'react-redux';

import { List } from '../components/List';

const mapStateToProps = (state) => {
  return {
    orderedIds: state.items.orderedIds,
  };
};

const listContainer = connect(mapStateToProps)(List);

export { listContainer as List };
