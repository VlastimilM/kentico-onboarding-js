import {
  IHttpRequestOptions,
  IResponse,
  handleFetch,
} from '../../utils/ajax';
import { MAIN_ROUTE } from '../../constants/routes';
import { ServerItem } from '../../models/ServerItem';

export const getItemsOperationFactory = (fetchFunction: (route: string, options: IHttpRequestOptions) => Promise<IResponse>) =>
  (): Promise<Array<ServerItem>> => {
    const fetchOptions = { method: 'GET' };
    return fetchFunction(MAIN_ROUTE, fetchOptions)
      .catch(() => {
        throw new Error('Failed to fetch items. You are offline.');
      })
      .then((response) => handleFetch(response));
  };
