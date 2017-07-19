import { actionTypes } from '././actionTypes';

export const addItemFactory = (guidFunction: () => string) => (text: string) => (
  {
    type: actionTypes.ITEM_ADDED,
    payload: {
      text,
      id: guidFunction(),
    },
  }
);
