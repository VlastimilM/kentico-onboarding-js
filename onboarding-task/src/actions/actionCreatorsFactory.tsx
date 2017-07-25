import { ITEM_ADDED } from './actionTypes';
import { IAction } from './IAction';

export const addItemFactory = (guidFunction: () => string) =>
  (text: string): IAction => ({
    type: ITEM_ADDED,
    payload: {
      text,
      id: guidFunction(),
    },
  });
