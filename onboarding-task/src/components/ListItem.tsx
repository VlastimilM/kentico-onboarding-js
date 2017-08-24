import * as React from 'react';
import * as PropTypes from 'prop-types';

import { UnpostedListItem } from './UnpostedListItem';
import { InsertedListItem } from './InsertedListItem';
import { EditedListItem } from './EditedListItem';
import { IItemViewModel } from '../models/ItemViewModel';

export interface IListItemDataProps {
  item: IItemViewModel;
}

export interface IListItemCallbacksProps {
  onSave: (text: string) => void;
  onDelete: () => void;
  onUpdate: (text: string) => void;
  onCancel: () => void;
  onEdit: () => void;
}

export const ListItem: React.StatelessComponent<IListItemDataProps & IListItemCallbacksProps> = ({
  item,
  onSave,
  onDelete,
  onUpdate,
  onCancel,
  onEdit
}) => {
  if (!item.isPosted) {
    return (
      <div className="list-group-item disabled">
        <UnpostedListItem
          item={item}
        />
      </div>
    );
  }
  if (item.isEditing) {
    return (
      <div className="list-group-item">
        <EditedListItem
          item={item}
          onSave={onSave}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onCancel={onCancel}
        />
      </div>
    );
  }

  return (
    <div className="list-group-item">
      <InsertedListItem
        item={item}
        onEdit={onEdit}
      />
    </div>

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
