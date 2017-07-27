import { Record } from 'immutable';

export function TypeRecord<TInstance, TProperties>(defaultObject: TProperties) {
  return class InternalTypeRecord extends Record(defaultObject) {
    constructor(params?: Partial<TProperties>) {
      params ? super(params) : super();
    }

    withValues(values: Partial<TProperties>): TInstance {
      return this.merge(values) as any as TInstance;
    }
  };
};
