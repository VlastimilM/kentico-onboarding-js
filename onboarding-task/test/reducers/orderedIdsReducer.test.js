import { List as ImmutableList } from 'immutable';

import { orderedIdsReducer } from '../../src/reducers/items/orderedIdsReducer.ts';
import { deleteItem } from '../../src/actions/actionCreators.ts';
import { addItemFactory } from '../../src/actions/actionCreatorsFactory.ts';
import { unknownAction } from '../actions/helperActions';

describe('orderedIdsReducer', () => {
  const defaultOrderedIds = ImmutableList().push('2', '6', '4');

  it('returns correct initial state', () => {
    const expectedIds = new ImmutableList();
    expect(orderedIdsReducer(undefined, unknownAction)).toEqual(expectedIds);
  });

  it('does not modify Ids on unknown action', () => {
    expect(orderedIdsReducer(defaultOrderedIds, unknownAction)).toEqual(defaultOrderedIds);
  });

  it('deletes item id correctly', () => {
    const action = deleteItem('6');
    const expectedIds = defaultOrderedIds.delete(1);

    expect(orderedIdsReducer(defaultOrderedIds, action)).toEqual(expectedIds);
  });

  it('adds item id correctly', () => {
    const action = addItemFactory(() => '5')('text');
    const expectedIds = defaultOrderedIds.push('5');

    expect(orderedIdsReducer(defaultOrderedIds, action)).toEqual(expectedIds);
  });
});
