import { receiveItem } from '../actionCreators';
import { handleFetch } from '../../../utils/ajax';
import { IAction } from '../../IAction';

// TODO postItemRequstFunction => postItemRequestActionCreator ?
// TODO squash dependencies
export const postItemFactory = (fetchFunction: (route: string, options: Object) => Promise<IAction>,
                                postItemRequestActionCreator: (text: string) => IAction,
                                postItemFailActionCreator: () => IAction) =>
  (text: string) => {
    return (dispatch: Dispatch): Promise<IAction> => {
      let header = new Headers({
        'Content-Type': 'application/json',
      });
      const postItemRequestAction = postItemRequestActionCreator(text);
      const frontendId = postItemRequestAction.payload.id;
      dispatch(postItemRequestAction);

      return fetchFunction('/api/v1/ListItems/', {
        method: 'POST',
        headers: header,
        body: JSON.stringify({ text })
      })
        .then((response: any) => handleFetch(response))
        .then((json: any) => dispatch(receiveItem(json, frontendId)))
        .catch((error) => {
          console.log('here comes the error');
          console.log(error);
          return dispatch(postItemFailActionCreator());
        });
    };
  };
