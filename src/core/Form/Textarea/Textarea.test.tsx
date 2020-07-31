import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axeTest } from '../../../utils/test/axe';

import { Textarea } from './Textarea';

describe('props', () => {
  describe('default structure, with default props', () => {
    const DefaultTextareaComponent = <Textarea labelText="Label here" />;

    it('should have baseClassName', () => {
      const { container } = render(DefaultTextareaComponent);
      expect(container.firstChild).toHaveClass('fi-textarea');
    });

    it('should have <textarea< HTML-element with correct class ', () => {
      const { getByRole } = render(DefaultTextareaComponent);
      const textarea = getByRole('textbox');
      expect(textarea).toHaveClass('fi-textarea_textarea');
    });

    it('should have label text with correct class', () => {
      const { getByText } = render(DefaultTextareaComponent);
      const label = getByText('Label here');
      expect(label).toHaveClass('fi-textarea_label');
    });

    it(
      'should not have basic accessibility issues',
      axeTest(DefaultTextareaComponent),
    );
  });

  describe('className', () => {
    it('should have the given custom classname ', () => {
      const { container } = render(
        <Textarea labelText="label" className="custom-classname" />,
      );
      expect(container.firstChild).toHaveClass('custom-classname');
    });
  });

  describe('disabled', () => {
    it('should have disabled attribute and correct class', () => {
      const { container, getByRole } = render(
        <Textarea labelText="label" disabled />,
      );
      expect(container.firstChild).toHaveClass('fi-textarea--disabled');
      const textarea = getByRole('textbox');
      expect(textarea).toHaveAttribute('disabled');
    });
  });

  describe('onBlur', () => {
    test('should notice when leaving area', () => {
      const mockOnBlur = jest.fn();
      const { getByRole } = render(
        <Textarea labelText="label" onBlur={mockOnBlur} />,
      );
      const textarea = getByRole('textbox');
      fireEvent.blur(textarea);
      expect(mockOnBlur).toBeCalledTimes(1);
    });
  });

  describe('onClick', () => {
    it('should notice click', () => {
      const mockOnClick = jest.fn();
      const { getByRole } = render(
        <Textarea labelText="label" onClick={mockOnClick} />,
      );
      const textarea = getByRole('textbox');
      fireEvent.mouseDown(textarea);
      expect(mockOnClick).toBeCalledTimes(1);
    });
  });

  describe('onChange', () => {
    it('should notice change and have the given text', () => {
      const mockOnChange = jest.fn();
      const { getByRole } = render(
        <Textarea labelText="label" onChange={mockOnChange} />,
      );
      const textarea = getByRole('textbox') as HTMLTextAreaElement;
      fireEvent.change(textarea, { target: { value: 'abc' } });
      expect(mockOnChange).toBeCalledTimes(1);
      expect(textarea.value).toBe('abc');
    });
  });

  describe('labelText', () => {
    it('should have the given text on start and after changing to new', () => {
      const { rerender, queryByText } = render(
        <Textarea labelText="Summer time" />,
      );
      expect(queryByText('Summer time')).not.toBeNull();
      rerender(<Textarea labelText="Winter is coming" />);
      expect(queryByText('Winter is coming')).not.toBeNull();
    });
  });

  describe('labelMode', () => {
    it('hidden: should hide visually-hidden classname   ', () => {
      const { getByText } = render(
        <Textarea labelText="To be hidden" labelMode="hidden" />,
      );
      const label = getByText('To be hidden');
      expect(label).toHaveClass('fi-visually-hidden');
    });
  });

  describe('visualPlaceholder', () => {
    it('should have the given text as attribute', () => {
      const { getByRole } = render(
        <Textarea
          labelText="To be hidden"
          visualPlaceholder="Enter text here"
        />,
      );
      const textarea = getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea).toHaveAttribute('placeholder', 'Enter text here');
    });
  });

  describe('children', () => {
    it('should have given children as content for textarea', () => {
      const { getByRole } = render(
        <Textarea labelText="label">Text written!</Textarea>,
      );
      const textarea = getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea).toHaveTextContent('Text written!');
    });
  });

  describe('hintText', () => {
    it('should have element and correct classname for it', () => {
      const { getByText } = render(
        <Textarea labelText="label" hintText="Example hint text" />,
      );
      const hintText = getByText('Example hint text');
      expect(hintText).toHaveClass('fi-textarea_hintText');
    });
  });
});
