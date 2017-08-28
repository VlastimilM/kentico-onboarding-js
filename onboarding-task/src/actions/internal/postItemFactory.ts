import { IAction } from '../IAction';
import { ServerItem } from '../../models/ServerItem';

export interface IPostItemFactoryDependencies {
  postItemOperation: (text: string) => Promise<ServerItem>;
  postItemRequestActionCreator: (text: string) => IAction;
  postItemFailActionCreator: (error: Error, frontendId: string) => IAction;
  receiveItemActionCreator: (json: ServerItem, frontendId: string) => IAction;
}

export const postItemFactory = (dependencies: IPostItemFactoryDependencies) =>
  (text: string) => {
    return (dispatch: Dispatch): Promise<IAction> => {
      const { payload: { id: frontendId } } = dispatch(dependencies.postItemRequestActionCreator(text));

      return dependencies.postItemOperation(text)
        .then((receivedItem: ServerItem) => dispatch(dependencies.receiveItemActionCreator(receivedItem, frontendId)))
        .catch((error: Error) => dispatch(dependencies.postItemFailActionCreator(error, frontendId))
        );
    };
  };

