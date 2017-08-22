import { fetchingFailedReducer } from '../../src/reducers/items/fetchingFailedReducer';
import { unknownAction } from '../actions/helperActions';
import { failItemsFetchFactory } from '../../src/actions/actionCreators/internal/failItemsFetchFactory';
import { failPostItemFactory } from '../../src/actions/actionCreators/internal/failPostItemFactory';
import {
  receiveItem,
  receiveItems,
} from '../../src/actions/actionCreators/actionCreators';


describe('fetchingFailed reducer', () => {
  const defaultFetchingFailed = false;

  it('returns correct initial state', () => {
    expect(fetchingFailedReducer(undefined, unknownAction)).toEqual(defaultFetchingFailed);
  });

  it('does not modify item on unknown action', () => {
    expect(fetchingFailedReducer(defaultFetchingFailed, unknownAction)).toEqual(defaultFetchingFailed);
  });

  it('returns correct fetchingFailed on fetch items failure', () => {
    const expectedFetchingFailed = true;
    const action = failItemsFetchFactory(() => '5')();

    expect(fetchingFailedReducer(defaultFetchingFailed, action)).toEqual(expectedFetchingFailed);
  });

  it('returns correct fetchingFailed on post item failure', () => {
    const expectedFetchingFailed = true;
    const action = failPostItemFactory(() => '5')();

    expect(fetchingFailedReducer(defaultFetchingFailed, action)).toEqual(expectedFetchingFailed);
  });

  it('returns correct fetchingFailed on fetch items success', () => {
    const expectedFetchingFailed = false;
    const action = receiveItems([]);

    expect(fetchingFailedReducer(defaultFetchingFailed, action)).toEqual(expectedFetchingFailed);
  });

  it('returns correct fetchingFailed on post item success', () => {
    const expectedFetchingFailed = false;
    const action = receiveItem({}, '5');

    expect(fetchingFailedReducer(defaultFetchingFailed, action)).toEqual(expectedFetchingFailed);
  });
});
