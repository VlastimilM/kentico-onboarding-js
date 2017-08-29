import { POST_ITEM_FAILURE } from '../../constants/actionTypes';
import { IAction } from '../IAction';

export const postItemFailFactory = (generateGuid: () => string) =>
  (error: Error, frontendId: string): IAction => ({
    type: POST_ITEM_FAILURE,
    payload: {
      errorId: generateGuid(),
      errorMessage: error.message,
      frontendId,
    },
  });
