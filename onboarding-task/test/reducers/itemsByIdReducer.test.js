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
import { unknownAction } from '../actions/helperActions';

describe('itemsByIdReducer', () => {
  const defaultItem = new Item({
    id: '5',
    isEditing: false,
    textSaved: 'text',
    textShown: 'text',
  });
  const defaultItems = Immutable.Map().set('5', defaultItem);

  // TODO new keyword?
  it('returns correct initial state', () => {
    const expectedItems = new Immutable.Map();
    expect(itemsByIdReducer(undefined, unknownAction)).toEqual(expectedItems);
  });

  it('does not modify itemsById on unknown action', () => {
    expect(itemsByIdReducer(defaultItems, unknownAction)).toEqual(defaultItems);
  });

  it('adds item correctly', () => {
    const action = postItemRequestFactory(() => '5')('text');
    const emptyItems = Immutable.Map();

    expect(itemsByIdReducer(emptyItems, action)).toEqual(defaultItems);
  });

  it('deletes item correctly', () => {
    const action = deleteItem('5');
    const expectedItems = defaultItems.delete('5');

    expect(itemsByIdReducer(defaultItems, action)).toEqual(expectedItems);
  });

  it('saves item correctly', () => {
    const action = saveItem('5', 'newText');
    const expectedItem = new Item({
      id: '5',
      isEditing: false,
      textSaved: 'newText',
      textShown: 'newText',
    });
    const expectedItems = defaultItems.set('5', expectedItem);

    expect(itemsByIdReducer(defaultItems, action)).toEqual(expectedItems);
  });

  it('starts editing item correctly', () => {
    const action = startEditingItem('5');
    const expectedItem = defaultItem.set('isEditing', true);
    const expectedItems = defaultItems.set('5', expectedItem);

    expect(itemsByIdReducer(defaultItems, action)).toEqual(expectedItems);
  });

  it('stops editing item correctly', () => {
    const action = stopEditingItem('5');
    const editingItem = defaultItem.set('isEditing', true);
    const itemsWithEditingItem = defaultItems.set('5', editingItem);

    expect(itemsByIdReducer(itemsWithEditingItem, action)).toEqual(defaultItems);
  });

  it('updates item text correctly', () => {
    const action = updateItemText('5', 'newText');
    const expectedItem = defaultItem.set('textShown', 'newText');
    const expectedItems = defaultItems.set('5', expectedItem);

    expect(itemsByIdReducer(defaultItems, action)).toEqual(expectedItems);
  });

  // TODO use defaultItems
  it('returns fetched items correctly', () => {
    const items = [
      {
        id: '5',
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

  // TODO extract item, used in another test
  it('updates item id on post item success', () => {
    const item = {
      id: '10',
      text: 'text',
    };
    // TODO 5 = defaultItemId
    const action = receiveItem(item, '5');
    const expectedItems = defaultItems
      .set('10', defaultItem.withValues({ id: '10' }))
      .delete('5');
    expect(itemsByIdReducer(defaultItems, action)).toEqual(expectedItems);
  });

});
