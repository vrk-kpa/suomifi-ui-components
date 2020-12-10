import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Debounce } from '../Debounce/Debounce';
import { TextInput } from '../../Form/TextInput/TextInput';

describe('debounce', () => {
  it('runs the children function wrapped by it', () => {
    const mockFunction = jest.fn(() => 12);
    render(
      <Debounce data-testid="abc" waitFor={1000}>
        {mockFunction}
      </Debounce>,
    );
    expect(mockFunction).toBeCalledTimes(1);
  });

  describe('debounce', () => {
    jest.useFakeTimers();
    it('should be applied to function given to debouncer', () => {
      const mockOnChange = jest.fn();
      const { getByTestId } = render(
        <Debounce waitFor={1000}>
          {(debouncer: Function) => (
            <TextInput
              labelText="Test text input"
              onChange={debouncer(mockOnChange)}
              data-testid="input"
            />
          )}
        </Debounce>,
      );

      const inputElement = getByTestId('input') as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: 'new value' } });
      expect(mockOnChange).not.toBeCalled();
      jest.advanceTimersByTime(1000);
      expect(mockOnChange).toBeCalledTimes(1);
      expect(inputElement.value).toBe('new value');
    });
  });
});
