import { POST_ITEM_REQUEST } from '../../constants/actionTypes';
import { IAction } from '../IAction';

export const postItemRequestFactory = (guidFunction: () => string) =>
  (text: string): IAction => ({
    type: POST_ITEM_REQUEST,
    payload: {
      text,
      id: guidFunction(),
    },
  });
