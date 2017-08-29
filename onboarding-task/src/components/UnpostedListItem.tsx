import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IItemViewModel } from '../models/ItemViewModel';

interface IUnpostedListItemDataProps {
  item: IItemViewModel;
}

export class UnpostedListItem extends React.PureComponent<IUnpostedListItemDataProps> {
  static displayName = 'UnpostedListItem';

  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <span>{this.props.item.index + 1}. {this.props.item.text}</span>
      </div>
    );
  }
}
