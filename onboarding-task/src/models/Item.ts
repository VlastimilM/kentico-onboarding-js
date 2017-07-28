import { TypeRecord } from './TypeRecord';

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


class ItemRecord extends TypeRecord<ItemRecord, IItem>(defaultItem) implements IItem {
  readonly id: string;
  readonly textSaved: string;
  readonly textShown: string;
  readonly isEditing: boolean;
}

export { ItemRecord as Item, IItem };
