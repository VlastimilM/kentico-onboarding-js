import { requestItems, receiveItems } from '../actionCreators';
import { IAction } from '../IAction';
import { ServerItem } from '../../models/ServerItem';

export interface IFetchItemsFactoryDependencies {
  getItemsOperation: () => Promise<any>;
  fetchItemsFailActionCreator: (error: Error) => IAction;
}

export const fetchItemsFactory = (dependencies: IFetchItemsFactoryDependencies) =>
  () =>
    (dispatch: Dispatch): Promise<IAction> => {
      dispatch(requestItems());

      return dependencies.getItemsOperation()
        .then((receivedItems: Array<ServerItem>) => dispatch(receiveItems(receivedItems)))
        .catch((error: Error) => dispatch(dependencies.fetchItemsFailActionCreator(error)));
    };

