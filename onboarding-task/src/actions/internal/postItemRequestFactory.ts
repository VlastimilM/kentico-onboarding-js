import { POST_ITEM_REQUEST } from '../../constants/actionTypes';
import { IAction } from '../IAction';

export const postItemRequestFactory = (generateGuid: () => string) =>
  (text: string): IAction => ({
    type: POST_ITEM_REQUEST,
    payload: {
      text,
      id: generateGuid(),
    },
  });
