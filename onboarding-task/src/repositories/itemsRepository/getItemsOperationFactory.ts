import {
  handleFetch,
  FetchFunction,
} from '../../utils/ajax';
import { MAIN_ROUTE } from '../../constants/routes';
import { ServerItem } from '../../models/ServerItem';

export const getItemsOperationFactory = (fetch: FetchFunction) =>
  (): Promise<Array<ServerItem>> => {
    const fetchOptions = { method: 'GET' };

    return fetch(MAIN_ROUTE, fetchOptions)
      .catch(() => {
        throw new Error('Failed to fetch items. You are offline.');
      })
      .then((response) => handleFetch(response));
  };
