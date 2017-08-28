import { receiveItem } from '../../src/actions/actionCreators';
import { postItemFailFactory } from '../../src/actions/internal/postItemFailFactory';
import { postItemRequestFactory } from '../../src/actions/internal/postItemRequestFactory';
import { postItemFactory } from '../../src/actions/internal/postItemFactory';
import { IAction } from '../../src/actions/IAction';

describe('PostItems', () => {
  const postItemText = 'blublop';
  const postedItemId = '5';
  const postedItem = {
    text: postItemText,
    id: postedItemId,
  };
  const myDispatch: any = (action: IAction) => action;
  const postItemRequest = postItemRequestFactory(() => postedItemId);
  const failPostItem = postItemFailFactory(() => postedItemId);

  const successfulPostItemOperation = (_text: string) => Promise.resolve(postedItem);
  const failedPostItemOperation = (_text: string) => Promise.reject('choo choo');

  const postItemFactoryDependencies = {
    postItemOperation: successfulPostItemOperation,
    postItemRequestActionCreator: postItemRequest,
    postItemFailActionCreator: failPostItem,
    receiveItemActionCreator: receiveItem,
  };
  const postItem = postItemFactory(postItemFactoryDependencies);

  it('calls repository correctly', () => {
    const mockedPostItemOperation = jest.fn(successfulPostItemOperation);
    const mockedPostItemFactoryDependencies = {
      postItemOperation: mockedPostItemOperation,
      postItemRequestActionCreator: postItemRequest,
      postItemFailActionCreator: failPostItem,
      receiveItemActionCreator: receiveItem,
    };
    const postItemWithMock = postItemFactory(mockedPostItemFactoryDependencies);

    return postItemWithMock(postItemText)(myDispatch)
      .then(() => expect(mockedPostItemOperation.mock.calls.length).toEqual(1));
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
      postItemOperation: failedPostItemOperation,
      postItemRequestActionCreator: postItemRequest,
      postItemFailActionCreator: failPostItem,
      receiveItemActionCreator: receiveItem,
    };
    const failedPostItem = postItemFactory(failPostItemFactoryDependencies);
    const error = new Error('Failed to post item. You are offline.');

    return failedPostItem(postItemText)(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[1][0]).toEqual(failPostItem(error, postedItemId)));
  });
});
