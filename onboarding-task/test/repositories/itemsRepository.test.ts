import {
  requestItems,
  receiveItems,
  receiveItem,
} from '../../src/actions/actionCreators';
import { fetchItemsFactory } from '../../src/actions/internal/fetchItemsFactory';
import {
  getItemsOperationFactory,
  postItemOperationFactory
} from '../../src/repositories/itemsRepository';
import { fetchItemsFailFactory } from '../../src/actions/internal/fetchItemsFailFactory';
import { postItemFactory } from '../../src/actions/internal/postItemFactory';
import { postItemFailFactory } from '../../src/actions/internal/postItemFailFactory';
import { postItemRequestFactory } from '../../src/actions/internal/postItemRequestFactory';
import { MAIN_ROUTE } from '../../src/constants/routes';
import { IAction } from '../../src/actions/IAction';
import { ServerItem } from '../../src/models/ServerItem';
import {
  IResponse,
  IHttpRequestOptions,
} from '../../src/utils/ajax';

describe('items repository', () => {
  const postItemText = 'blublop';
  const postedItemId = '5';
  const postedItem = {
    text: postItemText,
    id: postedItemId,
  };
  const receivedItems: Array<ServerItem> = [postedItem];
  const myDispatch: any = (action: IAction) => action;

  const fetchResponse: IResponse = { ok: true, json: () => Promise.resolve(receivedItems) };
  const failItemsFetch = fetchItemsFailFactory(() => postedItemId);
  const successfulGetItemsFetch = (_route: string, _options: IHttpRequestOptions): Promise<IResponse> =>
    Promise.resolve(fetchResponse);

  const postResponse: IResponse = { ok: true, json: () => Promise.resolve(postedItem) };
  const postItemRequest = postItemRequestFactory(() => postedItemId);
  const postItemFail = postItemFailFactory(() => postedItemId);
  const successfulPostItemFetch = (_route: string, _options: IHttpRequestOptions): Promise<IResponse> =>
    Promise.resolve(postResponse);

  it('calls fetch in fetchItems with MAIN_ROUTE argument', () => {
    const fetchMock = jest.fn(successfulGetItemsFetch);
    const fetchItemsFactoryDependencies = {
      getItemsOperation: getItemsOperationFactory(fetchMock),
      fetchItemsFailActionCreator: failItemsFetch,
      requestItemsActionCreator: requestItems,
      receiveItemsActionCreator: receiveItems,
    };
    const fetchItems = fetchItemsFactory(fetchItemsFactoryDependencies);

    return fetchItems()(myDispatch)
      .then(() => expect(fetchMock.mock.calls[0][0]).toEqual(MAIN_ROUTE));
  });

  it('calls fetch in postItem with MAIN_ROUTE argument', () => {
    const fetchMock = jest.fn(successfulPostItemFetch);
    const postItemFactoryDependencies = {
      postItemOperation: postItemOperationFactory(fetchMock),
      postItemRequestActionCreator: postItemRequest,
      postItemFailActionCreator: postItemFail,
      receiveItemActionCreator: receiveItem,
    };
    const postItem = postItemFactory(postItemFactoryDependencies);

    return (postItem(postItemText))(myDispatch)
      .then(() => expect(fetchMock.mock.calls[0][0]).toEqual(MAIN_ROUTE));
  });

  it('calls fetch in postItem with correct options', () => {
    const fetchMock = jest.fn(successfulPostItemFetch);
    const postItemFactoryDependencies = {
      postItemOperation: postItemOperationFactory(fetchMock),
      postItemRequestActionCreator: postItemRequest,
      postItemFailActionCreator: postItemFail,
      receiveItemActionCreator: receiveItem,
    };
    const postItem = postItemFactory(postItemFactoryDependencies);

    return (postItem(postItemText))(myDispatch)
      .then(() => {
        expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
        expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify({ text: postItemText }));
      });
  });
});
