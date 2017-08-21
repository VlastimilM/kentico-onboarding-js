import * as Immutable from 'immutable';

import {
  ITEM_DELETED,
  FETCH_ITEMS_SUCCESS,
  // ITEM_ADDED,
  POST_ITEM_REQUEST,
  POST_ITEM_SUCCESS,
} from '../../actions/actionTypes';
import { IAction } from '../../actions/IAction';
import { Item } from '../../models/Item';

export type OrderedIds = Immutable.List<string>;

export function orderedIdsReducer(orderedIds: OrderedIds = Immutable.List<string>(), action: IAction): OrderedIds {
  switch (action.type) {
    case FETCH_ITEMS_SUCCESS:
      action.payload.items.map((item: Item) => orderedIds = orderedIds.push(item.id));
      return orderedIds;

    case ITEM_DELETED:
      return orderedIds.filter(x => x !== action.payload.id).toList();

    case POST_ITEM_REQUEST:
      // case ITEM_ADDED:
      return orderedIds.push(action.payload.id);

    case POST_ITEM_SUCCESS:
      const index = orderedIds.indexOf(action.payload.frontendId);
      return orderedIds.set(index, action.payload.id);

    default:
      return orderedIds;
  }
}
