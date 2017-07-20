import * as Immutable from 'immutable';

import { actionTypes } from '../../actions/actionTypes';
import { IAction } from '../../actions/actionCreators';

export interface IOrderedIds extends Immutable.List<string> {}

// TODO return type of reducer
export function orderedIdsReducer(orderedIds: IOrderedIds = Immutable.List<string>(), action: IAction) {
  switch (action.type) {
    case actionTypes.ITEM_DELETED:
      return orderedIds.filter(x => x !== action.payload.id);
    case actionTypes.ITEM_ADDED:
      return orderedIds.push(action.payload.id);
    default:
      return orderedIds;
  }
}
