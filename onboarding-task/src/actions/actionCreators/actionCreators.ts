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
  DELETE_ERROR_MESSAGE,
} from '../actionTypes';
import { generateGuid } from '../../utils/guidGenerator';
import { postItemRequestFactory } from './internal/postItemRequestFactory';
import { IAction } from '../IAction';
import { Item } from '../../models/Item';
import { postItemFactory } from './internal/postItemFactory';
import { fetchItemsFactory } from './internal/fetchItemsFactory';
import { failItemsFetchFactory } from './internal/failItemsFetchFactory';
import { failPostItemFactory } from './internal/failPostItemFactory';

// TODO extract
interface ServerItem {
  id: string;
  text: string;
}
type ServerItems = Immutable.List<ServerItem>;


const failItemsFetch = failItemsFetchFactory(generateGuid);

const requestPostItem = postItemRequestFactory(generateGuid);

const failPostItem = failPostItemFactory(generateGuid);

export const postItem = postItemFactory(fetch, requestPostItem, failPostItem);

export const fetchItems = fetchItemsFactory(fetch, failItemsFetch);

export const deleteError = (errorId: string): IAction => ({
  type: DELETE_ERROR_MESSAGE,
  payload: {
    errorId,
  }
});

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

export const receiveItems = (json: ServerItems): IAction => {
  let fetchedItems = Immutable.Map<string, Item>();
  let fetchedItemsOrderedIds = Immutable.List<string>();
  json.map((item: ServerItem) => {
    let newItem = new Item().withValues({ id: item.id, textShown: item.text, textSaved: item.text, isEditing: false });
    fetchedItems = fetchedItems.set(newItem.id, newItem);
    fetchedItemsOrderedIds = fetchedItemsOrderedIds.push(newItem.id);
  });
  return {
    type: FETCH_ITEMS_SUCCESS,
    payload: {
      items: fetchedItems,
      orderedIds: fetchedItemsOrderedIds,
    }
  };
};

// TODO refactor args
export const receiveItem = (json: ServerItem, frontendId: string): IAction => {
  return {
    type: POST_ITEM_SUCCESS,
    payload: {
      id: json.id,
      text: json.text,
      frontendId,
    }
  };
};
