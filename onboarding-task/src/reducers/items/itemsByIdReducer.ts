import * as Immutable from 'immutable';

import { itemReducer } from './itemReducer';
import {
  ITEM_DELETED,
  ITEM_SAVED,
  START_EDITING_ITEM,
  STOP_EDITING_ITEM,
  UPDATE_ITEM_TEXT,
  POST_ITEM_SUCCESS,
  FETCH_ITEMS_SUCCESS,
  // ITEM_ADDED,
  POST_ITEM_REQUEST,
} from '../../actions/actionTypes';
import { IAction } from '../../actions/IAction';
import { Item } from '../../models/Item';

export type ItemsById = Immutable.Map<string, Item>;

export function itemsByIdReducer(itemsById: ItemsById = Immutable.Map<string, Item>(), action: IAction): ItemsById {
  switch (action.type) {
    case FETCH_ITEMS_SUCCESS:
      return action.payload.items;

    case POST_ITEM_REQUEST:
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

    // TODO refactor so it doesnt look like fukushima
    case POST_ITEM_SUCCESS:
      console.log(action.payload.frontendId);
      console.log(action.payload.id);
      let temp = itemsById.mapKeys(key => {
        if (key === action.payload.frontendId) {
          return action.payload.id;
        }
        return key;
      });
      const mapWithUpdatedKey = Immutable.Map(temp);
      const oldItem = mapWithUpdatedKey.get(action.payload.id);
      return mapWithUpdatedKey.set(action.payload.id, oldItem.withValues({ id: action.payload.id }));


    case ITEM_DELETED:
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
