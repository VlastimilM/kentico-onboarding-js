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

  it('updates record correctly', () => {
    const updatedRecord = new TestRecord({ text: 'steak' })
      .withValues({ text: 'schnitzel' })
      .withValues({ text: defaultText });
    const expected = new TestRecord();

    expect(updatedRecord).toEqual(expected);
    expect(typeof updatedRecord).toBe(typeof expected);
  });
});



