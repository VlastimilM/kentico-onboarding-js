import * as React from 'react';
import * as PropTypes from 'prop-types';

import { CreateItemForm } from '../containers/CreateItemFormContainer';
import { ListItem } from '../containers/ListItemContainer';
import { OrderedIds } from '../reducers/items/orderedIdsReducer';

require('../spinner.css');

export interface IListDataProps {
  orderedIds: OrderedIds;
  isFetching: boolean;
}

export interface IListCallbacksProps {
  onMount: () => void;
}

export class List extends React.PureComponent<IListDataProps & IListCallbacksProps, {}> {
  static displayName = 'List';

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
      content = <img className="spinner" src="spinner.gif" />;
    } else {
      content =
        <div className="list-group">
          {listItems}
          <div className="list-group-item">
            <CreateItemForm />
          </div>
        </div>;
    }

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          {content}
        </div>
      </div>
    );
  }
}
;
