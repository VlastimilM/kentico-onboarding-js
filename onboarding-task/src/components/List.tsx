import * as React from 'react';
import * as PropTypes from 'prop-types';

import { CreateItemForm } from '../containers/CreateItemFormContainer';
import { ListItem } from '../containers/ListItemContainer';
import { OrderedIds } from '../reducers/items/orderedIdsReducer';

export interface IListDataProps {
  orderedIds: OrderedIds;
}

export const List: React.StatelessComponent<IListDataProps> = ({ orderedIds }) => {
  const listItems = orderedIds.map((id: string, index: number) => {
    return (
      <a className="list-group-item" key={id}>
        <ListItem
          id={id}
          index={index}
        />
      </a>
    );
  });

  return (
    <div className="row">
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <div className="list-group">
          {listItems}
          <a className="list-group-item">
            <CreateItemForm />
          </a>
        </div>
      </div>
    </div>
  );
};

List.propTypes = {
  orderedIds: PropTypes.object.isRequired,
};

List.displayName = 'List';

