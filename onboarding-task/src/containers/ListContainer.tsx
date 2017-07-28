import { connect } from 'react-redux';

import { List, IListDataProps } from '../components/List';
import { IStore } from '../reducers/appReducer';

const mapStateToProps = (state: IStore): IListDataProps => ({
  orderedIds: state.items.orderedIds,
});

const listContainer: React.ComponentClass = connect(mapStateToProps)(List);

export { listContainer as List };
