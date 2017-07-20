import * as Immutable from 'immutable';

import { itemReducer } from './itemReducer';
import { actionTypes } from '../../actions/actionTypes';
import { IAction } from '../../actions/actionCreators';
import { Item } from '../../models/Item';

export interface IItemsById extends Immutable.Map<string, Item> {}

export function itemsByIdReducer(itemsById: IItemsById = Immutable.Map<string, Item>(), action: IAction): IItemsById {
  switch (action.type) {

    case actionTypes.ITEM_ADDED:
      return itemsById.set(
        action.payload.id,
        new Item({
          id: action.payload.id,
          textSaved: action.payload.text,
          textShown: action.payload.text,
          isEditing: false,
        })
      );

    case actionTypes.ITEM_DELETED:
      return itemsById.delete(action.payload.id);

    case actionTypes.ITEM_SAVED:
    case actionTypes.START_EDITING_ITEM:
    case actionTypes.STOP_EDITING_ITEM:
    case actionTypes.UPDATE_ITEM_TEXT: {
      const originalItem: Item = itemsById.get(action.payload.id);
      const updatedItem: Item = itemReducer(originalItem, action);
      return itemsById.set(action.payload.id, updatedItem);
    }

    default:
      return itemsById;
  }
}
