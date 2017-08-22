import { ITEM_ADDED, POST_ITEM_REQUEST } from '../../actionTypes';
import { IAction } from '../../IAction';

export const addItemFactory = (guidFunction: () => string) =>
  (text: string): IAction => ({
    type: ITEM_ADDED,
    payload: {
      text,
      id: guidFunction(),
    },
  });

// TODO rename? dont lose history
export const postItemRequestFactory = (guidFunction: () => string) =>
  (text: string): IAction => ({
    type: POST_ITEM_REQUEST,
    payload: {
      text,
      id: guidFunction(),
    },
  });
