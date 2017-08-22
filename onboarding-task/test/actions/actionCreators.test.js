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
} from '../../src/actions/actionCreators.ts';
import { Item } from '../../src/models/Item.ts';
import { postItemRequestFactory } from '../../src/actions/addItemFactory.ts';
import { failItemsFetchFactory } from '../../src/actions/failItemsFetchFactory.ts';
import { failPostItemFactory } from '../../src/actions/failPostItemFactory.ts';
import {
  ITEM_ADDED,
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
  REMOVE_ERROR_MESSAGE,
} from '../../src/actions/actionTypes.ts';

describe('Action Creators', () => {
  const failItemsFetch = failItemsFetchFactory(() => '5');

  const itemText = 'awawa';
  const itemId = '5';
  const firstItemData = {
    id: itemId,
    text: itemText,
  };
  const firstItem = new Item().withValues({
    id: itemId,
    textSaved: itemText,
    textShown: itemText,
    isEditing: false,
  });

  // TODO delete
  // it('create ITEM_ADDED action correctly', () => {
  //   expect(addItemFactory(() => '5')('testText')).toEqual({
  //     type: ITEM_ADDED,
  //     payload: {
  //       text: 'testText',
  //       id: '5',
  //     },
  //   });
  // });

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
    expect(failItemsFetch()).toEqual({
      type: FETCH_ITEMS_FAILURE,
      payload: {
        errorId: '5',
      },
    });
  });

  it('create FETCH_ITEMS_REQUEST action correctly with no items', () => {
    const items = [];
    expect(receiveItems(items)).toEqual({
      type: FETCH_ITEMS_SUCCESS,
      payload: {
        items: Immutable.Map(),
        orderedIds: Immutable.List(),
      },
    });
  });

  // TODO multiple items, refactor variables to be clear
  it('create FETCH_ITEMS_REQUEST action correctly with item', () => {
    const items = [firstItemData];
    const expectedItems = Immutable.Map().set(itemId, firstItem);
    const expecedOrderedIds = Immutable.List().push(itemId);
    expect(receiveItems(items)).toEqual({
      type: FETCH_ITEMS_SUCCESS,
      payload: {
        items: expectedItems,
        orderedIds: expecedOrderedIds,
      },
    });
  });

  it('create POST_ITEM_REQUEST action correctly', () => {
    const requestPostItem = postItemRequestFactory(() => '5');
    expect(requestPostItem('randomText')).toEqual({
      type: POST_ITEM_REQUEST,
      payload: {
        text: 'randomText',
        id: '5',
      },
    });
  });

  it('create POST_ITEM_SUCCESS action correctly', () => {
    expect(receiveItem(firstItemData)).toEqual({
      type: POST_ITEM_SUCCESS,
      payload: {
        id: firstItemData.id,
        text: firstItemData.text,
      },
    });
  });

  it('create POST_ITEM_FAILURE action correctly', () => {
    expect(failPostItemFactory(() => '5')()).toEqual({
      type: POST_ITEM_FAILURE,
      payload: {
        errorId: '5',
      },
    });
  });

  it('create REMOVE_ERROR_MESSAGE action correctly', () => {
    expect(deleteError('5')).toEqual({
      type: REMOVE_ERROR_MESSAGE,
      payload: {
        errorId: '5',
      },
    });
  });
});
