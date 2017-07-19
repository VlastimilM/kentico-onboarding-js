import React, { PureComponent } from 'react';
import { Button, FormControl, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

class CreateItemForm extends PureComponent {
  static displayName = 'CreateItemForm';

  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  _onInputChange = (e) => {
    this.setState({ text: e.target.value });
  };

  _onAdd = () => {
    this.props.onAdd(this.state.text);

    this.setState({ text: '' });
  };

  _onKeyPress = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      this._onAdd();
    }
  };

  render() {
    return (
      <div>
        <Form inline>
          <FormControl value={this.state.text} onKeyPress={this._onKeyPress} onChange={this._onInputChange} type="text" />
          <Button onClick={this._onAdd}>Add</Button>
        </Form>
      </div>
    );
  }
}

export { CreateItemForm };
