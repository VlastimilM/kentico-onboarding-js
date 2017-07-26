import * as React from 'react';
import * as PropTypes from 'prop-types';

import { IItemViewModel } from '../models/ItemViewModel';

interface IEditedListItemDataProps {
  item: IItemViewModel;
}

interface IEditedListItemCallbacksProps {
  onSave: (text: string) => void;
  onDelete: () => void;
  onUpdate: (text: string) => void;
  onCancel: () => void;
}

export class EditedListItem extends React.PureComponent<IEditedListItemDataProps & IEditedListItemCallbacksProps> {
  static displayName = 'EditedListItem';

  static propTypes = {
    item: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  _onChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.props.onUpdate(e.currentTarget.value);
  };

  _onSaveButtonClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onSave(this.props.item.text);
  };

  render() {
    return (
      <div>
        <form className="form-inline" onSubmit={this._onSaveButtonClick}>
          <span>{this.props.item.index + 1}. </span>
          <input className="form-control" value={this.props.item.text} onChange={this._onChange} />
          <button className="btn btn-primary" type="submit">Save</button>
          <button className="btn btn-default"
                  type="button"
                  onClick={this.props.onCancel}>Cancel
          </button>
          <button className="btn btn-danger"
                  type="button"
                  onClick={this.props.onDelete}>Delete
          </button>
        </form>
      </div>
    );
  }
}
