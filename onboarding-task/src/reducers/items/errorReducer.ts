import { IAction } from '../../actions/IAction';
import {
  FETCH_ITEMS_FAILURE,
  POST_ITEM_FAILURE,
} from '../../actions/actionTypes';
import { IError, Error } from '../../models/Error';


export function errorReducer(error: Error = new Error(), action: IAction): IError {
  switch (action.type) {
    case FETCH_ITEMS_FAILURE:
      return error.withValues({ message: 'Failed to fetch items' });
    case POST_ITEM_FAILURE:
      return new Error({ message: 'Failed to post item' });
    default:
      return error;
  }
}
