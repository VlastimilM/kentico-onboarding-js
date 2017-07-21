import { connect, Dispatch } from 'react-redux';
import * as React from 'react';

import { addItem } from '../actions/actionCreators';
import { CreateItemForm, ICreateItemFormProps } from '../components/CreateItemForm';

// TODO dispatch type
const mapDispatchToProps = (dispatch: Dispatch<any>): ICreateItemFormProps => {
  return {
    onAdd: (text: string) => dispatch(addItem(text)),
  };
};

const createItemFormContainer: React.ComponentClass = connect(undefined, mapDispatchToProps)(CreateItemForm);

export { createItemFormContainer as CreateItemForm };
