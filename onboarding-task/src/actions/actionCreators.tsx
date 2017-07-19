import {actionTypes } from '././actionTypes';
import { generateGuid } from './../utils/guidGenerator';
import { addItemFactory } from '././actionCreatorsFactory';

// TODO adjust interface
export interface IAction {
  type: actionTypes;
  payload: IPayload;
}

interface IPayload {
  id: string;
  text?: string;
}

export const addItem = addItemFactory(generateGuid);

export const saveItem = (id: string, text: string) => (
  {
    type: actionTypes.ITEM_SAVED,
    payload: {
      id,
      text,
    },
  }
);

export const deleteItem = (id: string) => (
  {
    type: actionTypes.ITEM_DELETED,
    payload: {
      id,
    },
  }
);

export const startEditingItem = (id: string) => (
  {
    type: actionTypes.START_EDITING_ITEM,
    payload: {
      id,
    },
  }
);

export const stopEditingItem = (id: string) => (
  {
    type: actionTypes.STOP_EDITING_ITEM,
    payload: {
      id,
    },
  }
);

export const updateItemText = (id: string, text: string) => (
  {
    type: actionTypes.UPDATE_ITEM_TEXT,
    payload: {
      id,
      text,
    },
  }
);

