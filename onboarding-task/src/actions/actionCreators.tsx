import {
  ITEM_DELETED,
  ITEM_SAVED,
  START_EDITING_ITEM,
  STOP_EDITING_ITEM,
  UPDATE_ITEM_TEXT,
} from '././actionTypes';
import { generateGuid } from './../utils/guidGenerator';
import { addItemFactory } from '././actionCreatorsFactory';

export const addItem = addItemFactory(generateGuid);

export const saveItem = (id: string, text: string) => (
  {
    type: ITEM_SAVED,
    payload: {
      id,
      text,
    },
  }
);

export const deleteItem = (id: string) => (
  {
    type: ITEM_DELETED,
    payload: {
      id,
    },
  }
);

export const startEditingItem = (id: string) => (
  {
    type: START_EDITING_ITEM,
    payload: {
      id,
    },
  }
);

export const stopEditingItem = (id: string) => (
  {
    type: STOP_EDITING_ITEM,
    payload: {
      id,
    },
  }
);

export const updateItemText = (id: string, text: string) => (
  {
    type: UPDATE_ITEM_TEXT,
    payload: {
      id,
      text,
    },
  }
);

