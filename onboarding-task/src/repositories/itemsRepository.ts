import {
  handleFetch,
  FetchFunction,
} from '../utils/ajax';
import { MAIN_ROUTE } from '../constants/routes';
import { ServerItem } from '../models/ServerItem';

export const getItemsOperationFactory = (fetch: FetchFunction) =>
  (): Promise<Array<ServerItem>> => {
    const fetchOptions = { method: 'GET' };

    return fetch(MAIN_ROUTE, fetchOptions)
      .catch(() => {
        throw new Error('Failed to fetch items. You are offline.');
      })
      .then((response) => handleFetch(response));
  };

export const postItemOperationFactory = (fetch: FetchFunction) =>
  (text: string): Promise<ServerItem> => {
    const header = new Headers({
      'Content-Type': 'application/json',
    });
    const fetchOptions = {
      method: 'POST',
      headers: header,
      body: JSON.stringify({ text })
    };

    return fetch(MAIN_ROUTE, fetchOptions)
      .catch(() => {
        throw new Error('Failed to post item. You are offline.');
      })
      .then((response) => handleFetch(response));
  };

export const getItemsOperation = getItemsOperationFactory(fetch);

export const postItemOperation = postItemOperationFactory(fetch);
