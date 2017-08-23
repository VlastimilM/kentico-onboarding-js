import { MAIN_ROUTE } from '../../../constants/routes';
import { requestItems, receiveItems } from '../actionCreators';
import { IAction } from '../../IAction';
import { handleFetch } from '../../../utils/ajax';

interface IOptions {
  method: string;
}

// TODO squash dependencies
// TODO use error messages ?
export const fetchItemsFactory = (fetchFunction: (route: string, options: IOptions) => Promise<IAction>,
                                  fetchItemsFailActionCreator: () => IAction) =>
  () =>
    (dispatch: Dispatch): Promise<IAction> => {
      dispatch(requestItems());
      let options = { method: 'GET' };
      return fetchFunction(MAIN_ROUTE, options)
        .then((response: any) => handleFetch(response))
        .then((json: any) => dispatch(receiveItems(json)))
        .catch(() => dispatch(fetchItemsFailActionCreator()));
    };

