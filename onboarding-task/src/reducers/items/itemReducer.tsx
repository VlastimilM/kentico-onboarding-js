import { actionTypes } from '../../actions/actionTypes';
import { Item } from '../../models/Item';
import { IAction } from '../../actions/actionCreators';

export function itemReducer(item: Item = new Item(), action: IAction): Item {
  switch (action.type) {

    case actionTypes.START_EDITING_ITEM:
      return item.withValues({isEditing: true});

    case actionTypes.STOP_EDITING_ITEM:
      return item.withValues({
        textShown: item.textSaved,
        isEditing: false,
      });

    case actionTypes.ITEM_SAVED:
      return item.withValues({
        textShown: action.payload.text,
        textSaved: action.payload.text,
        isEditing: false,
      });

    case actionTypes.UPDATE_ITEM_TEXT:
      return item.withValues({textShown: action.payload.text});

    default:
      return item;
  }
}
