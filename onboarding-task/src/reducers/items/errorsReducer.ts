import * as Immutable from 'immutable';

import { IAction } from '../../actions/IAction';
import {
  FETCH_ITEMS_FAILURE,
  POST_ITEM_FAILURE,
  DELETE_ERROR_MESSAGE,
} from '../../constants/actionTypes';
import { Error } from '../../models/Error';

export type Errors = Immutable.List<Error>;

export function errorsReducer(errors: Errors = Immutable.List<Error>(), action: IAction): Errors {
  switch (action.type) {
    case FETCH_ITEMS_FAILURE:
    case POST_ITEM_FAILURE:
      return errors.push(new Error({ message: action.payload.errorMessage, errorId: action.payload.errorId }));
    case DELETE_ERROR_MESSAGE:
      return errors.filterNot((error: Error) => error.errorId === action.payload.errorId).toList();
    default:
      return errors;
  }
}
