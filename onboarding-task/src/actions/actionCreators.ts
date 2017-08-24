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
} from '../constants/actionTypes';
import { IAction } from './IAction';
import { Item } from '../models/Item';
import { ServerItem } from '../models/ServerItem';
import { generateGuid } from '../utils/guidGenerator';
import {
  postItemFactory,
  IPostItemFactoryDependencies,
} from './internal/postItemFactory';
import { postItemFailFactory } from './internal/postItemFailFactory';
import { postItemRequestFactory } from './internal/postItemRequestFactory';
import { postItemOperationFactory } from '../repositories/itemsRepository/postItemOperationFactory';
import {
  fetchItemsFactory,
  IFetchItemsFactoryDependencies,
} from './internal/fetchItemsFactory';
import { fetchItemsFailFactory } from './internal/fetchItemsFailFactory';
import { getItemsOperationFactory } from '../repositories/itemsRepository/getItemsOperationFactory';

const postItemRequest = postItemRequestFactory(generateGuid);

const postItemFail = postItemFailFactory(generateGuid);

const postItemDependencies: IPostItemFactoryDependencies = {
  postItemOperation: postItemOperationFactory(fetch),
  postItemRequestActionCreator: postItemRequest,
  postItemFailActionCreator: postItemFail,
};

const fetchItemsFail = fetchItemsFailFactory(generateGuid);

const fetchItemsDependencies: IFetchItemsFactoryDependencies = {
  getItemsOperation: getItemsOperationFactory(fetch),
  fetchItemsFailActionCreator: fetchItemsFail,
};

export const postItem = postItemFactory(postItemDependencies);

export const fetchItems = fetchItemsFactory(fetchItemsDependencies);

export const deleteError = (errorId: string): IAction => ({
    type: DELETE_ERROR_MESSAGE,
    payload: {
      errorId,
    }
  }
);

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
  }
);

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
