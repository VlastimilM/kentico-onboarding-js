import { combineReducers } from 'redux';

import { orderedIdsReducer, OrderedIds } from './orderedIdsReducer';
import { itemsByIdReducer, ItemsById } from './itemsByIdReducer';
import { isFetchingReducer } from './isFetchingReducer';
import { fetchingFailedReducer } from './fetchingFailedReducer';
import { Errors, errorsReducer } from './errorsReducer';

export const itemsReducer = combineReducers<IItems>({
  itemsByIds: itemsByIdReducer,
  orderedIds: orderedIdsReducer,
  isFetching: isFetchingReducer,
  fetchingFailed: fetchingFailedReducer,
  errors: errorsReducer,
});

export interface IItems {
  itemsByIds: ItemsById;
  orderedIds: OrderedIds;
  isFetching: boolean;
  fetchingFailed: boolean;
  errors: Errors;
}
