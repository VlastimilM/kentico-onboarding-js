import { connect } from 'react-redux';
import { addItem, deleteItem, updateItem } from '../actions/itemsActionCreators.ts';
import { startEditItem, stopEditItem } from '../actions/editedItemsActionCreators.ts';
import { List } from '../components/List.jsx';
import { getViewItems } from '../selectors/getViewItems.js';

const mapStateToProps = state => {
  return {
    list: getViewItems(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addItem: text => {
      dispatch(addItem(text));
    },
    deleteItem: id => {
      dispatch(deleteItem(id));
    },
    updateItem: (id, text) => {
      dispatch(updateItem(id, text));
    },
    startEditingItem: id => {
      dispatch(startEditItem(id));
    },
    stopEditingItem: id => {
      dispatch(stopEditItem(id));
    },
  };
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer as List };
