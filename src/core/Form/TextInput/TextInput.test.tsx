import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axeTest } from '../../../utils/test/axe';

import { TextInput } from './TextInput';

const TestTextInput = (
  <TextInput labelText="Test input" data-testid="textinput" id="test-id" />
);

const TestTextInput2 = (
  <TextInput
    labelText="Test input"
    inputProps={{ 'data-testid': 'textinput1' }}
    id="test-id1"
    labelMode="hidden"
    visualPlaceholder="Test TextInput"
  />
);

const TestTextInput3 = (
  <TextInput
    labelText="Test input"
    inputProps={{ 'data-testid': 'textinput2' }}
    id="test-id2"
    visualPlaceholder="Test TextInput"
    statusText="This is a status text"
    status="error"
  />
);

describe('snapshots match', () => {
  test('minimal implementation', () => {
    const buttonRendered = render(TestTextInput);
    const { container } = buttonRendered;
    expect(container.firstChild).toMatchSnapshot();
  });
  test('hidden label with placeholder', () => {
    const buttonRendered = render(TestTextInput2);
    const { container } = buttonRendered;
    expect(container.firstChild).toMatchSnapshot();
  });
  test('error status with statustext', () => {
    const buttonRendered = render(TestTextInput3);
    const { container } = buttonRendered;
    expect(container.firstChild).toMatchSnapshot();
  });
});

test('should not have basic accessibility issues', axeTest(TestTextInput));

describe('props', () => {
  describe('className', () => {
    it('has the given custom className', () => {
      const { container } = render(
        <TextInput labelText="Test input" className="custom-style" />,
      );
      expect(container.firstChild).toHaveClass('custom-style');
    });
  });

  describe('hintText', () => {
    it('has the hint text element', () => {
      const { getByText } = render(
        <TextInput labelText="Test input" hintText="Example hint text" />,
      );
      const hintText = getByText('Example hint text');
      expect(hintText).toHaveClass('fi-text-input_hintText');
    });
  });

  describe('type', () => {
    describe('text (default)', () => {
      const textInput = (
        <TextInput
          labelText="Test input"
          type="text"
          inputProps={{ 'data-testid': 'text-input' }}
        />
      );
      const { getByTestId } = render(textInput);
      const textfield = getByTestId('text-input') as HTMLInputElement;

      it('shows the inputted text', () => {
        fireEvent.change(textfield, { target: { value: 'abc 123' } });
        expect(textfield.value).toBe('abc 123');
      });
    });

    describe('name', () => {
      const textInput = (
        <TextInput
          labelText="Test input"
          name="test-name"
          inputProps={{ 'data-testid': 'input-name' }}
        />
      );
      const { getByTestId } = render(textInput);
      const namedInput = getByTestId('input-name') as HTMLInputElement;

      it('has the given name attribute', () => {
        expect(namedInput.name).toBe('test-name');
      });
    });

    describe('number', () => {
      const textInput = (
        <TextInput
          labelText="Test input"
          type="number"
          inputProps={{ 'data-testid': 'number-input' }}
        />
      );
      const { getByTestId } = render(textInput);
      const numberfield = getByTestId('number-input') as HTMLInputElement;

      it('shows the inputted numbers', () => {
        fireEvent.change(numberfield, { target: { value: '123' } });
        expect(numberfield.value).toBe('123');
      });

      it('does not allow text', () => {
        fireEvent.change(numberfield, { target: { value: 'abc' } });
        expect(numberfield.value).toBe('');
        fireEvent.change(numberfield, { target: { value: 'abc 123' } });
        expect(numberfield.value).toBe('');
      });
    });
  });

  describe('disabled', () => {
    it('has disabled attribute and classname', () => {
      const { container, getByTestId } = render(
        <TextInput
          labelText="Test input"
          inputProps={{ 'data-testid': 'input' }}
          disabled
        />,
      );
      expect(container.firstChild).toHaveClass('fi-text-input--disabled');

      const inputField = getByTestId('input') as HTMLInputElement;
      expect(inputField).toHaveAttribute('disabled');
    });
  });

  describe('labelText', () => {
    it('should be found ', () => {
      const { getByText } = render(<TextInput labelText="Test input" />);
      const label = getByText('Test input');
      expect(label).toHaveClass('fi-text-input_label-p');
    });
  });

  describe('labelMode', () => {
    it('should be visible by default', () => {
      const { getByText } = render(<TextInput labelText="Test input" />);
      const label = getByText('Test input');
      expect(label).toHaveClass('fi-text-input_label-p');
    });

    it('should be hidden', () => {
      const { getByText } = render(
        <TextInput labelText="Test input" labelMode="hidden" />,
      );
      const label = getByText('Test input');
      expect(label).toHaveClass('fi-visually-hidden');
    });
  });

  describe('visualPlaceholder', () => {
    it('should have the given text', () => {
      const { getByTestId } = render(
        <TextInput
          labelText="Test input"
          inputProps={{ 'data-testid': 'input' }}
          visualPlaceholder="Enter text here"
        />,
      );
      const inputField = getByTestId('input') as HTMLInputElement;
      expect(inputField).toHaveAttribute('placeholder', 'Enter text here');
    });
  });

  describe('icon', () => {
    it('should have the correct classname when icon prop is given', () => {
      const { container } = render(
        <TextInput labelText="Test input" icon="close" />,
      );
      expect(container.firstChild).toHaveClass('fi-text-input_with-icon');
    });

    it('should have an icon element when one is specified', () => {
      const { container } = render(
        <TextInput labelText="Test input" icon="close" />,
      );
      const icon = container.querySelector('.fi-icon');
      expect(container.contains(icon)).toBeTruthy();
    });
  });
});
