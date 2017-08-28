import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Error } from '../models/Error';

export interface IErrorAlertDataProps {
  error: Error;
}
export interface IErrorAlertCallbacksProps {
  onErrorDismiss: (errorId: string) => void;
}
export const ErrorAlert: React.StatelessComponent<IErrorAlertCallbacksProps & IErrorAlertDataProps> = ({ onErrorDismiss, error }) =>
  (
    <div className="alert alert-danger alert-dismissible" role="alert">
      <button type="button"
              className="close"
              aria-label="Close"
              onClick={() =>  onErrorDismiss(error.errorId)}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      {error.message}
    </div>
  );


ErrorAlert.displayName = 'ErrorAlert';

ErrorAlert.propTypes = {
  error: PropTypes.object.isRequired,
};
