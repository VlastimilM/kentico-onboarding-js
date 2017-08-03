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
  // FETCH_ITEMS_FAILURE,
  // REQUEST_ITEMS,
  RECEIVE_ITEM,
} from './actionTypes';
import { generateGuid } from '../utils/guidGenerator';
import { addItemFactory } from './actionCreatorsFactory';
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
  payload: {}
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

export const fetchItems = (): any => {
  return (dispatch: Dispatch) => {
    dispatch(requestItems());
    fetch('http://localhost:50458/api/v1/ListItems/')
      .then((response: any) => response.json(), (error: any) => console.log('error occured: ', error))
      .then((json: any) => {
        dispatch(receiveItems(json));
      });
  };
};


export const receiveItem = (item: any): any => {
  // TODO
  return { type: RECEIVE_ITEM, payload: item };
};

export const postItem = (text: string): any => {
  return (dispatch: Dispatch) => {
    // dispatch(requestAddItem());
    console.log('Trying to post ' + JSON.stringify({ text }));
    fetch('http://localhost:50458/api/v1/ListItems/',
      {
        method: 'POST',
        headers: new Headers(
          {
            'Content-Type': 'application/json',
          }),
        body: JSON.stringify({ text })
      })
      .then((response: any) => console.log(response.json()), (error: any) => console.log('error occured:', error))
      .then((response: any) => dispatch(receiveItem(response)));
  };
};

