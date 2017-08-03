import { combineReducers } from 'redux';

import { orderedIdsReducer, OrderedIds } from './orderedIdsReducer';
import { itemsByIdReducer, ItemsById } from './itemsByIdReducer';
import { isFetchingReducer } from './isFetchingReducer';

export const itemsReducer = combineReducers<IItems>({
  itemsByIds: itemsByIdReducer,
  orderedIds: orderedIdsReducer,
  isFetching: isFetchingReducer,
});

export interface IItems {
  itemsByIds: ItemsById;
  orderedIds: OrderedIds;
  isFetching: boolean;
}
