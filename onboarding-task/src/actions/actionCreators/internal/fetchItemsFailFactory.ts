import { FETCH_ITEMS_FAILURE } from '../../actionTypes';
import { IAction } from '../../IAction';

// TODO commit and rename file
export const fetchItemsFailFactory = (guidFunction: () => string) =>
  (): IAction => ({
    type: FETCH_ITEMS_FAILURE,
    payload: {
      errorId: guidFunction(),
    },
  });
