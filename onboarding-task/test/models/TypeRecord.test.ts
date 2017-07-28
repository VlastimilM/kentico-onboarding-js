import { TypeRecord } from '../../src/models/TypeRecord';

describe('TypeRecord', () => {
  interface ITestObject {
    text: string;
  }
  const defaultText = 'svickova';
  const defaultObject: ITestObject = { text: defaultText };

  class TestRecord extends TypeRecord<TestRecord, ITestObject>(defaultObject) implements ITestObject {
    readonly text: string;
  }

  it('withValues returns instance of correct TypeRecord', () => {
    const updatedRecord = new TestRecord({ text: 'steak' })
      .withValues({ text: 'schnitzel' });

    expect(() => {
      updatedRecord.withValues({ text: 'bratwurst' });
    }).not.toThrow();
  });
});
