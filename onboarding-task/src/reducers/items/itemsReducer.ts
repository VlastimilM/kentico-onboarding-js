import { combineReducers } from 'redux';

import {
  orderedIdsReducer,
  OrderedIds,
} from './orderedIdsReducer';
import {
  itemsByIdReducer,
  ItemsById,
} from './itemsByIdReducer';
import { isFetchingReducer } from './isFetchingReducer';
import {
  Errors,
  errorsReducer,
} from './errorsReducer';

export const itemsReducer = combineReducers<IItems>({
  itemsByIds: itemsByIdReducer,
  orderedIds: orderedIdsReducer,
  isFetching: isFetchingReducer,
  errors: errorsReducer,
});

export interface IItems {
  itemsByIds: ItemsById;
  orderedIds: OrderedIds;
  isFetching: boolean;
  errors: Errors;
}
