import * as React from 'react';
import * as PropTypes from 'prop-types';

import { isNullOrWhitespace } from '../utils/textValidator';

export interface ICreateItemFormCallbacksProps {
  onAdd: (text: string) => void;
}

interface ICreateItemFormState {
  text: string;
}

export class CreateItemForm extends React.PureComponent<ICreateItemFormCallbacksProps, ICreateItemFormState> {
  static displayName = 'CreateItemForm';

  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

  constructor(props: ICreateItemFormCallbacksProps) {
    super(props);
    this.state = {
      text: '',
    };
  }

  _onInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ text: e.currentTarget.value });
  };

  _onAdd = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isNullOrWhitespace(this.state.text)) {
      alert('Text cant be empty');
      return;
    }
    this.props.onAdd(this.state.text);

    this.setState({ text: '' });
  };

  render() {
    return (
      <div>
        <form className="form-inline" onSubmit={this._onAdd}>
          <input className="form-control" value={this.state.text} onChange={this._onInputChange} />
          <button className="btn btn-default" type="submit">Add</button>
        </form>
      </div>
    );
  }
}
