import { MAIN_ROUTE } from '../../src/constants/routes';
import {
  requestItems
  , receiveItems,
} from '../../src/actions/actionCreators/actionCreators';
import { IAction } from '../../src/actions/IAction';
import { fetchItemsFailFactory } from '../../src/actions/actionCreators/internal/fetchItemsFailFactory';
import { fetchItemsFactory } from '../../src/actions/actionCreators/internal/fetchItemsFactory';
import { IResponse } from '../../src/utils/ajax';
import { ServerItem } from  '../../src/models/ServerItem';
import { getItemsOperationFactory } from '../../src/repositories/itemsRepository/getItemsOperationFactory';

describe('FetchItems', () => {
  const receivedItems: Array<ServerItem> = [];
  const response: IResponse = { ok: true, json: () => Promise.resolve(receivedItems) };
  const myDispatch: any = (action: IAction) => action;
  const failItemsFetch = fetchItemsFailFactory(() => '5');

  // TODO route, options args?
  const mySuccessfulFetch = (route: any, options: any): Promise<any> => {
    console.log(route, options);
    return Promise.resolve(response);
  };

  const myFailedFetch = (route: any, options: any): Promise<any> => {
    console.log(route, options);
    return Promise.reject('Failed to fetch items');
  };

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
