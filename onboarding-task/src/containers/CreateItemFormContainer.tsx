import { connect } from 'react-redux';
import * as React from 'react';

import { addItem } from '../actions/actionCreators';
import { CreateItemForm, ICreateItemFormCallbacksProps } from '../components/CreateItemForm';

const mapDispatchToProps = (dispatch: Dispatch): ICreateItemFormCallbacksProps => ({
  onAdd: (text: string) => dispatch(addItem(text)),
});

const createItemFormContainer: React.ComponentClass = connect(undefined, mapDispatchToProps)(CreateItemForm);

export { createItemFormContainer as CreateItemForm };
