import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test';

import { StatusText } from './StatusText';

describe('props', () => {
  describe('children', () => {
    it('shows the given text', () => {
      const { container } = render(<StatusText>Test text</StatusText>);
      expect(container.firstChild).toHaveTextContent('Test text');
    });
    it('renders element even without content', () => {
      const { container } = render(<StatusText />);
      expect(container.children.length).toEqual(1);
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

  describe('aria attributes', () => {
    it('should have given aria-live attribute even when empty', () => {
      const { container } = render(<StatusText ariaLiveMode="assertive" />);
      expect(container.firstChild).toHaveAttribute('aria-live', 'assertive');
    });
    it('should have the specified aria-live attribute', () => {
      const { container } = render(
        <StatusText ariaLiveMode="polite">Test text</StatusText>,
      );
      expect(container.firstChild).toHaveAttribute('aria-live', 'polite');
    });
    it('should have aria-atomic set to true by default', () => {
      const { container } = render(<StatusText>Test text</StatusText>);
      expect(container.firstChild).toHaveAttribute('aria-atomic', 'true');
    });

    it('aria-live should be off when disabled', () => {
      const { container } = render(
        <StatusText disabled ariaLiveMode="assertive">
          Test text
        </StatusText>,
      );
      expect(container.firstChild).toHaveAttribute('aria-live', 'off');
    });
  });
});
describe('margin', () => {
  it('should have margin style from margin prop', () => {
    const { container } = render(<StatusText margin="xs" />);
    expect(container.firstChild).toHaveAttribute('style', 'margin: 10px;');
  });

  it('should have margin prop overwritten from style prop', () => {
    const { container } = render(
      <StatusText margin="xs" style={{ margin: 2 }} />,
    );
    expect(container.firstChild).toHaveAttribute('style', 'margin: 2px;');
  });
});
test(
  'should not have basic accessibility issues',
  axeTest(<StatusText>Test text</StatusText>),
);
