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
  const successfulGetItemsFetch = (_route: string, _options: IHttpRequestOptions): Promise<IResponse> =>
    Promise.resolve(fetchResponse);

  const postResponse: IResponse = { ok: true, json: () => Promise.resolve(postedItem) };
  const successfulPostItemFetch = (_route: string, _options: IHttpRequestOptions): Promise<IResponse> =>
    Promise.resolve(postResponse);

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
});
