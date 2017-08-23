import { errorsReducer } from '../../src/reducers/items/errorsReducer';
import { unknownAction } from '../actions/helperActions';
import * as Immutable from 'immutable';
import { Error } from '../../src/models/Error';
import { fetchItemsFailFactory } from '../../src/actions/actionCreators/internal/failItemsFetchFactory';
import { postItemFailFactory } from '../../src/actions/actionCreators/internal/failPostItemFactory';
import { deleteError } from '../../src/actions/actionCreators/actionCreators';

describe('errors reducer', () => {
  const defaultErrorId = '62';
  const defaultErrors = Immutable.List<Error>().push(new Error({ message: 'test Error', errorId: defaultErrorId }));

  it('returns correct initial state', () => {
    const expectedErrors = Immutable.List<Error>();
    expect(errorsReducer(undefined, unknownAction)).toEqual(expectedErrors);
  });

  it('does not modify item on unknown action', () => {
    expect(errorsReducer(defaultErrors, unknownAction)).toEqual(defaultErrors);
  });

  it('creates correct error on fetch items failure', () => {
    const failItemsFetch = fetchItemsFailFactory(() => '50');
    const action = failItemsFetch();
    const itemsFetchError = new Error({ message: 'Failed to fetch items', errorId: '50' });
    const expectedErrors = defaultErrors.push(itemsFetchError);

    expect(errorsReducer(defaultErrors, action)).toEqual(expectedErrors);
  });

  it('creates correct error on post item failure', () => {
    const failItemPost = postItemFailFactory(() => '50');
    const action = failItemPost();
    const itemPostError = new Error({ message: 'Failed to post item', errorId: '50' });
    const expectedErrors = defaultErrors.push(itemPostError);

    expect(errorsReducer(defaultErrors, action)).toEqual(expectedErrors);
  });

  it('removes error correctly', () => {
    const action = deleteError(defaultErrorId);
    const expectedErrors = defaultErrors.filter((error: Error) => error.errorId !== defaultErrorId);

    expect(errorsReducer(defaultErrors, action)).toEqual(expectedErrors);
  });
});
