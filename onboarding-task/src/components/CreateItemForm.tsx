import * as React from 'react';
import * as PropTypes from 'prop-types';

import { isNullOrWhitespace } from '../utils/textValidator';

export interface ICreateItemFormCallbacksProps {
  //onAdd: (text: string) => void;
  onPost: (text: string) => void;
}

interface ICreateItemFormState {
  text: string;
}

export class CreateItemForm extends React.PureComponent<ICreateItemFormCallbacksProps, ICreateItemFormState> {
  static displayName = 'CreateItemForm';

  static propTypes = {
    //onAdd: PropTypes.func.isRequired,
    onPost: PropTypes.func.isRequired,
  };

  constructor(props: ICreateItemFormCallbacksProps) {
    super(props);
    this.state = { text: '' };
  }

  _onInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ text: e.currentTarget.value });
  };

  _onAdd = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isNullOrWhitespace(this.state.text)) {
      return;
    }
    // TODO onAdd not needed?
    // this.props.onAdd(this.state.text);
    this.props.onPost(this.state.text);
    this.setState({ text: '' });
  };

  render() {
    let addButtonDisabled = isNullOrWhitespace(this.state.text);
    return (
      <div>
        <form className="form-inline" onSubmit={this._onAdd}>
          <input className="form-control" value={this.state.text} onChange={this._onInputChange} />
          <button className="btn btn-default" type="submit" disabled={addButtonDisabled}>
            Add
          </button>
        </form>
      </div>
    );
  }
}
