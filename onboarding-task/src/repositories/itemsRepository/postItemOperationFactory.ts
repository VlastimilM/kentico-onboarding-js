import { IHttpRequestOptions, IResponse } from '../../utils/ajax';
import { MAIN_ROUTE } from '../../constants/routes';
import { handleFetch } from '../../utils/ajax';
import { ServerItem } from '../../models/ServerItem';

export const postItemOperationFactory = (fetchFunction: (route: string, options: IHttpRequestOptions) => Promise<IResponse>) =>
  (text: string): Promise<ServerItem> => {
    const header = new Headers({
      'Content-Type': 'application/json',
    });
    const fetchOptions = {
      method: 'POST',
      headers: header,
      body: JSON.stringify({ text })
    };
    return fetchFunction(MAIN_ROUTE, fetchOptions)
      .catch(() => {
        throw new Error('Failed to post item. You are offline.');
      })
      .then((response) => handleFetch(response));
  };
