import { IAction } from '../../actions/IAction';
import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
} from '../../constants/actionTypes';

export function isFetchingReducer(isFetching: boolean = false, action: IAction): boolean {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return true;

    case FETCH_ITEMS_FAILURE:
    case FETCH_ITEMS_SUCCESS:
      return false;

    default:
      return isFetching;
  }
}
