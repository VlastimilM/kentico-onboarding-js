// import { postItemFactory } from '../../src/actions/internal/postItemFactory';
import {
  failPostItem,
  receiveItem,
  requestPostItem,
  addItem,
} from '../../src/actions/actionCreators';
import { handleFetch } from '../../src/utils/ajax';
import { MAIN_ROUTE } from '../../src/constants/routes';

const postItemFactory = (fetchFunction: (route: string, options: Object) => Promise<any>) =>
  // TODO return type
  (text: string): any => {
    return (dispatch: Dispatch): Promise<any> => {
      let header = new Headers({
        'Content-Type': 'application/json',
      });
      dispatch(requestPostItem());
      dispatch(addItem(text));

      return fetchFunction('/api/v1/ListItems/', {
        method: 'POST',
        headers: header,
        body: JSON.stringify({ text })
      })
        .then((response: any) => handleFetch(response))
        .then((json: any) => dispatch(receiveItem(json)))
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

  const myFailedFetch = (route: any, options: any): Promise<any> => {
    console.log(route, options);
    return Promise.reject('Failed to post item');
  };

  it('calls fetch with MAIN_ROUTE argument', () => {
    const fetchMock = jest.fn(mySuccessfulFetch);
    const postItems = postItemFactory(fetchMock);

    return (postItems(postItemText))(myDispatch)
      .then(expect(fetchMock.mock.calls[0][0]).toEqual(MAIN_ROUTE));
  });

  it('calls fetch with correct options', () => {
    const fetchMock = jest.fn(mySuccessfulFetch);
    const postItems = postItemFactory(fetchMock);

    return (postItems(postItemText))(myDispatch)
      .then(() => {
        expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
        expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify({ text: postItemText }));
      });
  });

  it('dispatches requestPostItem', () => {
    const mockDispatch = jest.fn(myDispatch);
    const postItem = postItemFactory(mySuccessfulFetch);

    return (postItem(postItemText))(mockDispatch)
      .then(expect(mockDispatch.mock.calls[0][0]).toEqual(requestPostItem()));
  });

  it('dispatches receiveItem', () => {
    const mockDispatch = jest.fn(myDispatch);
    const postItem = postItemFactory(mySuccessfulFetch);

    // TODO check index after removing addItem call
    return postItem(postItemText)(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[2][0]).toEqual(receiveItem(response)));
  });

  it('dispatches failPostItem on failed Post', () => {
    const mockDispatch = jest.fn(myDispatch);
    const postItem = postItemFactory(myFailedFetch);

    // TODO check index after removing addItem call
    return postItem(postItemText)(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[2][0]).toEqual(failPostItem()));
  });

});
