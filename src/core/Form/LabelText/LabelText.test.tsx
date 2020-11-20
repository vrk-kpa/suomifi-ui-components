import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test/axe';

import { LabelText } from './LabelText';

describe('props', () => {
  describe('children', () => {
    it('shows the given text', () => {
      const { container } = render(<LabelText>Test text</LabelText>);
      expect(container.firstChild).toHaveTextContent('Test text');
    });
  });

  describe('optionalText', () => {
    it('has the optional text element', () => {
      const { getByText } = render(
        <LabelText optionalText="optional">Test text</LabelText>,
      );
      const optionalText = getByText('(optional)');
      expect(optionalText).toHaveClass('fi-label-text_optionalText');
    });
  });

  describe('id', () => {
    it('has the given id', () => {
      const { container } = render(
        <LabelText id="test-id">Test text</LabelText>,
      );
      expect(container.firstChild).toHaveAttribute('id', 'test-id');
    });
  });

  describe('className', () => {
    it('has the given custom classname', () => {
      const { container } = render(
        <LabelText className="custom-style">Test text</LabelText>,
      );
      expect(container.firstChild).toHaveClass('custom-style');
    });
  });

  describe('labelMode', () => {
    it('should be visible by default', () => {
      const { getByText } = render(<LabelText>Test text</LabelText>);
      const label = getByText('Test text');
      expect(label).toHaveClass('fi-label-text_label-span');
    });

    it('should be hidden', () => {
      const { getByText } = render(
        <LabelText labelMode="hidden">Test text</LabelText>,
      );
      const label = getByText('Test text');
      expect(label).toHaveClass('fi-visually-hidden');
    });
  });

  describe('asProp', () => {
    it('has default of div as wrapping element', () => {
      const { container } = render(<LabelText>Test text</LabelText>);
      expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
    });

    it('has the given wrapper element', () => {
      const { container } = render(<LabelText as="label">Test text</LabelText>);
      expect(container.firstChild).toBeInstanceOf(HTMLLabelElement);
    });
  });

  describe('labelSpanProps', () => {
    it('has the given props', () => {
      const { getByText } = render(
        <LabelText labelSpanProps={{ style: { fontSize: 12 } }}>
          Test text
        </LabelText>,
      );
      const textSpan = getByText('Test text');
      expect(textSpan).toHaveAttribute('style', 'font-size: 12px;');
    });
  });
});

test(
  'should not have basic accessibility issues',
  axeTest(<LabelText>Test text</LabelText>),
);
