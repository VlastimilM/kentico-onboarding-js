import { connect } from 'react-redux';

import { List, IListDataProps, IListCallbacksProps } from '../components/List';
import { IStore } from '../reducers/appReducer';
import { fetchItems } from '../actions/actionCreators';

const mapStateToProps = (state: IStore): IListDataProps => ({
  orderedIds: state.items.orderedIds,
  isFetching: state.items.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch): IListCallbacksProps => ({
  onMount: () => dispatch(fetchItems()),
});

const listContainer: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(List);

export { listContainer as List };
