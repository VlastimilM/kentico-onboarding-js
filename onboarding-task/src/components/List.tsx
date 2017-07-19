import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { CreateItemForm } from '../containers/CreateItemFormContainer';
import { ListItem } from '../containers/ListItemContainer';

export const List = (props) => {
  const listItems = props.orderedIds.map((id, index) => {
    return (
      <ListGroupItem key={id}>
        <ListItem
          id={id}
          index={index}
        />
      </ListGroupItem>
    );
  });

  return (
    <div className="row">
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <ListGroup>
          {listItems}
          <ListGroupItem>
            <CreateItemForm />
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};

List.propTypes = {
  orderedIds: PropTypes.object.isRequired,
};

List.displayName = 'List';

