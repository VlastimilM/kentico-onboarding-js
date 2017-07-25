import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IItemViewModel } from '../models/ItemViewModel';

interface IInsertedListItemDataProps {
  item: IItemViewModel;
}

interface IInsertedListItemCallbacksProps {
  onEdit: () => void;
}

export const InsertedListItem: React.StatelessComponent<IInsertedListItemDataProps & IInsertedListItemCallbacksProps> = ({ onEdit, item }) => (
  <div>
    <span onClick={onEdit}>{item.index + 1}. {item.text}</span>
  </div>
);


InsertedListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};

InsertedListItem.displayName = 'InsertedListItem';
