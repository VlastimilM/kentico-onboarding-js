import * as React from 'react';
import * as PropTypes from 'prop-types';

import { CreateItemForm } from '../containers/CreateItemFormContainer';
import { ListItem } from '../containers/ListItemContainer';
import { OrderedIds } from '../reducers/items/orderedIdsReducer';
import { IError } from '../models/Error';

require('../spinner.css');
//require('../../node_modules/bootstrap/js/alert');

export interface IListDataProps {
  orderedIds: OrderedIds;
  isFetching: boolean;
  fetchingFailed: boolean;
  error: IError;
}

export interface IListCallbacksProps {
  onMount: () => void;
}

export class List extends React.PureComponent<IListDataProps & IListCallbacksProps, {}> {
  static displayName = 'List';

  // TODO fetching data proptyles
  static propTypes = {
    orderedIds: PropTypes.object.isRequired,
    onMount: PropTypes.func.isRequired,
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

    // TODO dismissable error messages
    let errorMessage = null;
    if (this.props.fetchingFailed) {
      errorMessage =
        <div className="alert alert-danger alert-dismissible" role="alert">
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          {this.props.error.message}
        </div>;
    }

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          {content}
          {errorMessage}
        </div>
      </div>
    );
  }
}
;
