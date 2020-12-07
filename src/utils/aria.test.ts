import { getAriaDescribedByProp } from './aria';

describe('getAriaDescribedByProp', () => {
  it('is empty when empty array was given', () => {
    const data = getAriaDescribedByProp([]);
    const expectation = {};
    expect(expectation).toEqual(data);
  });

  it('has the given id', () => {
    const data = getAriaDescribedByProp(['other-id']);
    const expectation = { 'aria-describedby': 'other-id' };
    expect(expectation).toEqual(data);
  });

  it('has all the given ids', () => {
    const data = getAriaDescribedByProp([
      'other-id',
      'another-id',
      undefined,
      'example-id',
    ]);
    const expectation = {
      'aria-describedby': 'other-id another-id example-id',
    };
    expect(expectation).toEqual(data);
  });

  it('is empty because condition was falsey', () => {
    const data = getAriaDescribedByProp([undefined]);
    const expectation = {};
    expect(expectation).toEqual(data);
  });
});
