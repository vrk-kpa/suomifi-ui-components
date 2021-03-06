import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test/axe';

import { StatusText } from './StatusText';

describe('props', () => {
  describe('children', () => {
    it('shows the given text', () => {
      const { container } = render(<StatusText>Test text</StatusText>);
      expect(container.firstChild).toHaveTextContent('Test text');
    });

    it('is null when no children given', () => {
      const { container } = render(<StatusText />);
      expect(container.firstChild).toEqual(null);
    });
  });

  describe('id', () => {
    it('has the given id', () => {
      const { container } = render(
        <StatusText id="test-id">Test text</StatusText>,
      );
      expect(container.firstChild).toHaveAttribute('id', 'test-id');
    });
  });

  describe('className', () => {
    it('has the given custom classname', () => {
      const { container } = render(
        <StatusText className="custom-style">Test text</StatusText>,
      );
      expect(container.firstChild).toHaveClass('custom-style');
    });
  });

  describe('status', () => {
    it('has error style', () => {
      const { container } = render(
        <StatusText status="error">Test text</StatusText>,
      );
      expect(container.firstChild).toHaveClass('fi-status-text--error');
    });
  });

  describe('disabled', () => {
    it('is null when disabled', () => {
      const { container } = render(<StatusText disabled>Test text</StatusText>);
      expect(container.firstChild).toEqual(null);
    });
  });
});

test(
  'should not have basic accessibility issues',
  axeTest(<StatusText>Test text</StatusText>),
);
