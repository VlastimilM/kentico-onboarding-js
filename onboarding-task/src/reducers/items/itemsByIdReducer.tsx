import * as Immutable from 'immutable';

import { itemReducer } from './itemReducer';
import {
  ITEM_ADDED,
  ITEM_DELETED,
  ITEM_SAVED,
  START_EDITING_ITEM,
  STOP_EDITING_ITEM,
  UPDATE_ITEM_TEXT
} from '../../actions/actionTypes';
import { IAction } from '../../actions/actionCreators';
import { Item } from '../../models/Item';

export interface IItemsById extends Immutable.Map<string, Item> {}

export function itemsByIdReducer(itemsById: IItemsById = Immutable.Map<string, Item>(), action: IAction): IItemsById {
  switch (action.type) {

    case ITEM_ADDED:
      return itemsById.set(
        action.payload.id,
        new Item({
          id: action.payload.id,
          textSaved: action.payload.text,
          textShown: action.payload.text,
          isEditing: false,
        })
      );

    case ITEM_DELETED:
      return itemsById.delete(action.payload.id);

    case ITEM_SAVED:
    case START_EDITING_ITEM:
    case STOP_EDITING_ITEM:
    case UPDATE_ITEM_TEXT: {
      const originalItem: Item = itemsById.get(action.payload.id);
      const updatedItem: Item = itemReducer(originalItem, action);
      return itemsById.set(action.payload.id, updatedItem);
    }

    default:
      return itemsById;
  }
}
