import { MAIN_ROUTE } from '../../constants/routes';
import { requestItems, receiveItems, failItemsFetch } from '../actionCreators';
import { IAction } from '../IAction';
import { handleFetch } from '../../utils/ajax';

export const fetchItemsFactory = (fetchFunction: (route: string, options: Object) => Promise<IAction>) =>
  // TODO return type
  (): any => {
    return (dispatch: Dispatch): Promise<IAction> => {
      dispatch(requestItems());

      let options = { method: 'GET' };
      return fetchFunction(MAIN_ROUTE, options)
        .then((response: any) => {
          console.log(response);
          return handleFetch(response);
        })
        .then((json: any) => dispatch(receiveItems(json)))
        .catch((error) => {
          console.log(error);
          return dispatch(failItemsFetch());
        });
    };
  };


