import React from 'react';
import PropTypes from 'prop-types';

import { InsertedListItem } from './InsertedListItem';
import { EditedListItem } from './EditedListItem';

export const ListItem = (props) => {
  if (props.item.isEditing) {
    return (
      <EditedListItem
        item={props.item}
        onSave={props.onSave}
        onDelete={props.onDelete}
        onUpdate={props.onUpdate}
        onCancel={props.onCancel}
        onEdit={props.onEdit}
      />
    );
  }

  return (
    <InsertedListItem
      item={props.item}
      onEdit={props.onEdit}
    />
  );
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

ListItem.displayName = 'ListItem';
