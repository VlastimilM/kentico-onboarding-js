import { connect, Dispatch } from 'react-redux';

import {
  saveItem,
  deleteItem,
  startEditingItem,
  stopEditingItem,
  updateItemText,
} from '../actions/actionCreators';
import { ListItem } from '../components/ListItem';
import { memoizedItemViewModelConstructor } from '../models/ItemViewModel';
import { IState } from '../reducers/appReducer';


interface IListItemContainerProps {
  id: string;
  text: string;
  index: number;
}

// TODO dispatch type
const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IListItemContainerProps) => {
  return {
    onSave: (text: string) => dispatch(saveItem(ownProps.id, text)),
    onDelete: () => dispatch(deleteItem(ownProps.id)),
    onUpdate: (text: string) => dispatch(updateItemText(ownProps.id, text)),
    onCancel: () => dispatch(stopEditingItem(ownProps.id)),
    onEdit: () => dispatch(startEditingItem(ownProps.id)),
  };
};

const mapStateToProps = (state: IState, ownProps: IListItemContainerProps) => {
  const item = state.items.itemsByIds.get(ownProps.id);
  return {
    item: memoizedItemViewModelConstructor(item.id, item.textShown, ownProps.index, item.isEditing),
  };
};

const listItemContainer = connect(mapStateToProps, mapDispatchToProps)(ListItem);

export { listItemContainer as ListItem };
