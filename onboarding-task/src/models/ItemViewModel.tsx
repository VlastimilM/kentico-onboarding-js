import { Record } from 'immutable';

const memoize = require('memoizee');

const ItemViewModel = new Record({
  id: '',
  text: '',
  index: -1,
  isEditing: false,
});

const ItemViewModelConstructor = (id, text, index, isEditing) => {
  return new ItemViewModel({
    id,
    text,
    index,
    isEditing,
  });
};

export const memoizedItemViewModelConstructor = memoize(ItemViewModelConstructor);
