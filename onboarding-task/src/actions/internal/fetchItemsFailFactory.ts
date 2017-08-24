import { FETCH_ITEMS_FAILURE } from '../../constants/actionTypes';
import { IAction } from '../IAction';

export const fetchItemsFailFactory = (guidFunction: () => string) =>
  (error: Error): IAction => ({
    type: FETCH_ITEMS_FAILURE,
    payload: {
      errorId: guidFunction(),
      errorMessage: error.message,
    },
  });
