import { connect, Dispatch } from 'react-redux';

import {
  saveItem,
  deleteItem,
  startEditingItem,
  stopEditingItem,
  updateItemText,
} from '../actions/actionCreators';

import { ListItem } from '../components/ListItem';
import { memoizedItemViewModelConstructor, IItemViewModel } from '../models/ItemViewModel';
import { IStore } from '../reducers/appReducer';

export interface IListItemContainerProps {
  id: string;
  index: number;
}

// TODO rename
export interface IListItemState {
  item: IItemViewModel;
}

// TODO rename
export interface IListItemDispatch {
  onSave: (text: string) => void;
  onDelete: () => void;
  onUpdate: (text: string) => void;
  onCancel: () => void;
  onEdit: () => void;
}

// TODO dispatch type
const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IListItemContainerProps): IListItemDispatch => {
  return {
    onSave: (text: string) => dispatch(saveItem(ownProps.id, text)),
    onDelete: () => dispatch(deleteItem(ownProps.id)),
    onUpdate: (text: string) => dispatch(updateItemText(ownProps.id, text)),
    onCancel: () => dispatch(stopEditingItem(ownProps.id)),
    onEdit: () => dispatch(startEditingItem(ownProps.id)),
  };
};

const mapStateToProps = (state: IStore, ownProps: IListItemContainerProps): IListItemState => {
  const item = state.items.itemsByIds.get(ownProps.id);
  return {
    item: memoizedItemViewModelConstructor(item.id, item.textShown, ownProps.index, item.isEditing),
  };
};

const listItemContainer: React.ComponentClass<IListItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(ListItem);

export { listItemContainer as ListItem };
