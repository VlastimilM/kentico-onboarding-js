import { connect } from 'react-redux';

import { ErrorsList, IErrorsDataProps, IErrorsCallbacksProps } from '../components/ErrorsList';
import { IStore } from '../reducers/appReducer';
import { deleteError } from '../actions/actionCreators/actionCreators';

const mapStateToProps = (state: IStore): IErrorsDataProps => ({
  errors: state.items.errors,
});

const mapDispatchToProps = (dispatch: Dispatch): IErrorsCallbacksProps => ({
  onErrorDismiss: (errorId: string) => dispatch(deleteError(errorId)),
});

const errorsListContainer: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(ErrorsList);

export { errorsListContainer as ErrorsList };
