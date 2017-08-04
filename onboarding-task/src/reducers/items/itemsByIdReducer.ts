import * as Immutable from 'immutable';

import { itemReducer } from './itemReducer';
import {
  // ITEM_ADDED,
  ITEM_DELETED,
  ITEM_SAVED,
  START_EDITING_ITEM,
  STOP_EDITING_ITEM,
  UPDATE_ITEM_TEXT,
  FETCH_ITEMS_SUCCESS, POST_ITEM_SUCCESS,
} from '../../actions/actionTypes';
import { IAction } from '../../actions/IAction';
import { Item } from '../../models/Item';

export type ItemsById = Immutable.Map<string, Item>;

export function itemsByIdReducer(itemsById: ItemsById = Immutable.Map<string, Item>(), action: IAction): ItemsById {
  switch (action.type) {
    case FETCH_ITEMS_SUCCESS:
      return action.payload.items;

    case POST_ITEM_SUCCESS:
      // case ITEM_ADDED:
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
      console.log(itemsById);
      return itemsById.delete(action.payload.id);

    case ITEM_SAVED:
    case START_EDITING_ITEM:
    case STOP_EDITING_ITEM:
    case UPDATE_ITEM_TEXT: {
      const originalItem = itemsById.get(action.payload.id);
      const updatedItem = itemReducer(originalItem, action);
      return itemsById.set(action.payload.id, updatedItem);
    }

    default:
      return itemsById;
  }
}
