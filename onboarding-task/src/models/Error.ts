import { TypeRecord } from './TypeRecord';

interface IError {
  readonly message: string;
  readonly errorId: string;
}

const defaultError: IError = {
  message: '',
  errorId: '',
};

class ErrorRecord extends TypeRecord<ErrorRecord, IError>(defaultError) implements IError {
  readonly message: string;
  readonly errorId: string;
}

export { ErrorRecord as Error, IError };
