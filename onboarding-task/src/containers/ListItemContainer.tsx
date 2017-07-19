import { connect } from 'react-redux';

import {
  saveItem,
  deleteItem,
  startEditingItem,
  stopEditingItem,
  updateItemText,
} from '../actions/actionCreators.tsx';
import { ListItem } from '../components/ListItem';
import { memoizedItemViewModelConstructor } from '../models/ItemViewModel.tsx';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSave: (text) => dispatch(saveItem(ownProps.id, text)),
    onDelete: () => dispatch(deleteItem(ownProps.id)),
    onUpdate: (text) => dispatch(updateItemText(ownProps.id, text)),
    onCancel: () => dispatch(stopEditingItem(ownProps.id)),
    onEdit: () => dispatch(startEditingItem(ownProps.id)),
  };
};

const mapStateToProps = (state, ownProps) => {
  const item = state.items.itemsByIds.get(ownProps.id);
  return {
    item: memoizedItemViewModelConstructor(item.id, item.textShown, ownProps.index, item.isEditing),
  };
};

const listItemContainer = connect(mapStateToProps, mapDispatchToProps)(ListItem);

export { listItemContainer as ListItem };
