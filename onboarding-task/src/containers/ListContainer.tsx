import { connect } from 'react-redux';

import { List, IListDataProps, IListCallbacksProps } from '../components/List';
import { IStore } from '../reducers/appReducer';
import { fetchItems, deleteError } from '../actions/actionCreators/actionCreators';

const mapStateToProps = (state: IStore): IListDataProps => ({
  orderedIds: state.items.orderedIds,
  isFetching: state.items.isFetching,
  fetchingFailed: state.items.fetchingFailed,
  errors: state.items.errors,
});

// TODO onMount -> fetchItems ?
const mapDispatchToProps = (dispatch: Dispatch): IListCallbacksProps => ({
  onMount: () => dispatch(fetchItems()),
  onErrorDismiss: (errorId: string) => dispatch(deleteError(errorId)),
});

const listContainer: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(List);

export { listContainer as List };
