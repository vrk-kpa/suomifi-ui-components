import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Debounce } from '../Debounce/Debounce';
import { HtmlInput } from '../../../reset/HtmlInput/HtmlInput';

describe('debounce', () => {
  jest.useFakeTimers();

  it('runs given function immediately when no debounce time is specified', async () => {
    const mockFunction = jest.fn();
    const user = userEvent.setup({ delay: null });
    const { getByRole } = render(
      <Debounce>
        {(debouncer: Function) => (
          <HtmlInput onChange={() => debouncer(mockFunction)} />
        )}
      </Debounce>,
    );

    const inputElement = getByRole('textbox') as HTMLInputElement;
    expect(mockFunction).not.toBeCalled();
    await user.type(inputElement, 'new value');
    expect(mockFunction).toBeCalledTimes(9);
    expect(inputElement.value).toBe('new value');
  });

  it('should be applied to function given to debouncer', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup({ delay: null });
    const { getByRole } = render(
      <Debounce waitFor={1000}>
        {(debouncer: Function) => (
          <HtmlInput onChange={() => debouncer(mockOnChange)} />
        )}
      </Debounce>,
    );

    const inputElement = getByRole('textbox') as HTMLInputElement;
    await user.type(inputElement, 'new value');
    expect(mockOnChange).not.toBeCalled();
    jest.advanceTimersByTime(500);
    expect(mockOnChange).not.toBeCalled();
    jest.advanceTimersByTime(500);
    expect(mockOnChange).toBeCalledTimes(1);
    expect(inputElement.value).toBe('new value');
  });
});
