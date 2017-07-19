import { Record } from 'immutable';

interface IItem {
  readonly id: string;
  readonly textSaved: string;
  readonly textShown: string;
  readonly isEditing: boolean;
}

const defaultItem: IItem = {
  id: '',
  textSaved: '',
  textShown: '',
  isEditing: false,
};

class Item extends Record(defaultItem) implements IItem {
  readonly id: string;
  readonly textSaved: string;
  readonly textShown: string;
  readonly isEditing: boolean;

  constructor(params?: Partial<IItem>) {
    params ? super(params) : super();
  }

  with(values: Partial<IItem>): Item {
    return this.merge(values) as this;
  }
}

export {Item, IItem};
