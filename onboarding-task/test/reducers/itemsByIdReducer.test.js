import Immutable from 'immutable';

import { Item } from '../../src/models/Item.ts';
import { itemsByIdReducer } from '../../src/reducers/items/itemsByIdReducer.ts';
import {
  saveItem,
  deleteItem,
  startEditingItem,
  stopEditingItem,
  updateItemText,
  receiveItems,
  receiveItem,
} from '../../src/actions/actionCreators/actionCreators.ts';
import { postItemRequestFactory } from '../../src/actions/actionCreators/internal/postItemRequestFactory.ts';
import { unknownAction } from '../actions/helperActions.ts';

describe('itemsByIdReducer', () => {
  const defaultItemId = '5';
  const defaultItem = new Item({
    id: defaultItemId,
    isEditing: false,
    textSaved: 'text',
    textShown: 'text',
  });
  const defaultItems = Immutable.Map().set('5', defaultItem);

  it('returns correct initial state', () => {
    const expectedItems = Immutable.Map();
    expect(itemsByIdReducer(undefined, unknownAction)).toEqual(expectedItems);
  });

  it('does not modify itemsById on unknown action', () => {
    expect(itemsByIdReducer(defaultItems, unknownAction)).toEqual(defaultItems);
  });

  it('adds item correctly', () => {
    const action = postItemRequestFactory(() => defaultItemId)('text');
    const emptyItems = Immutable.Map();

    expect(itemsByIdReducer(emptyItems, action)).toEqual(defaultItems);
  });

  it('deletes item correctly', () => {
    const action = deleteItem(defaultItemId);
    const expectedItems = defaultItems.delete(defaultItemId);

    expect(itemsByIdReducer(defaultItems, action)).toEqual(expectedItems);
  });

  it('saves item correctly', () => {
    const action = saveItem(defaultItemId, 'newText');
    const expectedItem = new Item({
      id: defaultItemId,
      isEditing: false,
      textSaved: 'newText',
      textShown: 'newText',
    });
    const expectedItems = defaultItems.set(defaultItemId, expectedItem);

    expect(itemsByIdReducer(defaultItems, action)).toEqual(expectedItems);
  });

  it('starts editing item correctly', () => {
    const action = startEditingItem(defaultItemId);
    const expectedItem = defaultItem.set('isEditing', true);
    const expectedItems = defaultItems.set(defaultItemId, expectedItem);

    expect(itemsByIdReducer(defaultItems, action)).toEqual(expectedItems);
  });

  it('stops editing item correctly', () => {
    const action = stopEditingItem(defaultItemId);
    const editingItem = defaultItem.set('isEditing', true);
    const itemsWithEditingItem = defaultItems.set(defaultItemId, editingItem);

    expect(itemsByIdReducer(itemsWithEditingItem, action)).toEqual(defaultItems);
  });

  it('updates item text correctly', () => {
    const action = updateItemText(defaultItemId, 'newText');
    const expectedItem = defaultItem.set('textShown', 'newText');
    const expectedItems = defaultItems.set(defaultItemId, expectedItem);

    expect(itemsByIdReducer(defaultItems, action)).toEqual(expectedItems);
  });

  it('returns fetched items correctly', () => {
    const items = [
      {
        id: defaultItemId,
        text: 'text',
      },
    ];
    const action = receiveItems(items);
    const emptyItems = Immutable.Map();

    expect(itemsByIdReducer(emptyItems, action)).toEqual(defaultItems);
  });

  it('adds item with temporary id on post item request correctly', () => {
    const action = postItemRequestFactory(() => '10')('newText');
    const newItem = new Item({
      id: '10',
      isEditing: false,
      textSaved: 'newText',
      textShown: 'newText',
    });
    const expectedItems = defaultItems.set(newItem.id, newItem);

    expect(itemsByIdReducer(defaultItems, action)).toEqual(expectedItems);
  });

  it('updates item id on post item success correctly', () => {
    const item = {
      id: '10',
      text: 'text',
    };
    const action = receiveItem(item, defaultItemId);
    const expectedItems = defaultItems
      .delete(defaultItemId)
      .set('10', defaultItem.withValues({ id: '10' }));

    expect(itemsByIdReducer(defaultItems, action)).toEqual(expectedItems);
  });
});
