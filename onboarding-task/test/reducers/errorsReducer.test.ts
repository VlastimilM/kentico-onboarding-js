import { errorsReducer } from '../../src/reducers/items/errorsReducer';
import { unknownAction } from '../actions/helperActions';
import * as Immutable from 'immutable';
import { Error as MyError } from '../../src/models/Error';
import { fetchItemsFailFactory } from '../../src/actions/internal/fetchItemsFailFactory';
import { postItemFailFactory } from '../../src/actions/internal/postItemFailFactory';
import { deleteError } from '../../src/actions/actionCreators';

// TODO error clarifiaction (my error vs global error)
describe('errors reducer', () => {
  const defaultErrorId = '62';
  const defaultErrors = Immutable.List<MyError>().push(new MyError({ message: 'test Error', errorId: defaultErrorId }));

  it('returns correct initial state', () => {
    const expectedErrors = Immutable.List<Error>();
    expect(errorsReducer(undefined, unknownAction)).toEqual(expectedErrors);
  });

  it('does not modify item on unknown action', () => {
    expect(errorsReducer(defaultErrors, unknownAction)).toEqual(defaultErrors);
  });

  it('creates correct error on fetch items failure', () => {
    const failItemsFetch = fetchItemsFailFactory(() => '50');
    const errorMessage = 'Failed to fetch items';
    const error = new Error(errorMessage);
    const action = failItemsFetch(error);
    const itemsFetchError = new MyError({ message: errorMessage, errorId: '50' });
    const expectedErrors = defaultErrors.push(itemsFetchError);

    expect(errorsReducer(defaultErrors, action)).toEqual(expectedErrors);
  });

  it('creates correct error on post item failure', () => {
    const failItemPost = postItemFailFactory(() => '50');
    const errorMessage = 'Failed to post item';
    const error = new Error(errorMessage);
    const action = failItemPost(error, '50');
    const itemPostError = new MyError({ message: errorMessage, errorId: '50' });
    const expectedErrors = defaultErrors.push(itemPostError);

    expect(errorsReducer(defaultErrors, action)).toEqual(expectedErrors);
  });

  it('removes error correctly', () => {
    const action = deleteError(defaultErrorId);
    const expectedErrors = defaultErrors.filter((error: MyError) => error.errorId !== defaultErrorId);

    expect(errorsReducer(defaultErrors, action)).toEqual(expectedErrors);
  });
});
