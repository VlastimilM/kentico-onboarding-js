import { combineReducers } from 'redux';

import { orderedIdsReducer, OrderedIds } from './orderedIdsReducer';
import { itemsByIdReducer, ItemsById } from './itemsByIdReducer';
import { isFetchingReducer } from './isFetchingReducer';
import { fetchingFailedReducer } from './fetchingFailedReducer';
import { errorReducer } from './errorReducer';
import { IError } from '../../models/Error';

export const itemsReducer = combineReducers<IItems>({
  itemsByIds: itemsByIdReducer,
  orderedIds: orderedIdsReducer,
  isFetching: isFetchingReducer,
  fetchingFailed: fetchingFailedReducer,
  error: errorReducer,
});

export interface IItems {
  itemsByIds: ItemsById;
  orderedIds: OrderedIds;
  isFetching: boolean;
  fetchingFailed: boolean;
  error: IError;
}
