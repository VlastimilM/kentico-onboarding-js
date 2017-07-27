import { memoizedItemViewModelConstructor } from '../../src/models/ItemViewModel';
import { Item } from '../../src/models/Item';

describe('ItemViewModel', () => {
  const defaultItem = new Item({
    id: '5',
    textSaved: 'textSaved',
    textShown: 'textShown',
    isEditing: false,
  });
  const defaultIndex = 10;

  it('constructs viewModel correctly', () => {

    const expected = {
      id: defaultItem.id,
      text: defaultItem.textShown,
      index: defaultIndex,
      isEditing: defaultItem.isEditing
    };
    expect(memoizedItemViewModelConstructor(defaultItem, defaultIndex)).toEqual(expected);
  });

  it('caches results correctly', () => {
    const firstItem = memoizedItemViewModelConstructor(defaultItem, defaultIndex);
    const secondItem = memoizedItemViewModelConstructor(defaultItem, defaultIndex);

    expect(firstItem).toBe(secondItem);
  });
});



