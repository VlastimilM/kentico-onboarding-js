import * as Immutable from 'immutable';

import {
  ITEM_DELETED,
  ITEM_ADDED, FETCH_ITEMS_SUCCESS
} from '../../actions/actionTypes';
import { IAction } from '../../actions/IAction';

export type OrderedIds = Immutable.List<string>;

export function orderedIdsReducer(orderedIds: OrderedIds = Immutable.List<string>(), action: IAction): OrderedIds {
  switch (action.type) {
    case FETCH_ITEMS_SUCCESS:
      action.payload.items.map((item: any) => orderedIds = orderedIds.push(item.id));
      return orderedIds;

    case ITEM_DELETED:
      return orderedIds.filter(x => x !== action.payload.id).toList();
    case ITEM_ADDED:
      return orderedIds.push(action.payload.id);
    default:
      return orderedIds;
  }
}
