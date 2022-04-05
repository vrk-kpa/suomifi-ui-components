import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test';

import { Label } from './Label';

describe('props', () => {
  describe('children', () => {
    it('shows the given text', () => {
      const { container } = render(<Label>Test text</Label>);
      expect(container.firstChild).toHaveTextContent('Test text');
    });
  });

  describe('optionalText', () => {
    it('has the optional text element', () => {
      const { getByText } = render(
        <Label optionalText="optional">Test text</Label>,
      );
      const optionalText = getByText('(optional)');
      expect(optionalText).toHaveClass('fi-label-text_optionalText');
    });
  });

  describe('id', () => {
    it('has the given id', () => {
      const { container } = render(<Label id="test-id">Test text</Label>);
      expect(container.firstChild).toHaveAttribute('id', 'test-id');
    });
  });

  describe('className', () => {
    it('has the given custom classname', () => {
      const { container } = render(
        <Label className="custom-style">Test text</Label>,
      );
      expect(container.firstChild).toHaveClass('custom-style');
    });
  });

  describe('labelMode', () => {
    it('should be visible by default', () => {
      const { getByText } = render(<Label>Test text</Label>);
      const label = getByText('Test text');
      expect(label).toHaveClass('fi-label-text_label-span');
    });

    it('should be hidden', () => {
      const { getByText } = render(<Label labelMode="hidden">Test text</Label>);
      const label = getByText('Test text');
      expect(label).toHaveClass('fi-visually-hidden');
    });
  });

  describe('asProp', () => {
    it('has default of label as wrapping element', () => {
      const { container } = render(<Label>Test text</Label>);
      expect(container.firstChild).toBeInstanceOf(HTMLLabelElement);
    });

    it('has the given wrapper element', () => {
      const { container } = render(<Label asProp="div">Test text</Label>);
      expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('labelSpanProps', () => {
    it('has the given props', () => {
      const { getByText } = render(
        <Label style={{ fontSize: 12 }}>Test text</Label>,
      );
      const textSpan = getByText('Test text');
      expect(textSpan).toHaveAttribute('style', 'font-size: 12px;');
    });
  });
});

test(
  'should not have basic accessibility issues',
  axeTest(<Label>Test text</Label>),
);
