import * as React from 'react';
import * as PropTypes from 'prop-types';

import { CreateItemForm } from '../containers/CreateItemFormContainer';
import { ListItem } from '../containers/ListItemContainer';
import { OrderedIds } from '../reducers/items/orderedIdsReducer';
import { Errors } from '../reducers/items/errorsReducer';
import { Error } from '../models/Error';
import { Spinner } from './Spinner';
import { ErrorAlert } from '../containers/ErrorAlertContainer';
require('../spinner.css');

export interface IListDataProps {
  orderedIds: OrderedIds;
  errors: Errors;
  isFetching: boolean;
}

export interface IListCallbacksProps {
  fetchItems: () => void;
  onErrorDismiss: (errorId: string) => void;
}

export class List extends React.PureComponent<IListDataProps & IListCallbacksProps, {}> {
  static displayName = 'List';

  static propTypes = {
    orderedIds: PropTypes.object.isRequired,
    fetchItems: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.fetchItems();
  }

  getContent = () => {
    if (this.props.isFetching) {
      return <Spinner />;
    } else {
      const listItems = this.props.orderedIds.map((id: string, index: number) => (
        <div key={id}>
          <ListItem
            id={id}
            index={index}
          />
        </div>
      ));

      return (
        <div className="list-group">
          {listItems}
          <div className="list-group-item">
            <CreateItemForm />
          </div>
        </div>);
    }
  };

  getErrors = () => {
    const errorListItems = this.props.errors.map((error: Error) => (
      <li key={error.errorId}>
        <ErrorAlert id={error.errorId} />
      </li>
    ));

    return (
      <ul>
        {errorListItems}
      </ul>
    );
  };

  render() {
    const content = this.getContent();
    const errors = this.getErrors();

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          {content}
          {errors}
        </div>
      </div>
    );
  }
}

