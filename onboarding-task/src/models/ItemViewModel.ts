import * as memoizee from 'memoizee';

import { Item } from './Item';

export interface IItemViewModel {
  readonly id: string;
  readonly text: string;
  readonly index: number;
  readonly isEditing: boolean;
  readonly isPosted: boolean;
}

const ItemViewModelConstructor = (item: Item, index: number): IItemViewModel => ({
  id: item.id,
  text: item.textShown,
  index,
  isEditing: item.isEditing,
  isPosted: item.isPosted,
});

export const memoizedItemViewModelConstructor = memoizee(ItemViewModelConstructor);
