import { TypeRecord } from './TypeRecord';

interface IError {
  readonly message: string;
}

const defaultError: IError = {
  message: '',
};

class ErrorRecord extends TypeRecord<ErrorRecord, IError>(defaultError) implements IError {
  readonly message: string;
}

export { ErrorRecord as Error, IError };
