// import { ThunkAction } from 'redux-thunk';

import { MAIN_ROUTE } from '../../../constants/routes';
import { requestItems, receiveItems } from '../actionCreators';
import { IAction } from '../../IAction';
import { handleFetch } from '../../../utils/ajax';
// import { IStore } from '../../../reducers/appReducer';

interface IOptions {
  method: string;
}

// TODO squash dependencies
export const fetchItemsFactory = (fetchFunction: (route: string, options: IOptions) => Promise<IAction>,
                                  failItemsFetchFunction: () => IAction): any =>
  // TODO return type, use error messages
  (): any => {
    return (dispatch: Dispatch): Promise<IAction> => {
      dispatch(requestItems());
      let options = { method: 'GET' };
      return fetchFunction(MAIN_ROUTE, options)
        .then((response: any) => handleFetch(response))
        .then((json: any) => dispatch(receiveItems(json)))
        .catch(() => dispatch(failItemsFetchFunction()));
    };
  };

