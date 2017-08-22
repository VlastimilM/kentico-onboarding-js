import { MAIN_ROUTE } from '../../src/constants/routes';
import { requestItems, receiveItems } from '../../src/actions/actionCreators/actionCreators';
import { IAction } from '../../src/actions/IAction';
import { failItemsFetchFactory } from '../../src/actions/actionCreators/internal/failItemsFetchFactory';
import { fetchItemsFactory } from '../../src/actions/actionCreators/internal/fetchItemsFactory';


describe('FetchItems', () => {
  const items: any = [];
  const response = { ok: true, json: () => Promise.resolve(items) };
  const myDispatch = (action: IAction) => action;
  const failItemsFetch = failItemsFetchFactory(() => '5');

  // TODO remove console log
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
      .then(expect(fetchMock.mock.calls[0][0]).toEqual(MAIN_ROUTE));
  });

  it('dispatches request items', () => {
    const mockDispatch = jest.fn(myDispatch);
    const fetchItems = fetchItemsFactory(mySuccessfulFetch, failItemsFetch);

    return fetchItems()(mockDispatch)
      .then(expect(mockDispatch.mock.calls[0][0]).toEqual(requestItems()));
  });

  it('dispatches receive items', () => {
    const mockDispatch = jest.fn(myDispatch);
    const fetchItems = fetchItemsFactory(mySuccessfulFetch, failItemsFetch);

    return fetchItems()(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[1][0]).toEqual(receiveItems(items)));
  });

  it('dispatches failItemsFetch on failed fetch', () => {
    const mockDispatch = jest.fn(myDispatch);
    const fetchItems = fetchItemsFactory(myFailedFetch, failItemsFetch);

    return fetchItems()(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[1][0]).toEqual(failItemsFetch()));
  });
});
