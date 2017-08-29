import { isFetchingReducer } from '../../src/reducers/items/isFetchingReducer';
import { fetchItemsFailFactory } from '../../src/actions/internal/fetchItemsFailFactory';
import {
  requestItems,
  receiveItems,
} from '../../src/actions/actionCreators';
import { unknownAction } from '../actions/helperActions';


describe('isFetching reducer', () => {
  const defaultIsFetching = false;

  it('returns correct initial state', () => {
    expect(isFetchingReducer(undefined, unknownAction)).toEqual(defaultIsFetching);
  });

  it('does not modify item on unknown action', () => {
    expect(isFetchingReducer(defaultIsFetching, unknownAction)).toEqual(defaultIsFetching);
  });

  it('returns correct isFetching on fetch items failure', () => {
    const expectedIsFetching = false;
    const error = new Error();
    const action = fetchItemsFailFactory(() => '5')(error);

    expect(isFetchingReducer(true, action)).toEqual(expectedIsFetching);
  });

  it('returns correct isFetching on fetch items success', () => {
    const expectedIsFetching = false;
    const action = receiveItems([]);

    expect(isFetchingReducer(true, action)).toEqual(expectedIsFetching);
  });

  it('returns correct isFetching on fetch items request', () => {
    const expectedIsFetching = true;
    const action = requestItems();

    expect(isFetchingReducer(defaultIsFetching, action)).toEqual(expectedIsFetching);
  });
});
