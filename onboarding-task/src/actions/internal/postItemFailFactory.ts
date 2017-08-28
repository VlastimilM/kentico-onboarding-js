import { POST_ITEM_FAILURE } from '../../constants/actionTypes';
import { IAction } from '../IAction';

export const postItemFailFactory = (guidGenerator: () => string) =>
  (error: Error, frontendId: string): IAction => ({
    type: POST_ITEM_FAILURE,
    payload: {
      errorId: guidGenerator(),
      errorMessage: error.message,
      frontendId,
    },
  });
