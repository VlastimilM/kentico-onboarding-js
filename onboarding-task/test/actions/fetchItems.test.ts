import {
  requestItems,
  receiveItems,
} from '../../src/actions/actionCreators';
import { IAction } from '../../src/actions/IAction';
import { ServerItem } from  '../../src/models/ServerItem';
import { fetchItemsFailFactory } from '../../src/actions/internal/fetchItemsFailFactory';
import { fetchItemsFactory } from '../../src/actions/internal/fetchItemsFactory';

describe('FetchItems', () => {
  const postItemText = 'blublop';
  const postedItemId = '5';
  const postedItem = {
    text: postItemText,
    id: postedItemId,
  };
  const receivedItems: Array<ServerItem> = [postedItem];
  const failItemsFetch = fetchItemsFailFactory(() => '5');
  const myDispatch: any = (action: IAction) => action;

  const successfulGetItemsOperation = () => Promise.resolve(receivedItems);
  const failedGetItemsOperation = () => Promise.reject('pseifjapr');

  it('calls repository correctly', () => {
    const mockGetItemsOperation = jest.fn(successfulGetItemsOperation);
    const fetchItemsFactoryDependencies = {
      getItemsOperation: mockGetItemsOperation,
      fetchItemsFailActionCreator: failItemsFetch,
      requestItemsActionCreator: requestItems,
      receiveItemsActionCreator: receiveItems,
    };
    const fetchItems = fetchItemsFactory(fetchItemsFactoryDependencies);

    return fetchItems()(myDispatch)
      .then(() => expect(mockGetItemsOperation.mock.calls.length).toEqual(1));
  });

  it('dispatches request items', () => {
    const mockDispatch = jest.fn(myDispatch);
    const fetchItemsFactoryDependencies = {
      getItemsOperation: successfulGetItemsOperation,
      fetchItemsFailActionCreator: failItemsFetch,
      requestItemsActionCreator: requestItems,
      receiveItemsActionCreator: receiveItems,
    };
    const fetchItems = fetchItemsFactory(fetchItemsFactoryDependencies);

    return fetchItems()(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[0][0]).toEqual(requestItems()));
  });

  it('dispatches receive items', () => {
    const mockDispatch = jest.fn(myDispatch);
    const fetchItemsFactoryDependencies = {
      getItemsOperation: successfulGetItemsOperation,
      fetchItemsFailActionCreator: failItemsFetch,
      requestItemsActionCreator: requestItems,
      receiveItemsActionCreator: receiveItems,
    };
    const fetchItems = fetchItemsFactory(fetchItemsFactoryDependencies);

    return fetchItems()(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[1][0]).toEqual(receiveItems(receivedItems)));
  });

  it('dispatches fetchItemsFail on failed fetch', () => {
    const mockDispatch = jest.fn(myDispatch);
    const error = new Error('Failed to fetch items. You are offline.');
    const fetchItemsFactoryDependencies = {
      getItemsOperation: failedGetItemsOperation,
      fetchItemsFailActionCreator: failItemsFetch,
      requestItemsActionCreator: requestItems,
      receiveItemsActionCreator: receiveItems,
    };
    const fetchItems = fetchItemsFactory(fetchItemsFactoryDependencies);

    return fetchItems()(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[1][0]).toEqual(failItemsFetch(error)));
  });
});
