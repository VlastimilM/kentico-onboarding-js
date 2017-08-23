import { FETCH_ITEMS_FAILURE } from '../../actionTypes';
import { IAction } from '../../IAction';

export const fetchItemsFailFactory = (guidFunction: () => string) =>
  (error: Error): IAction => ({
    type: FETCH_ITEMS_FAILURE,
    payload: {
      errorId: guidFunction(),
      errorMessage: error.message,
    },
  });
