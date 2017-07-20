import {
  ITEM_SAVED,
  START_EDITING_ITEM,
  STOP_EDITING_ITEM,
  UPDATE_ITEM_TEXT,
} from '../../actions/actionTypes.tsx';
import { Item } from '../../models/Item.tsx';

export function itemReducer(item = new Item(), action) {
  switch (action.type) {

    case START_EDITING_ITEM:
      return item.set('isEditing', true);

    case STOP_EDITING_ITEM:
      return item.merge({
        textShown: item.textSaved,
        isEditing: false,
      });

    case ITEM_SAVED:
      return item.merge({
        textShown: action.payload.text,
        textSaved: action.payload.text,
        isEditing: false,
      });

    case UPDATE_ITEM_TEXT:
      return item.set('textShown', action.payload.text);

    default:
      return item;
  }
}
