import { IAction } from '../actions/IAction';

type BasicDispatch = ((action: IAction) => IAction);
type ThunkDispatch = (thunkAction: ((dispatch: Dispatch) => Promise<any>)) => Promise<any>;

declare global {
  type Dispatch =  BasicDispatch & ThunkDispatch;
}
