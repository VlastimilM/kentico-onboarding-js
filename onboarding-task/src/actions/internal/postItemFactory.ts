import {
  failPostItem,
  receiveItem,
  requestPostItem,
  addItem,
} from '../actionCreators';
import { handleFetch } from '../../utils/ajax';

export const postItemFactory = (fetchFunction: (route: string, options: Object) => Promise<any>) =>
  // TODO return type
  (text: string): any => {
    return (dispatch: Dispatch) => {
      let header = new Headers({
        'Content-Type': 'application/json',
      });
      dispatch(requestPostItem());
      dispatch(addItem(text));

      fetchFunction('/api/v1/ListItems/', {
        method: 'POST',
        headers: header,
        body: JSON.stringify({ text })
      })
        .then((response: any) => handleFetch(response))
        .then((json: any) => dispatch(receiveItem(json)))
        .catch(() => dispatch(failPostItem()));
    };
  };

