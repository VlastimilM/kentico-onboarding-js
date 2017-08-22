import Immutable from 'immutable';

import { orderedIdsReducer } from '../../src/reducers/items/orderedIdsReducer.ts';
import {
  deleteItem,
  receiveItem,
  receiveItems,
} from '../../src/actions/actionCreators/actionCreators.ts';
import { postItemRequestFactory } from '../../src/actions/actionCreators/internal/postItemRequestFactory.ts';
import { unknownAction } from '../actions/helperActions';

describe('orderedIdsReducer', () => {
  const firstId = '2';
  const secondId = '6';
  const thirdId = '4';
  const defaultOrderedIds = Immutable.List().push(firstId, secondId, thirdId);

  it('returns correct initial state', () => {
    const expectedIds = new Immutable.List();
    expect(orderedIdsReducer(undefined, unknownAction)).toEqual(expectedIds);
  });

  it('does not modify Ids on unknown action', () => {
    expect(orderedIdsReducer(defaultOrderedIds, unknownAction)).toEqual(defaultOrderedIds);
  });

  it('deletes item id correctly', () => {
    const action = deleteItem(secondId);
    const expectedIds = defaultOrderedIds.delete(1);

    expect(orderedIdsReducer(defaultOrderedIds, action)).toEqual(expectedIds);
  });

  it('adds temporary item id correctly', () => {
    const action = postItemRequestFactory(() => '5')('text');
    const expectedIds = defaultOrderedIds.push('5');

    expect(orderedIdsReducer(defaultOrderedIds, action)).toEqual(expectedIds);
  });

  it('updates item id on post item success correctly', () => {
    const receivedItemJson = {
      id: '10',
      text: 'text',
    };
    const action = receiveItem(receivedItemJson, firstId);
    const index = defaultOrderedIds.indexOf(firstId);
    const expectedIds = defaultOrderedIds.set(index, '10');

    expect(orderedIdsReducer(defaultOrderedIds, action)).toEqual(expectedIds);
  });

  it('adds ids of fetched items correctly', () => {
    const receivedItemsJson = [
      {
        text: 'a',
        id: firstId,
      },
      {
        text: 'b',
        id: secondId,
      },
      {
        text: 'c',
        id: thirdId,
      },
    ];
    const action = receiveItems(receivedItemsJson);
    const emptyItems = Immutable.List();

    expect(orderedIdsReducer(emptyItems, action)).toEqual(defaultOrderedIds);
  });
});

