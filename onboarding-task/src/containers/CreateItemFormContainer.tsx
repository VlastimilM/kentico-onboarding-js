import { connect } from 'react-redux';
import * as React from 'react';

import { postItem } from '../actions/actionCreators';
import {
  CreateItemForm,
  ICreateItemFormCallbacksProps,
} from '../components/CreateItemForm';

const mapDispatchToProps = (dispatch: Dispatch): ICreateItemFormCallbacksProps => ({
  onAdd: (text: string) => dispatch(postItem(text)),
});

const createItemFormContainer: React.ComponentClass = connect(undefined, mapDispatchToProps)(CreateItemForm);

export { createItemFormContainer as CreateItemForm };
