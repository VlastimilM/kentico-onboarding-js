import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as Immutable from 'immutable';

import { Error } from '../models/Error';

export interface IErrorsDataProps {
  errors: Immutable.List<Error>;
}

export interface IErrorsCallbacksProps {
  onErrorDismiss: (errorId: string) => void;
}

export const ErrorsList: React.StatelessComponent<IErrorsDataProps & IErrorsCallbacksProps> = () => {
  const errorMessages = this.props.errors.map((error: Error) =>
    (
      <div className="alert alert-danger alert-dismissible" role="alert" key={error.errorId}>
        <button type="button"
                className="close"
                aria-label="Close"
                onClick={() =>  this.props.onErrorDismiss(error.errorId)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        {error.message}
      </div>
    )
  );
  return (
    <div>
      {errorMessages}
    </div>
  );
};

ErrorsList.displayName = 'Errors';

ErrorsList.propTypes = {
  errors: PropTypes.object.isRequired,
};



