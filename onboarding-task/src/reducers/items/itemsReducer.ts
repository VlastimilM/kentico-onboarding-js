import { combineReducers } from 'redux';

import { orderedIdsReducer, OrderedIds } from './orderedIdsReducer';
import { itemsByIdReducer, ItemsById } from './itemsByIdReducer';

export const itemsReducer = combineReducers<IItems>({
  itemsByIds: itemsByIdReducer,
  orderedIds: orderedIdsReducer,
});

export interface IItems {
  itemsByIds: ItemsById;
  orderedIds: OrderedIds;
}
