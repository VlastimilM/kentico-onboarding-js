import {
  failPostItem,
  receiveItem,
  requestPostItem,
} from '../actionCreators';
import { handleFetch } from '../../utils/ajax';

// TODO inject requestPostItem function
export const postItemFactory = (fetchFunction: (route: string, options: Object) => Promise<any>) =>
  // TODO return type
  (text: string): any => {
    return (dispatch: Dispatch): Promise<any> => {
      let header = new Headers({
        'Content-Type': 'application/json',
      });
      const requestAction = requestPostItem(text);
      const frontendId = requestAction.payload.id;
      dispatch(requestAction);

      return fetchFunction('/api/v1/ListItems/', {
        method: 'POST',
        headers: header,
        body: JSON.stringify({ text })
      })
        .then((response: any) => handleFetch(response))
        .then((json: any) => dispatch(receiveItem(json, frontendId)))
        .catch(() => dispatch(failPostItem()));
    };
  };
