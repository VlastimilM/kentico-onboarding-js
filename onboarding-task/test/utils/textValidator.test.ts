import { isNullOrWhitespace } from '../../src/utils/textValidator';

describe('textValidator', () => {
  const nonEmptyText = 'hzabababa';
  const emptyText = '';
  const whitespaceText = '/s/t/n      /n/t/t    ';

  it('returns false on non-empty string', () => {
    expect(isNullOrWhitespace(nonEmptyText)).toEqual(false);
  });

  it('returns true on empty string', () => {
    expect(isNullOrWhitespace(emptyText)).toEqual(true);
  });

  it('returns false on whitespace string', () => {
    expect(isNullOrWhitespace(whitespaceText)).toEqual(false);
  });
});



