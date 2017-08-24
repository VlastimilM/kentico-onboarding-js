import { MAIN_ROUTE } from '../../src/constants/routes';
import {
  requestItems,
  receiveItems,
} from '../../src/actions/actionCreators';
import { IAction } from '../../src/actions/IAction';
import { IResponse } from '../../src/utils/ajax';
import { ServerItem } from  '../../src/models/ServerItem';
import { fetchItemsFailFactory } from '../../src/actions/internal/fetchItemsFailFactory';
import { fetchItemsFactory } from '../../src/actions/internal/fetchItemsFactory';
import { getItemsOperationFactory } from '../../src/repositories/itemsRepository/getItemsOperationFactory';
import { IHttpRequestOptions } from '../../src/utils/ajax';

describe('FetchItems', () => {
  const receivedItems: Array<ServerItem> = [];
  const response: IResponse = { ok: true, json: () => Promise.resolve(receivedItems) };
  const failItemsFetch = fetchItemsFailFactory(() => '5');
  const myDispatch: any = (action: IAction) => action;

  const mySuccessfulFetch = (_route: string, _options: IHttpRequestOptions): Promise<IResponse> =>
    Promise.resolve(response);

  const myFailedFetch = (_route: string, _options: IHttpRequestOptions): Promise<IResponse> =>
    Promise.reject('Failed to fetch items');

  it('calls fetch with MAIN_ROUTE argument', () => {
    const fetchMock = jest.fn(mySuccessfulFetch);
    const fetchItemsFactoryDependencies = {
      getItemsOperation: getItemsOperationFactory(fetchMock),
      fetchItemsFailActionCreator: failItemsFetch,
    };
    const fetchItems = fetchItemsFactory(fetchItemsFactoryDependencies);

    return fetchItems()(myDispatch)
      .then(() => expect(fetchMock.mock.calls[0][0]).toEqual(MAIN_ROUTE));
  });

  it('dispatches request items', () => {
    const mockDispatch = jest.fn(myDispatch);
    const fetchItemsFactoryDependencies = {
      getItemsOperation: getItemsOperationFactory(mySuccessfulFetch),
      fetchItemsFailActionCreator: failItemsFetch,
    };
    const fetchItems = fetchItemsFactory(fetchItemsFactoryDependencies);

    return fetchItems()(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[0][0]).toEqual(requestItems()));
  });

  it('dispatches receive items', () => {
    const mockDispatch = jest.fn(myDispatch);
    const fetchItemsFactoryDependencies = {
      getItemsOperation: getItemsOperationFactory(mySuccessfulFetch),
      fetchItemsFailActionCreator: failItemsFetch,
    };
    const fetchItems = fetchItemsFactory(fetchItemsFactoryDependencies);

    return fetchItems()(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[1][0]).toEqual(receiveItems(receivedItems)));
  });

  it('dispatches fetchItemsFail on failed fetch', () => {
    const mockDispatch = jest.fn(myDispatch);
    const error = new Error('Failed to fetch items. You are offline.');
    const fetchItemsFactoryDependencies = {
      getItemsOperation: getItemsOperationFactory(myFailedFetch),
      fetchItemsFailActionCreator: failItemsFetch,
    };
    const fetchItems = fetchItemsFactory(fetchItemsFactoryDependencies);

    return fetchItems()(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[1][0]).toEqual(failItemsFetch(error)));
  });
});
