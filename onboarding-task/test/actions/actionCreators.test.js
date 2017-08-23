import Immutable from 'immutable';

import {
  saveItem,
  deleteItem,
  startEditingItem,
  stopEditingItem,
  updateItemText,
  requestItems,
  receiveItems,
  receiveItem,
  deleteError,
} from '../../src/actions/actionCreators/actionCreators.ts';
import { Item } from '../../src/models/Item.ts';
import { postItemRequestFactory } from '../../src/actions/actionCreators/internal/postItemRequestFactory.ts';
import { fetchItemsFailFactory } from '../../src/actions/actionCreators/internal/failItemsFetchFactory.ts';
import { postItemFailFactory } from '../../src/actions/actionCreators/internal/failPostItemFactory.ts';
import {
  ITEM_SAVED,
  ITEM_DELETED,
  START_EDITING_ITEM,
  STOP_EDITING_ITEM,
  UPDATE_ITEM_TEXT,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_FAILURE,
  FETCH_ITEMS_SUCCESS,
  POST_ITEM_REQUEST,
  POST_ITEM_SUCCESS,
  POST_ITEM_FAILURE,
  DELETE_ERROR_MESSAGE,
} from '../../src/actions/actionTypes.ts';

describe('Action Creators', () => {
  const itemText = 'awawa';
  const firstItemId = '5';
  const firstItemData = {
    id: firstItemId,
    text: itemText,
  };
  const firstItem = new Item().withValues({
    id: firstItemId,
    textSaved: itemText,
    textShown: itemText,
    isEditing: false,
  });

  it('create ITEM_SAVED action correctly', () => {
    expect(saveItem('5', 'saveText')).toEqual({
      type: ITEM_SAVED,
      payload: {
        id: '5',
        text: 'saveText',
      },
    });
  });

  it('create ITEM_DELETED action correctly', () => {
    expect(deleteItem('5')).toEqual({
      type: ITEM_DELETED,
      payload: {
        id: '5',
      },
    });
  });

  it('create START_EDITING_ITEM action correctly', () => {
    expect(startEditingItem('5')).toEqual({
      type: START_EDITING_ITEM,
      payload: {
        id: '5',
      },
    });
  });

  it('create STOP_EDITING_ITEM action correctly', () => {
    expect(stopEditingItem('5')).toEqual({
      type: STOP_EDITING_ITEM,
      payload: {
        id: '5',
      },
    });
  });

  it('create UPDATE_ITEM_TEXT action correctly', () => {
    expect(updateItemText('5', 'newText')).toEqual({
      type: UPDATE_ITEM_TEXT,
      payload: {
        id: '5',
        text: 'newText',
      },
    });
  });

  it('create FETCH_ITEMS_REQUEST action correctly', () => {
    expect(requestItems()).toEqual({
      type: FETCH_ITEMS_REQUEST,
    });
  });

  it('create FETCH_ITEMS_FAILURE action correctly', () => {
    expect(fetchItemsFailFactory(() => '5')()).toEqual({
      type: FETCH_ITEMS_FAILURE,
      payload: {
        errorId: '5',
      },
    });
  });

  it('create FETCH_ITEMS_REQUEST action correctly with no items', () => {
    const receivedItems = [];

    expect(receiveItems(receivedItems)).toEqual({
      type: FETCH_ITEMS_SUCCESS,
      payload: {
        items: Immutable.Map(),
        orderedIds: Immutable.List(),
      },
    });
  });

  it('create FETCH_ITEMS_REQUEST action correctly with item', () => {
    const receivedItems = [firstItemData];
    const expectedItems = Immutable.Map().set(firstItemId, firstItem);
    const expectedOrderedIds = Immutable.List().push(firstItemId);

    expect(receiveItems(receivedItems)).toEqual({
      type: FETCH_ITEMS_SUCCESS,
      payload: {
        items: expectedItems,
        orderedIds: expectedOrderedIds,
      },
    });
  });

  it('create POST_ITEM_REQUEST action correctly', () => {
    expect(postItemRequestFactory(() => '5')('randomText')).toEqual({
      type: POST_ITEM_REQUEST,
      payload: {
        text: 'randomText',
        id: '5',
      },
    });
  });

  it('create POST_ITEM_SUCCESS action correctly', () => {
    const frontendId = '10';

    expect(receiveItem(firstItemData, frontendId)).toEqual({
      type: POST_ITEM_SUCCESS,
      payload: {
        id: firstItemData.id,
        text: firstItemData.text,
        frontendId,
      },
    });
  });

  it('create POST_ITEM_FAILURE action correctly', () => {
    expect(postItemFailFactory(() => '5')()).toEqual({
      type: POST_ITEM_FAILURE,
      payload: {
        errorId: '5',
      },
    });
  });

  it('create DELETE_ERROR_MESSAGE action correctly', () => {
    expect(deleteError('5')).toEqual({
      type: DELETE_ERROR_MESSAGE,
      payload: {
        errorId: '5',
      },
    });
  });
});
