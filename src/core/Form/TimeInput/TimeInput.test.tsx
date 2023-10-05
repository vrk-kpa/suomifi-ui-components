import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axeTest } from '../../../utils/test';

import { TimeInput } from './TimeInput';

describe('snapshots match', () => {
  test('minimal implementation', () => {
    const inputRendered = render(
      <TimeInput labelText="Test input" data-testid="TimeInput" id="test-id" />,
    );
    const { container } = inputRendered;
    expect(container.firstChild).toMatchSnapshot();
  });

  test('hint text', () => {
    const { baseElement } = render(
      <TimeInput
        labelText="Test input"
        data-testid="TimeInput2"
        id="test-id2"
        hintText="Use format H.mm"
      />,
    );
    expect(baseElement).toMatchSnapshot();
  });

  test('hidden label', () => {
    const inputRendered = render(
      <TimeInput
        labelText="Test input"
        data-testid="TimeInput3"
        id="test-id3"
        labelMode="hidden"
      />,
    );
    const { container } = inputRendered;
    expect(container.firstChild).toMatchSnapshot();
  });

  test('error status with statustext', () => {
    const inputRendered = render(
      <TimeInput
        labelText="Test input"
        data-testid="TimeInput4"
        id="test-id4"
        statusText="This is a status text"
        status="error"
      />,
    );
    const { container } = inputRendered;
    expect(container.firstChild).toMatchSnapshot();
  });
});

test(
  'should not have basic accessibility issues',
  axeTest(
    <TimeInput labelText="Test input" data-testid="textinput" id="test-id" />,
  ),
);

describe('props', () => {
  describe('with only minimum props', () => {
    it('has user given aria-describedby on input', () => {
      const { getByRole } = render(
        <TimeInput
          labelText="Test input"
          aria-describedby="external-component-id"
        />,
      );
      expect(getByRole('textbox')).toHaveAttribute(
        'aria-describedby',
        'external-component-id',
      );
    });
  });

  describe('className', () => {
    it('has the given custom className', () => {
      const { container } = render(
        <TimeInput labelText="Test input" className="custom-style" />,
      );
      expect(container.firstChild).toHaveClass('custom-style');
    });
  });

  describe('margin', () => {
    it('should have margin style from margin prop', () => {
      const { container } = render(<TimeInput labelText="" margin="xs" />);
      expect(container.firstChild).toHaveAttribute('style', 'margin: 10px;');
    });

    it('should have margin prop overwritten from wrapperProps', () => {
      const { container } = render(
        <TimeInput
          labelText=""
          margin="xs"
          wrapperProps={{ style: { margin: 2 } }}
        />,
      );
      expect(container.firstChild).toHaveAttribute('style', 'margin: 2px;');
    });
  });

  describe('hintText', () => {
    it('has the hint text element', () => {
      const { getByText } = render(
        <TimeInput labelText="Test input" hintText="Example hint text" />,
      );
      const hintText = getByText('Example hint text');
      expect(hintText).toHaveClass('fi-hint-text');
    });

    it('will be added to input aria-describedby', () => {
      const { getByRole } = render(
        <TimeInput
          labelText="Test input"
          id="123"
          hintText="Example hint text"
        />,
      );
      expect(getByRole('textbox')).toHaveAttribute(
        'aria-describedby',
        '123-hintText',
      );
    });
  });

  describe('statusText', () => {
    it('has the status text element', () => {
      const { getByText } = render(
        <TimeInput labelText="Test input" statusText="Example status text" />,
      );
      const statusText = getByText('Example status text');
      expect(statusText).toHaveClass('fi-status-text');
    });

    it('will be added to input aria-describedby', () => {
      const { getByRole } = render(
        <TimeInput
          labelText="Test input"
          id="123"
          statusText="Example status text"
        />,
      );
      expect(getByRole('textbox')).toHaveAttribute(
        'aria-describedby',
        '123-statusText',
      );
    });
  });

  describe('disabled', () => {
    it('has disabled attribute and classname', () => {
      const { container, getByRole } = render(
        <TimeInput labelText="Test input" data-testid="input" disabled />,
      );
      expect(container.firstChild).toHaveClass('fi-time-input--disabled');

      const inputField = getByRole('textbox') as HTMLInputElement;
      expect(inputField).toHaveAttribute('disabled');
    });
  });

  describe('labelText', () => {
    it('should be found ', () => {
      const { getByText } = render(<TimeInput labelText="Test input" />);
      const label = getByText('Test input');
      expect(label).toHaveClass('fi-label_label-span');
    });
  });

  describe('optionalText', () => {
    it('should have element and correct classname for it', () => {
      const { getByText } = render(
        <TimeInput labelText="label" optionalText="Optional" />,
      );
      const optionalText = getByText('(Optional)');
      expect(optionalText).toHaveClass('fi-label_optional-text');
    });
  });

  describe('labelMode', () => {
    it('should be visible by default', () => {
      const { getByText } = render(<TimeInput labelText="Test input" />);
      const label = getByText('Test input');
      expect(label).toHaveClass('fi-label_label-span');
    });

    it('should be hidden', () => {
      const { getByText } = render(
        <TimeInput labelText="Test input" labelMode="hidden" />,
      );
      const label = getByText('Test input');
      expect(label).toHaveClass('fi-visually-hidden');
    });
  });

  describe('debounce', () => {
    it('delays the running of onChange by the given time', () => {
      jest.useFakeTimers();
      const mockOnChange = jest.fn();
      const textInput = (
        <TimeInput
          labelText="Debounced input"
          debounce={1000}
          onChange={mockOnChange}
        />
      );
      const { getByRole } = render(textInput);

      const inputElement = getByRole('textbox') as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: '12.00' } });
      expect(mockOnChange).not.toBeCalled();
      jest.advanceTimersByTime(1000);
      expect(mockOnChange).toBeCalledTimes(1);
      expect(inputElement.value).toBe('12.00');
    });
    it('resolves right when no onChange is given', () => {
      const textInput = (
        <TimeInput labelText="Debounced input" debounce={1000} />
      );
      const { getByRole } = render(textInput);

      const inputElement = getByRole('textbox') as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: '12.00' } });
      expect(inputElement.value).toBe('12.00');
    });
  });
});

describe('autocomplete features', () => {
  it('should turn a valid 2-digit input into full time', () => {
    const { getByRole } = render(<TimeInput labelText="Test input" />);
    const inputElement = getByRole('textbox') as HTMLInputElement;

    fireEvent.change(inputElement, {
      target: { value: '12' },
    });
    fireEvent.blur(inputElement);
    expect(inputElement.value).toBe('12.00');

    fireEvent.change(inputElement, {
      target: { value: '02' },
    });
    fireEvent.blur(inputElement);
    expect(inputElement.value).toBe('2.00');

    fireEvent.change(inputElement, {
      target: { value: '2' },
    });
    fireEvent.blur(inputElement);
    expect(inputElement.value).toBe('2.00');

    fireEvent.change(inputElement, {
      target: { value: '42' },
    });
    fireEvent.blur(inputElement);
    expect(inputElement.value).not.toBe('42.00');
  });

  it('should turn a valid "military time" into full time', () => {
    const { getByRole } = render(<TimeInput labelText="Test input" />);
    const inputElement = getByRole('textbox') as HTMLInputElement;

    fireEvent.change(inputElement, {
      target: { value: '1200' },
    });
    fireEvent.blur(inputElement);
    expect(inputElement.value).toBe('12.00');

    fireEvent.change(inputElement, {
      target: { value: '0200' },
    });
    fireEvent.blur(inputElement);
    expect(inputElement.value).toBe('2.00');

    fireEvent.change(inputElement, {
      target: { value: '1954' },
    });
    fireEvent.blur(inputElement);
    expect(inputElement.value).toBe('19.54');

    fireEvent.change(inputElement, {
      target: { value: '4200' },
    });
    fireEvent.blur(inputElement);
    expect(inputElement.value).not.toBe('42.00');

    fireEvent.change(inputElement, {
      target: { value: '094' },
    });
    fireEvent.blur(inputElement);
    expect(inputElement.value).toBe('094');
  });

  it('should replace : with . in an otherwise valid time', () => {
    const { getByRole } = render(<TimeInput labelText="Test input" />);
    const inputElement = getByRole('textbox') as HTMLInputElement;

    fireEvent.change(inputElement, {
      target: { value: '12:00' },
    });
    fireEvent.blur(inputElement);
    expect(inputElement.value).toBe('12.00');

    fireEvent.change(inputElement, {
      target: { value: '42:78' },
    });
    fireEvent.blur(inputElement);
    expect(inputElement.value).not.toBe('42.78');
  });

  it('should remove leading zeros from an otherwise valid time', () => {
    const { getByRole } = render(<TimeInput labelText="Test input" />);
    const inputElement = getByRole('textbox') as HTMLInputElement;

    fireEvent.change(inputElement, {
      target: { value: '07.35' },
    });
    fireEvent.blur(inputElement);
    expect(inputElement.value).toBe('7.35');

    fireEvent.change(inputElement, {
      target: { value: '07:35' },
    });
    fireEvent.blur(inputElement);
    expect(inputElement.value).toBe('7.35');
  });
});
