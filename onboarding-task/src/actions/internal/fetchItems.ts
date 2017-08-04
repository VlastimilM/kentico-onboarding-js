import { MAIN_ROUTE } from '../../constants/routes';
import { requestItems, receiveItems, failItemsFetch } from '../actionCreators';
import { IAction } from '../IAction';


// TODO DI
export const fetchItems = (): any => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(requestItems());

    let options = { method: 'GET' };
    return fetch(MAIN_ROUTE, options)
      .then(
        (response: any) => response.json(),
        (error: any) => {
          throw new Error(error);
        })
      .then(
        (json: any) => dispatch(receiveItems(json)),
        () => dispatch(failItemsFetch())
      );
  };
};
