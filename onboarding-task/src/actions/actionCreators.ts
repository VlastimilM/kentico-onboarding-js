import * as fetch from 'isomorphic-fetch';
import * as Immutable from 'immutable';

import {
  ITEM_SAVED,
  ITEM_DELETED,
  START_EDITING_ITEM,
  STOP_EDITING_ITEM,
  UPDATE_ITEM_TEXT,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  POST_ITEM_SUCCESS, FETCH_ITEMS_FAILURE, POST_ITEM_REQUEST, POST_ITEM_FAILURE,
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

// TODO optional functionality
const failItemsFetch = () => ({
  type: FETCH_ITEMS_FAILURE
});

// TODO extract route
const MAIN_ROUTE = '/api/v1/ListItems/';

// TODO DI
export const fetchItems = (): any => {
  return (dispatch: Dispatch) => {
    dispatch(requestItems());

    let options = { method: 'GET' };
    fetch(MAIN_ROUTE, options)
      .then(
        (response: any) => response.json(),
        (error: any) => {
          throw new Error(error);
        })
      .then(
        (json: any) => dispatch(receiveItems(json)),
        () => dispatch(failItemsFetch())
      );
  };
};

export const receiveItem = (json: any): any => {
  return {
    type: POST_ITEM_SUCCESS,
    payload: {
      id: json.id,
      text: json.text,
    }
  };
};

export const requestPostItem = (): any => {
  return { type: POST_ITEM_REQUEST };
};

export const failPostItem = (): any => {
  return { type: POST_ITEM_FAILURE };
};

export const postItem = (text: string): any => {
  return (dispatch: Dispatch) => {
    let header = new Headers({
      'Content-Type': 'application/json',
    });
    dispatch(requestPostItem());

    fetch('/api/v1/ListItems/', {
      method: 'POST',
      headers: header,
      body: JSON.stringify({ text })
    })
      .then((response: any) => response.json(), (error: any) => {
        throw new Error(error);
      })
      .then((json: any) => dispatch(receiveItem(json)), () => dispatch(failPostItem()));
  };
};

