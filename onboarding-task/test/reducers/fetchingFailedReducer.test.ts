import { fetchingFailedReducer } from '../../src/reducers/items/fetchingFailedReducer';
import { unknownAction } from '../actions/helperActions';
import { fetchItemsFailFactory } from '../../src/actions/actionCreators/internal/fetchItemsFailFactory';
import { postItemFailFactory } from '../../src/actions/actionCreators/internal/postItemFailFactory';
import {
  receiveItem,
  receiveItems,
} from '../../src/actions/actionCreators/actionCreators';


describe('fetchingFailed reducer', () => {
  const defaultFetchingFailed = false;
  const defaultError = new Error();

  it('returns correct initial state', () => {
    expect(fetchingFailedReducer(undefined, unknownAction)).toEqual(defaultFetchingFailed);
  });

  it('does not modify item on unknown action', () => {
    expect(fetchingFailedReducer(defaultFetchingFailed, unknownAction)).toEqual(defaultFetchingFailed);
  });

  it('returns correct fetchingFailed on fetch items failure', () => {
    const expectedFetchingFailed = true;
    const action = fetchItemsFailFactory(() => '5')(defaultError);

    expect(fetchingFailedReducer(defaultFetchingFailed, action)).toEqual(expectedFetchingFailed);
  });

  it('returns correct fetchingFailed on post item failure', () => {
    const expectedFetchingFailed = true;
    const action = postItemFailFactory(() => '5')(defaultError, '5');

    expect(fetchingFailedReducer(defaultFetchingFailed, action)).toEqual(expectedFetchingFailed);
  });

  it('returns correct fetchingFailed on fetch items success', () => {
    const expectedFetchingFailed = false;
    const action = receiveItems([]);

    expect(fetchingFailedReducer(defaultFetchingFailed, action)).toEqual(expectedFetchingFailed);
  });

  it('returns correct fetchingFailed on post item success', () => {
    const expectedFetchingFailed = false;
    const item = { text: 'text', id: '10' };
    const action = receiveItem(item, '5');

    expect(fetchingFailedReducer(defaultFetchingFailed, action)).toEqual(expectedFetchingFailed);
  });
});
