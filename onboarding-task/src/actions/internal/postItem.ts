import { failPostItem, receiveItem, requestPostItem, addItem } from '../actionCreators';

// TODO DI
export const postItem = (text: string): any => {
  return (dispatch: Dispatch) => {
    let header = new Headers({
      'Content-Type': 'application/json',
    });
    dispatch(requestPostItem());
    console.log(addItem(text));
    dispatch(addItem(text));

    fetch('/api/v1/ListItems/', {
      method: 'POST',
      headers: header,
      body: JSON.stringify({ text })
    })
      .then((response: any) => response.json(), (error: any) => {
        throw new Error(error);
      })
      .then((json: any) => dispatch(receiveItem(json)), () => dispatch(failPostItem()));
  };
};

