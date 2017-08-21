// import { fetchItemsFactory } from '../../src/actions/internal/fetchItemsFactory';
import { MAIN_ROUTE } from '../../src/constants/routes';
import { requestItems, receiveItems } from '../../src/actions/actionCreators';
import { IAction } from '../../src/actions/IAction';
import { handleFetch } from '../../src/utils/ajax';
import { failItemsFetchFactory } from '../../src/actions/failItemsFetchFactory';

// TODO fix imports of factory methods
const failItemsFetch = failItemsFetchFactory(() => '5');

const fetchItemsFactory = (fetchFunction: (route: string, options: Object) => Promise<IAction>) =>
  // TODO return type
  (): any => {
    return (dispatch: Dispatch): Promise<IAction> => {
      dispatch(requestItems());
      let options = { method: 'GET' };
      return fetchFunction(MAIN_ROUTE, options)
        .then((response: any) => handleFetch(response))
        .then((json: any) => dispatch(receiveItems(json)))
        .catch((/*error*/) => dispatch(failItemsFetch()));
    };
  };

describe('FetchItems', () => {
  const items: any = [];
  const response = { ok: true, json: () => Promise.resolve(items) };
  const myDispatch = (action: any) => action;


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
    const fetchItems = fetchItemsFactory(fetchMock);

    return fetchItems()(myDispatch)
      .then(expect(fetchMock.mock.calls[0][0]).toEqual(MAIN_ROUTE));
  });

  it('dispatches request items', () => {
    const mockDispatch = jest.fn(myDispatch);
    const fetchItems = fetchItemsFactory(mySuccessfulFetch);

    return fetchItems()(mockDispatch)
      .then(expect(mockDispatch.mock.calls[0][0]).toEqual(requestItems()));
  });

  it('dispatches receive items', () => {
    const mockDispatch = jest.fn(myDispatch);
    const fetchItems = fetchItemsFactory(mySuccessfulFetch);

    return fetchItems()(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[1][0]).toEqual(receiveItems(items)));
  });

  it('dispatches failItemsFetch on failed fetch', () => {
    const mockDispatch = jest.fn(myDispatch);
    const fetchItems = fetchItemsFactory(myFailedFetch);

    return fetchItems()(mockDispatch)
      .then(() => expect(mockDispatch.mock.calls[1][0]).toEqual(failItemsFetch()));
  });
});
