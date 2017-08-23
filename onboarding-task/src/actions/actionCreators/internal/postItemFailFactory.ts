import { POST_ITEM_FAILURE } from '../../actionTypes';
import { IAction } from '../../IAction';
// TODO commit and rename file

export const postItemFailFactory = (guidFunction: () => string) =>
  (): IAction => ({
    type: POST_ITEM_FAILURE,
    payload: {
      errorId: guidFunction(),
    },
  });
