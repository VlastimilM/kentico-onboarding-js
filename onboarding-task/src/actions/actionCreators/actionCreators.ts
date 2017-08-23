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
import { fetchItemsFailFactory } from './internal/fetchItemsFailFactory';
import { postItemFailFactory } from './internal/postItemFailFactory';
import { ServerItem } from '../../models/ServerItem';

const fetchItemsFail = fetchItemsFailFactory(generateGuid);

const postItemRequest = postItemRequestFactory(generateGuid);

const postItemFail = postItemFailFactory(generateGuid);

export const postItem = postItemFactory(fetch, postItemRequest, postItemFail);

export const fetchItems = fetchItemsFactory(fetch, fetchItemsFail);

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

export const receiveItems = (json: Array<ServerItem>): IAction => {
  const items = json.map((item: ServerItem) =>
    new Item().withValues({
      id: item.id,
      textShown: item.text,
      textSaved: item.text,
      isEditing: false,
    })
  );

  const fetchedItems = items.reduce((accu, item) => accu.set(item.id, item), Immutable.Map<string, Item>());
  const fetchedItemsOrderedIds = Immutable.List<string>(items.map(item => item.id));

  return {
    type: FETCH_ITEMS_SUCCESS,
    payload: {
      items: fetchedItems,
      orderedIds: fetchedItemsOrderedIds,
    }
  };
};

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
