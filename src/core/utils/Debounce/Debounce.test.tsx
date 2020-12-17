import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Debounce } from '../Debounce/Debounce';
import { HtmlInput } from '../../../reset/HtmlInput/HtmlInput';

describe('debounce', () => {
  it('runs given function immediately when no debounce time is specified', () => {
    const mockFunction = jest.fn();
    const { getByRole } = render(
      <Debounce>
        {(debouncer: Function) => (
          <HtmlInput onChange={() => debouncer(mockFunction)} />
        )}
      </Debounce>,
    );

    const inputElement = getByRole('textbox') as HTMLInputElement;
    expect(mockFunction).not.toBeCalled();
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(mockFunction).toBeCalledTimes(1);
    expect(inputElement.value).toBe('new value');
  });

  it('returns without doing anything when no callback is given', () => {
    const { getByRole } = render(
      <Debounce waitFor={1000}>
        {(debouncer: Function) => <HtmlInput onChange={() => debouncer()} />}
      </Debounce>,
    );

    const inputElement = getByRole('textbox') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(inputElement.value).toBe('new value');
  });

  jest.useFakeTimers();
  it('should be applied to function given to debouncer', () => {
    const mockOnChange = jest.fn();
    const { getByRole } = render(
      <Debounce waitFor={1000}>
        {(debouncer: Function) => (
          <HtmlInput onChange={() => debouncer(mockOnChange)} />
        )}
      </Debounce>,
    );

    const inputElement = getByRole('textbox') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(mockOnChange).not.toBeCalled();
    jest.advanceTimersByTime(1000);
    expect(mockOnChange).toBeCalledTimes(1);
    expect(inputElement.value).toBe('new value');
  });
});
