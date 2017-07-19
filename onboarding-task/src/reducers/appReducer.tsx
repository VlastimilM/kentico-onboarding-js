import { combineReducers } from 'redux';

import { itemsReducer } from './items/itemsReducer';

export const app = combineReducers({
  items: itemsReducer,
});
