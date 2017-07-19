import { combineReducers } from 'redux';

import { orderedIdsReducer } from './orderedIdsReducer';
import { itemsByIdReducer } from './itemsByIdReducer';

export const itemsReducer = combineReducers({
  itemsByIds: itemsByIdReducer,
  orderedIds: orderedIdsReducer,
});
