import React, { PureComponent } from 'react';
import { Button, FormControl, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

class EditedListItem extends PureComponent {
  static displayName = 'EditedListItem';

  static propTypes = {
    item: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };
  _onKeyPress = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      this.props.onSave(this.props.item.text);
    }
  };

  _onChange = (e) => {
    this.props.onUpdate(e.target.value);
  };

  _onSaveButtonClick = () => {
    this.props.onSave(this.props.item.text);
  };

  render() {
    return (
      <div>
        <Form inline>
          <span>{this.props.item.index + 1}. </span>
          <FormControl value={this.props.item.text} onChange={this._onChange} onKeyPress={this._onKeyPress} />
          <Button onClick={this._onSaveButtonClick} bsStyle="primary">Save</Button>
          <Button onClick={this.props.onCancel}>Cancel</Button>
          <Button onClick={this.props.onDelete} bsStyle="danger">Delete</Button>
        </Form>
      </div>
    );
  }
}

export { EditedListItem };
