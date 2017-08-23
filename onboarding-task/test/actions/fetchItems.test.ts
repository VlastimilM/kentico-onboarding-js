import { MAIN_ROUTE } from '../../src/constants/routes';
import {
  requestItems, receiveItems,
  ServerItem
} from '../../src/actions/actionCreators/actionCreators';
import { IAction } from '../../src/actions/IAction';
import { fetchItemsFailFactory } from '../../src/actions/actionCreators/internal/failItemsFetchFactory';
import { fetchItemsFactory } from '../../src/actions/actionCreators/internal/fetchItemsFactory';
import { IResponse } from '../../src/utils/ajax';


describe('FetchItems', () => {
  const receivedItems: Array<ServerItem> = [];
  const response: IResponse = { ok: true, json: () => Promise.resolve(receivedItems) };
  const myDispatch = (action: IAction) => action;
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
    const fetchItems = fetchItemsFactory(fetchMock, failItemsFetch);

    return fetchItems()(myDispatch)
      .then(() => expect(fetchMock.mock.calls[0][0]).toEqual(MAIN_ROUTE));
  });

  it('dispatches request items', () => {
    const mockDispatch = jest.fn(myDispatch);
    const fetchItems = fetchItemsFactory(mySuccessfulFetch, failItemsFetch);

    return fetchItems()(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[0][0]).toEqual(requestItems()));
  });

  it('dispatches receive items', () => {
    const mockDispatch = jest.fn(myDispatch);
    const fetchItems = fetchItemsFactory(mySuccessfulFetch, failItemsFetch);

    return fetchItems()(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[1][0]).toEqual(receiveItems(receivedItems)));
  });

  it('dispatches fetchItemsFail on failed fetch', () => {
    const mockDispatch = jest.fn(myDispatch);
    const fetchItems = fetchItemsFactory(myFailedFetch, failItemsFetch);

    return fetchItems()(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[1][0]).toEqual(failItemsFetch()));
  });
});
