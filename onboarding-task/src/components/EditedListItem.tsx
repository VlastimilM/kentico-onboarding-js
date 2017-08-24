import * as React from 'react';
import * as PropTypes from 'prop-types';

import { IItemViewModel } from '../models/ItemViewModel';
import { isNullOrWhitespace } from '../utils/textValidator';

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
    if (isNullOrWhitespace(this.props.item.text)) {
      return;
    }
    this.props.onSave(this.props.item.text);
  };

  _onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      this.props.onCancel();
    }
  };

  render() {
    const saveButtonDisabled = isNullOrWhitespace(this.props.item.text);
    return (
      <div>
        <form className="form-inline"
              onSubmit={this._onSaveButtonClick}
              onKeyDown={this._onKeyDown}>
          <span>{this.props.item.index + 1}. </span>
          <input className="form-control" value={this.props.item.text} onChange={this._onChange} />
          <button className="btn btn-primary" type="submit" disabled={saveButtonDisabled}>
            Save
          </button>
          <button className="btn btn-default" type="button" onClick={this.props.onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" type="button" onClick={this.props.onDelete}>
            Delete
          </button>
        </form>
      </div>
    );
  }
}
