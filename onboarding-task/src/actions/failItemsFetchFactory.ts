import { FETCH_ITEMS_FAILURE } from './actionTypes';
import { IAction } from './IAction';

export const failItemsFetchFactory = (guidFunction: () => string) =>
  (): IAction => ({
    type: FETCH_ITEMS_FAILURE,
    payload: {
      errorId: guidFunction(),
    },
  });
