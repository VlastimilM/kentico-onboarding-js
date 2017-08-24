import { connect } from 'react-redux';

import {
  List,
  IListDataProps,
  IListCallbacksProps,
} from '../components/List';
import {
  fetchItems,
  deleteError,
} from '../actions/actionCreators';
import { IStore } from '../reducers/appReducer';

const mapStateToProps = (state: IStore): IListDataProps => ({
  orderedIds: state.items.orderedIds,
  errors: state.items.errors,
  isFetching: state.items.isFetching,
  fetchingFailed: state.items.fetchingFailed,
});

const mapDispatchToProps = (dispatch: Dispatch): IListCallbacksProps => ({
  fetchItems: () => dispatch(fetchItems()),
  onErrorDismiss: (errorId: string) => dispatch(deleteError(errorId)),
});

const listContainer: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(List);

export { listContainer as List };
