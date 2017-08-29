import {
  START_EDITING_ITEM,
  STOP_EDITING_ITEM,
  ITEM_SAVED,
  UPDATE_ITEM_TEXT,
} from '../../constants/actionTypes';
import { Item } from '../../models/Item';
import { IAction } from '../../actions/IAction';

export function itemReducer(item: Item = new Item(), action: IAction): Item {
  switch (action.type) {

    case START_EDITING_ITEM:
      return item.withValues({ isEditing: true });

    case STOP_EDITING_ITEM:
      return item.withValues({
        textShown: item.textSaved,
        isEditing: false,
      });

    case ITEM_SAVED:
      return item.withValues({
        textShown: action.payload.text,
        textSaved: action.payload.text,
        isEditing: false,
      });

    case UPDATE_ITEM_TEXT:
      return item.withValues({ textShown: action.payload.text });

    default:
      return item;
  }
}
