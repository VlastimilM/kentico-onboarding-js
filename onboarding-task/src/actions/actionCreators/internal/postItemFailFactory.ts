import { POST_ITEM_FAILURE } from '../../actionTypes';
import { IAction } from '../../IAction';

export const postItemFailFactory = (guidFunction: () => string) =>
  (error: Error): IAction => ({
    type: POST_ITEM_FAILURE,
    payload: {
      errorId: guidFunction(),
      errorMessage: error.message,
    },
  });
