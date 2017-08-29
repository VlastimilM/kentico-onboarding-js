import { connect } from 'react-redux';

import {
  ErrorAlert,
  IErrorAlertCallbacksProps,
  IErrorAlertDataProps,
} from '../components/ErrorAlert';
import { deleteError } from '../actions/actionCreators';
import { Error } from '../models/Error';

interface IErrorAlertOwnProps {
  error: Error;
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IErrorAlertOwnProps): IErrorAlertCallbacksProps => ({
  onErrorDismiss: () => dispatch(deleteError(ownProps.error.errorId)),
});

const errorAlertContainer: React.ComponentClass<IErrorAlertOwnProps> =
  connect<IErrorAlertDataProps, IErrorAlertCallbacksProps, IErrorAlertOwnProps>(undefined, mapDispatchToProps)(ErrorAlert);

export { errorAlertContainer as ErrorAlert };
