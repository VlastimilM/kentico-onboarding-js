import { IAction } from '../../actions/IAction';
import {
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  POST_ITEM_FAILURE,
  POST_ITEM_SUCCESS,
} from '../../constants/actionTypes';

export function fetchingFailedReducer(fetchingFailed: boolean = false, action: IAction): boolean {
  switch (action.type) {
    case FETCH_ITEMS_FAILURE:
    case POST_ITEM_FAILURE:
      return true;
    case FETCH_ITEMS_SUCCESS:
    case POST_ITEM_SUCCESS:
      return false;

    default:
      return fetchingFailed;
  }
}
