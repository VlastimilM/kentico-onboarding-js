import { connect } from 'react-redux';
import * as Immutable from 'immutable';

import { List } from '../components/List';
import { IItem } from '../models/Item';

interface IState {
  items: IItems;
}

// TODO extract interface
interface IItems {
   orderedIds: Immutable.List<string>;
   itemsById: Immutable.Map<string, IItem>;
}

const mapStateToProps = (state: IState) => {
  return {
    orderedIds: state.items.orderedIds,
  };
};

const listContainer = connect(mapStateToProps)(List);

export { listContainer as List };
