import { connect } from 'react-redux';

import {
  saveItem,
  deleteItem,
  startEditingItem,
  stopEditingItem,
  updateItemText,
} from '../actions/actionCreators';
import {
  ListItem,
  IListItemCallbacksProps,
  IListItemDataProps,
} from '../components/ListItem';
import { memoizedItemViewModelConstructor } from '../models/ItemViewModel';
import { IStore } from '../reducers/appReducer';

interface IListItemContainerOwnProps {
  id: string;
  index: number;
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IListItemContainerOwnProps): IListItemCallbacksProps => ({
  onSave: (text: string) => dispatch(saveItem(ownProps.id, text)),
  onDelete: () => dispatch(deleteItem(ownProps.id)),
  onUpdate: (text: string) => dispatch(updateItemText(ownProps.id, text)),
  onCancel: () => dispatch(stopEditingItem(ownProps.id)),
  onEdit: () => dispatch(startEditingItem(ownProps.id)),
});

const mapStateToProps = (state: IStore, ownProps: IListItemContainerOwnProps): IListItemDataProps => {
  const item = state.items.itemsByIds.get(ownProps.id);
  return {
    item: memoizedItemViewModelConstructor(item, ownProps.index)
  };
};

const listItemContainer: React.ComponentClass<IListItemContainerOwnProps> = connect(mapStateToProps, mapDispatchToProps)(ListItem);

export { listItemContainer as ListItem };
