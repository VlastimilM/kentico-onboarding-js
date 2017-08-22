// import { postItemFactory } from '../../src/actions/internal/postItemFactory';
import {
  receiveItem,
  // requestPostItem,
  // addItem,
} from '../../src/actions/actionCreators';
import { handleFetch } from '../../src/utils/ajax';
import { MAIN_ROUTE } from '../../src/constants/routes';
import { failPostItemFactory } from '../../src/actions/failPostItemFactory';
import { postItemRequestFactory } from '../../src/actions/postItemRequestFactory';
import { IAction } from '../../src/actions/IAction';

const failPostItem = failPostItemFactory(() => '5');
export const postItemFactory = (fetchFunction: (route: string, options: Object) => Promise<any>,
                                requestPostItemFunction: (text: string) => IAction) =>
  // TODO return type
  (text: string): any => {
    return (dispatch: Dispatch): Promise<any> => {
      let header = new Headers({
        'Content-Type': 'application/json',
      });
      const requestPostItemAction = requestPostItemFunction(text);
      const frontendId = requestPostItemAction.payload.id;
      dispatch(requestPostItemAction);

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

describe('PostItems', () => {
  const postItemText = 'blublop';
  const response = { ok: true, json: () => Promise.resolve({}) };
  const myDispatch = (action: any) => action;
  const mySuccessfulFetch = (route: any, options: any): Promise<any> => {
    console.log(route, options);
    return Promise.resolve(response);
  };
  const postItemRequest = postItemRequestFactory(() => '5');

  const myFailedFetch = (route: any, options: any): Promise<any> => {
    console.log(route, options);
    return Promise.reject('Failed to post item');
  };
  const fetchMock = jest.fn(mySuccessfulFetch);
  const postItem = postItemFactory(fetchMock, postItemRequest);

  // TODO postitemrequest vs itempostrequest resolve naming, extract requestPostItem method
  it('calls fetch with MAIN_ROUTE argument', () => {
    // const fetchMock = jest.fn(mySuccessfulFetch);
    // const postItem = postItemFactory(fetchMock, postItemRequest);

    return (postItem(postItemText))(myDispatch)
      .then(expect(fetchMock.mock.calls[0][0]).toEqual(MAIN_ROUTE));
  });

  it('calls fetch with correct options', () => {
    // const fetchMock = jest.fn(mySuccessfulFetch);
    // const postItem = postItemFactory(fetchMock, postItemRequest);

    return (postItem(postItemText))(myDispatch)
      .then(() => {
        expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
        expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify({ text: postItemText }));
      });
  });

  it('dispatches requestPostItem', () => {
    const mockDispatch = jest.fn(myDispatch);
    // const postItem = postItemFactory(mySuccessfulFetch);

    return (postItem(postItemText))(mockDispatch)
      .then(expect(mockDispatch.mock.calls[0][0]).toEqual(postItemRequest(postItemText)));
  });

  it('dispatches receiveItem', () => {
    const mockDispatch = jest.fn(myDispatch);
    // const postItem = postItemFactory(mySuccessfulFetch);

    return postItem(postItemText)(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[1][0]).toEqual(receiveItem(response, '5')));
  });

  it('dispatches failPostItem on failed Post', () => {
    const mockDispatch = jest.fn(myDispatch);
    const failedPostItem = postItemFactory(myFailedFetch, postItemRequest);

    return failedPostItem(postItemText)(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[1][0]).toEqual(failPostItem()));
  });

});
