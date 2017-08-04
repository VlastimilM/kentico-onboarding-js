import * as Immutable from 'immutable';

import {
  ITEM_SAVED,
  ITEM_DELETED,
  START_EDITING_ITEM,
  STOP_EDITING_ITEM,
  UPDATE_ITEM_TEXT,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  POST_ITEM_SUCCESS,
  FETCH_ITEMS_FAILURE,
  POST_ITEM_REQUEST,
  POST_ITEM_FAILURE,
} from './actionTypes';
import { generateGuid } from '../utils/guidGenerator';
import { addItemFactory } from './addItemFactory';
import { IAction } from './IAction';
import { Item } from '../models/Item';

export const addItem = addItemFactory(generateGuid);

export const saveItem = (id: string, text: string): IAction => ({
    type: ITEM_SAVED,
    payload: {
      id,
      text,
    },
  }
);

export const deleteItem = (id: string): IAction => ({
    type: ITEM_DELETED,
    payload: {
      id,
    },
  }
);

export const startEditingItem = (id: string): IAction => ({
    type: START_EDITING_ITEM,
    payload: {
      id,
    },
  }
);

export const stopEditingItem = (id: string): IAction => ({
    type: STOP_EDITING_ITEM,
    payload: {
      id,
    },
  }
);

export const updateItemText = (id: string, text: string): IAction => ({
    type: UPDATE_ITEM_TEXT,
    payload: {
      id,
      text,
    },
  }
);

export const requestItems = (): IAction => ({
  type: FETCH_ITEMS_REQUEST,
});

export const receiveItems = (json: any): IAction => {
  let fetchedItems = Immutable.Map<string, Item>();
  json.map((item: any) => {
    let newItem = new Item().withValues({ id: item.id, textShown: item.text, textSaved: item.text, isEditing: false });
    fetchedItems = fetchedItems.set(item.id, newItem);
  });
  return {
    type: FETCH_ITEMS_SUCCESS,
    payload: {
      items: fetchedItems,
    }
  };
};

export const failItemsFetch = (): IAction => ({
  type: FETCH_ITEMS_FAILURE
});

export const requestPostItem = (): IAction => {
  return { type: POST_ITEM_REQUEST };
};

export const receiveItem = (json: any): IAction => {
  return {
    type: POST_ITEM_SUCCESS,
    payload: {
      id: json.id,
      text: json.text,
    }
  };
};

export const failPostItem = (): IAction => {
  return { type: POST_ITEM_FAILURE };
};

