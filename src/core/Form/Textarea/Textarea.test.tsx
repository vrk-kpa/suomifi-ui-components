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
    test('should notice click', () => {
      const mockOnClick = jest.fn();
      const { getByRole } = render(
        <Textarea labelText="label" onClick={mockOnClick} />,
      );
      const textarea = getByRole('textbox');
      fireEvent.mouseDown(textarea);
      expect(mockOnClick).toBeCalledTimes(1);
    });
  });
});
