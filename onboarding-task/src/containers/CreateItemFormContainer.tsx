import { connect } from 'react-redux';
import * as React from 'react';

//import { addItem } from '../actions/actionCreators';
import { postItem } from '../actions/actionCreators';
import { CreateItemForm, ICreateItemFormCallbacksProps } from '../components/CreateItemForm';

const mapDispatchToProps = (dispatch: Dispatch): ICreateItemFormCallbacksProps => ({
  //onAdd: (text: string) => dispatch(addItem(text)),
  onPost: (text: string) => dispatch(postItem(text)),
});

const createItemFormContainer: React.ComponentClass = connect(undefined, mapDispatchToProps)(CreateItemForm);

export { createItemFormContainer as CreateItemForm };
