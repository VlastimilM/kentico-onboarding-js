import * as React from 'react';
import * as PropTypes from 'prop-types';

import { CreateItemForm } from '../containers/CreateItemFormContainer';
import { ListItem } from '../containers/ListItemContainer';
import { ErrorsList } from '../containers/ErrorsListContainer';
import { OrderedIds } from '../reducers/items/orderedIdsReducer';
import { Errors } from '../reducers/items/errorsReducer';
import { Spinner } from './Spinner';
require('../spinner.css');

export interface IListDataProps {
  orderedIds: OrderedIds;
  errors: Errors;
  isFetching: boolean;
  fetchingFailed: boolean;
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
        <div className="list-group-item" key={id}>
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

  render() {
    const content = this.getContent();
    const errors = this.props.fetchingFailed ? <ErrorsList /> : null;

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

