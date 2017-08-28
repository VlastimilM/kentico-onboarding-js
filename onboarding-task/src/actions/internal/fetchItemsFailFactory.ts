import { FETCH_ITEMS_FAILURE } from '../../constants/actionTypes';
import { IAction } from '../IAction';

export const fetchItemsFailFactory = (guidGenerator: () => string) =>
  (error: Error): IAction => ({
    type: FETCH_ITEMS_FAILURE,
    payload: {
      errorId: guidGenerator(),
      errorMessage: error.message,
    },
  });
