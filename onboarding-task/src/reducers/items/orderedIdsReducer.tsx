import * as Immutable from 'immutable';

import {
  ITEM_DELETED,
  ITEM_ADDED
} from '../../actions/actionTypes';
import { IAction } from '../../actions/actionCreators';

export interface IOrderedIds extends Immutable.List<string> {}

// TODO return type of reducer
export function orderedIdsReducer(orderedIds: IOrderedIds = Immutable.List<string>(), action: IAction) {
  switch (action.type) {
    case ITEM_DELETED:
      return orderedIds.filter(x => x !== action.payload.id);
    case ITEM_ADDED:
      return orderedIds.push(action.payload.id);
    default:
      return orderedIds;
  }
}
