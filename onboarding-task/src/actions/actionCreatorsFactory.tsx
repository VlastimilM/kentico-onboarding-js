import { ITEM_ADDED } from '././actionTypes';

export const addItemFactory = (guidFunction: () => string) => (text: string) => (
  {
    type: ITEM_ADDED,
    payload: {
      text,
      id: guidFunction(),
    },
  }
);
