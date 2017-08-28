import { IAction } from '../IAction';
import { ServerItem } from '../../models/ServerItem';

export interface IFetchItemsFactoryDependencies {
  getItemsOperation: () => Promise<Array<ServerItem>>;
  fetchItemsFailActionCreator: (error: Error) => IAction;
  requestItemsActionCreator: () => IAction;
  receiveItemsActionCreator: (json: Array<ServerItem>) => IAction;
}

export const fetchItemsFactory = (dependencies: IFetchItemsFactoryDependencies) =>
  () =>
    (dispatch: Dispatch): Promise<IAction> => {
      dispatch(dependencies.requestItemsActionCreator());

      return dependencies.getItemsOperation()
        .then((receivedItems: Array<ServerItem>) => dispatch(dependencies.receiveItemsActionCreator(receivedItems)))
        .catch((error: Error) => dispatch(dependencies.fetchItemsFailActionCreator(error))
        );
    };

