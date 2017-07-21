import { combineReducers } from 'redux';

import { itemsReducer } from './items/itemsReducer';
import { IItems } from './items/itemsReducer';

export const app = combineReducers({
  items: itemsReducer,
});

// TODO consistent interfaces
export interface IStore {
  items: IItems;
}
