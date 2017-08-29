import {
  getItemsOperationFactory,
  postItemOperationFactory,
} from '../../src/repositories/itemsRepository';
import { MAIN_ROUTE } from '../../src/constants/routes';
import { ServerItem } from '../../src/models/ServerItem';
import {
  IResponse,
  IHttpRequestOptions,
} from '../../src/utils/ajax';

describe('items repository', () => {
  const postItemText = 'blublop';
  const postedItemId = '5';
  const postedItem = {
    text: postItemText,
    id: postedItemId,
  };
  const receivedItems: Array<ServerItem> = [postedItem];

  const fetchResponse: IResponse = { ok: true, json: () => Promise.resolve(receivedItems) };
  const getItemsError = new Error('Failed to fetch items. You are offline.');
  const successfulGetItemsFetch = (_route: string, _options: IHttpRequestOptions): Promise<IResponse> =>
    Promise.resolve(fetchResponse);
  const failedGetItemsOperation = () => Promise.reject(getItemsError);

  const postResponse: IResponse = { ok: true, json: () => Promise.resolve(postedItem) };
  const postItemError = new Error('Failed to post item. You are offline.');
  const successfulPostItemFetch = (_route: string, _options: IHttpRequestOptions): Promise<IResponse> =>
    Promise.resolve(postResponse);
  const failedPostItemOperation = (_text: string) => Promise.reject(postItemError);


  it('calls fetch in fetchItems with MAIN_ROUTE argument', () => {
    const fetchMock = jest.fn(successfulGetItemsFetch);
    const getItemsOperation = getItemsOperationFactory(fetchMock);

    return getItemsOperation()
      .then(() => expect(fetchMock.mock.calls[0][0]).toEqual(MAIN_ROUTE));
  });

  it('calls fetch in postItem with MAIN_ROUTE argument', () => {
    const fetchMock = jest.fn(successfulPostItemFetch);
    const postItemOperation = postItemOperationFactory(fetchMock);

    return (postItemOperation(postItemText))
      .then(() => expect(fetchMock.mock.calls[0][0]).toEqual(MAIN_ROUTE));
  });

  it('calls fetch in postItem with correct options', () => {
    const fetchMock = jest.fn(successfulPostItemFetch);
    const postItemOperation = postItemOperationFactory(fetchMock);

    return (postItemOperation(postItemText))
      .then(() => {
        expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
        expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify({ text: postItemText }));
      });
  });

  it('returns correct data on successful postItem', () => {
    const postItemOperation = postItemOperationFactory(successfulPostItemFetch);

    return (postItemOperation(postItemText)
      .then((data) => expect(data).toEqual(postedItem)));
  });

  it('returns correct error on failed postItem', () => {
    const postItemOperation = postItemOperationFactory(failedPostItemOperation);

    return (postItemOperation(postItemText)
      .catch((error) => expect(error).toEqual(postItemError)));
  });

  it('returns correct data on successful getItems', () => {
    const getItemsOperation = getItemsOperationFactory(successfulGetItemsFetch);

    return (getItemsOperation()
      .then((data) => expect(data).toEqual(receivedItems)));
  });

  it('returns correct error on failed getItems', () => {
    const getItemsOperation = getItemsOperationFactory(failedGetItemsOperation);

    return (getItemsOperation()
      .catch((error) => expect(error).toEqual(getItemsError)));
  });
});
