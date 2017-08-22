import { receiveItem } from '../../src/actions/actionCreators/actionCreators';
import { handleFetch } from '../../src/utils/ajax';
import { MAIN_ROUTE } from '../../src/constants/routes';
import { failPostItemFactory } from '../../src/actions/actionCreators/internal/failPostItemFactory';
import { postItemRequestFactory } from '../../src/actions/actionCreators/internal/postItemRequestFactory';
import { IAction } from '../../src/actions/IAction';

const failPostItem = failPostItemFactory(() => '5');
const postItemFactory = (fetchFunction: (route: string, options: Object) => Promise<any>,
                         postItemRequestFunction: (text: string) => IAction) =>
  // TODO return type
  (text: string): any => {
    return (dispatch: Dispatch): Promise<any> => {
      let header = new Headers({
        'Content-Type': 'application/json',
      });
      const postItemRequestAction = postItemRequestFunction(text);
      const frontendId = postItemRequestAction.payload.id;
      dispatch(postItemRequestAction);

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
    return (postItem(postItemText))(myDispatch)
      .then(expect(fetchMock.mock.calls[0][0]).toEqual(MAIN_ROUTE));
  });

  it('calls fetch with correct options', () => {
    return (postItem(postItemText))(myDispatch)
      .then(() => {
        expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
        expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify({ text: postItemText }));
      });
  });

  it('dispatches requestPostItem', () => {
    const mockDispatch = jest.fn(myDispatch);

    return (postItem(postItemText))(mockDispatch)
      .then(expect(mockDispatch.mock.calls[0][0]).toEqual(postItemRequest(postItemText)));
  });

  it('dispatches receiveItem', () => {
    const mockDispatch = jest.fn(myDispatch);

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
