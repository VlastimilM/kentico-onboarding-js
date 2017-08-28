import { connect } from 'react-redux';

import {
  ErrorAlert,
  IErrorAlertCallbacksProps,
  IErrorAlertDataProps,
} from '../components/ErrorsList';
import { deleteError } from '../actions/actionCreators';
import { IStore } from '../reducers/appReducer';
import { Error } from '../models/Error';

interface IErrorAlertOwnProps {
  id: string;
}

const mapStateToProps = (state: IStore, ownProps: IErrorAlertOwnProps): IErrorAlertDataProps => ({
  error: state.items.errors.find((error: Error) => error.errorId === ownProps.id),
});

const mapDispatchToProps = (dispatch: Dispatch): IErrorAlertCallbacksProps => ({
  onErrorDismiss: (errorId: string) => dispatch(deleteError(errorId)),
});

const errorAlertContainer: React.ComponentClass<IErrorAlertOwnProps> = connect(mapStateToProps, mapDispatchToProps)(ErrorAlert);

export { errorAlertContainer as ErrorAlert };
