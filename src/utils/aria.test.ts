import { getConditionalAriaProp } from './aria';

describe('getConditionalAriaProp', () => {
  it('is empty when empty array was given', () => {
    const data = getConditionalAriaProp('aria-describedby', []);
    const expectation = {};
    expect(expectation).toEqual(data);
  });

  it('has the given id', () => {
    const data = getConditionalAriaProp('aria-describedby', ['other-id']);
    const expectation = { 'aria-describedby': 'other-id' };
    expect(expectation).toEqual(data);
  });

  it('has all the given ids', () => {
    const data = getConditionalAriaProp('aria-labelledby', [
      'other-id',
      'another-id',
      undefined,
      'example-id',
    ]);
    const expectation = {
      'aria-labelledby': 'other-id another-id example-id',
    };
    expect(expectation).toEqual(data);
  });

  it('is empty because condition was falsey', () => {
    const data = getConditionalAriaProp('aria-describedby', [undefined]);
    const expectation = {};
    expect(expectation).toEqual(data);
  });

  it('has correct string for aria-label', () => {
    const data = getConditionalAriaProp('aria-label', [
      'This is a test aria label.',
    ]);
    const expectation = {
      'aria-label': 'This is a test aria label.',
    };
    expect(expectation).toEqual(data);
  });
});
