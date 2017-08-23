import { receiveItem } from '../../src/actions/actionCreators/actionCreators';
import { MAIN_ROUTE } from '../../src/constants/routes';
import { postItemFailFactory } from '../../src/actions/actionCreators/internal/postItemFailFactory';
import { postItemRequestFactory } from '../../src/actions/actionCreators/internal/postItemRequestFactory';
import { postItemFactory } from '../../src/actions/actionCreators/internal/postItemFactory';
import { IAction } from '../../src/actions/IAction';
import { postItemOperationFactory } from '../../src/repositories/itemsRepository/postItemOperationFactory';

describe('PostItems', () => {
  const postItemText = 'blublop';
  const postedItemId = '5';
  const postedItem = {
    text: postItemText,
    id: postedItemId,
  };
  const response = { ok: true, json: () => Promise.resolve(postedItem) };
  const myDispatch: any = (action: IAction) => action;
  const mySuccessfulFetch = (route: any, options: any): Promise<any> => {
    console.log(route, options);
    return Promise.resolve(response);
  };
  const postItemRequest = postItemRequestFactory(() => postedItemId);
  const failPostItem = postItemFailFactory(() => postedItemId);


  const myFailedFetch = (route: any, options: any): Promise<any> => {
    console.log(route, options);
    return Promise.reject('Failed to post item');
  };
  const fetchMock = jest.fn(mySuccessfulFetch);
  const postItemFactoryDependencies = {
    postItemOperation: postItemOperationFactory(fetchMock),
    postItemRequestActionCreator: postItemRequest,
    postItemFailActionCreator: failPostItem,
  };
  const postItem = postItemFactory(postItemFactoryDependencies);

  it('calls fetch with MAIN_ROUTE argument', () => {
    return (postItem(postItemText))(myDispatch)
      .then(() => expect(fetchMock.mock.calls[0][0]).toEqual(MAIN_ROUTE));
  });

  it('calls fetch with correct options', () => {
    return (postItem(postItemText))(myDispatch)
      .then(() => {
        expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
        expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify({ text: postItemText }));
      });
  });

  it('dispatches postItemRequest', () => {
    const mockDispatch = jest.fn(myDispatch);

    return (postItem(postItemText))(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[0][0]).toEqual(postItemRequest(postItemText)));
  });

  it('dispatches receiveItem', () => {
    const mockDispatch = jest.fn(myDispatch);

    return postItem(postItemText)(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[1][0]).toEqual(receiveItem(postedItem, postedItemId)));
  });

  it('dispatches postItemFail on failed Post', () => {
    const mockDispatch = jest.fn(myDispatch);
    const failPostItemFactoryDependencies = {
      postItemOperation: postItemOperationFactory(myFailedFetch),
      postItemRequestActionCreator: postItemRequest,
      postItemFailActionCreator: failPostItem,
    };
    const failedPostItem = postItemFactory(failPostItemFactoryDependencies);
    const error = new Error('Failed to post item. You are offline.');

    return failedPostItem(postItemText)(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[1][0]).toEqual(failPostItem(error, postedItemId)));
  });
});
