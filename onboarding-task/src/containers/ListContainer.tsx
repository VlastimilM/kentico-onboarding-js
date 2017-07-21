import { connect } from 'react-redux';

import { List } from '../components/List';
import { IStore } from '../reducers/appReducer';

const mapStateToProps = (state: IStore) => {
  return {
    orderedIds: state.items.orderedIds,
  };
};

const listContainer = connect(mapStateToProps)(List);

export { listContainer as List };
