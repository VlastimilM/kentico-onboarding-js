import { Map as ImmutableMap } from 'immutable';

import { Item } from '../../src/models/Item.ts';
import { itemsByIdReducer } from '../../src/reducers/items/itemsByIdReducer.ts';
import {
  saveItem,
  deleteItem,
  startEditingItem,
  stopEditingItem,
  updateItemText,
} from '../../src/actions/actionCreators.ts';
import { addItemFactory } from '../../src/actions/actionCreatorsFactory.ts';
import { unknownAction } from '../actions/helperActions';

describe('itemsByIdReducer', () => {
  const defaultItem = new Item({
    id: '5',
    isEditing: false,
    textSaved: 'text',
    textShown: 'text'
  });
  const defaultItems = ImmutableMap().set('5', defaultItem);

  it('returns correct initial state', () => {
    const expectedItems = new ImmutableMap();
    expect(itemsByIdReducer(undefined, unknownAction)).toEqual(expectedItems);
  });

  it('does not modify itemsById on unknown action', () => {
    expect(itemsByIdReducer(defaultItems, unknownAction)).toEqual(defaultItems);
  });

  it('adds item correctly', () => {
    const action = addItemFactory(() => '5')('text');
    const emptyItems = ImmutableMap();

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
      textShown: 'newText'
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
});
