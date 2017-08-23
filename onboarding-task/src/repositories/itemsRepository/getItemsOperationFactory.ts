import { IHttpRequestOptions } from '../../models/IHttpRequestOptions';
import { IAction } from '../../actions/IAction';
import { MAIN_ROUTE } from '../../constants/routes';
import { handleFetch } from '../../utils/ajax';

export const getItemsOperationFactory = (fetchFunction: (route: string, options: IHttpRequestOptions) => Promise<IAction>) =>
  (): Promise<IAction> => {
    const fetchOptions = { method: 'GET' };
    return fetchFunction(MAIN_ROUTE, fetchOptions)
      .catch(() => {
        throw new Error('Failed to fetch items. You are offline.');
      })
      .then((response: any) => handleFetch(response));
  };
