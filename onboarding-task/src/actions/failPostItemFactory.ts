import { POST_ITEM_FAILURE } from './actionTypes';
import { IAction } from './IAction';

export const failPostItemFactory = (guidFunction: () => string) =>
  (): IAction => ({
    type: POST_ITEM_FAILURE,
    payload: {
      errorId: guidFunction(),
    },
  });
