import * as React from 'react';
import * as PropTypes from 'prop-types';

import { CreateItemForm } from '../containers/CreateItemFormContainer';
import { ListItem } from '../containers/ListItemContainer';
import { OrderedIds } from '../reducers/items/orderedIdsReducer';
import { Errors } from '../reducers/items/errorsReducer';


require('../spinner.css');

export interface IListDataProps {
  orderedIds: OrderedIds;
  isFetching: boolean;
  fetchingFailed: boolean;
  errors: Errors;
}

export interface IListCallbacksProps {
  onMount: () => void;
  onErrorDismiss: (errorId: string) => void;
}

export class List extends React.PureComponent<IListDataProps & IListCallbacksProps, {}> {
  static displayName = 'List';

  // TODO fetching data proptyles
  static propTypes = {
    orderedIds: PropTypes.object.isRequired,
    onMount: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const listItems = this.props.orderedIds.map((id: string, index: number) => (
      <div className="list-group-item" key={id}>
        <ListItem
          id={id}
          index={index}
        />
      </div>
    ));

    let content = null;
    if (this.props.isFetching) {
      content =
        <div>
          <img className="spinner" src="spinner.gif" />
        </div>;
    } else {
      content =
        <div className="list-group">
          {listItems}
          <div className="list-group-item">
            <CreateItemForm />
          </div>
        </div>;
    }

    let errorMessages = null;
    // TODO remove this if?
    if (this.props.fetchingFailed) {
      errorMessages = this.props.errors.map((error: any) =>
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
    }
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          {content}
          {errorMessages}
        </div>
      </div>
    );
  }
}
;
