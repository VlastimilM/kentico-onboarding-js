import { combineReducers } from 'redux';

import { orderedIdsReducer, IOrderedIds } from './orderedIdsReducer';
import { itemsByIdReducer, IItemsById } from './itemsByIdReducer';

export const itemsReducer = combineReducers({
  itemsByIds: itemsByIdReducer,
  orderedIds: orderedIdsReducer,
});

export interface IItems {
  orderedIds: IOrderedIds;
  itemsByIds: IItemsById;
}
