import { combineReducers } from 'redux';

import { itemsReducer } from './items/itemsReducer';
import { IItems } from './items/itemsReducer';

export const app = combineReducers<IStore>({
  items: itemsReducer,
});

export interface IStore {
  items: IItems;
}
