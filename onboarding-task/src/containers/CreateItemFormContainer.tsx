import { connect } from 'react-redux';

import { addItem } from '../actions/actionCreators';
import { CreateItemForm } from '../components/CreateItemForm';

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (text) => dispatch(addItem(text)),
  };
};

const createItemFormContainer = connect(undefined, mapDispatchToProps)(CreateItemForm);

export { createItemFormContainer as CreateItemForm };
