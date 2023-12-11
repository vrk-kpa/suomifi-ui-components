import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test';

import { HintText } from './HintText';

describe('props', () => {
  describe('children', () => {
    it('shows the given text', () => {
      const { container } = render(<HintText>Test text</HintText>);
      expect(container.firstChild).toHaveTextContent('Test text');
    });

    it('is null when no children given', () => {
      const { container } = render(<HintText />);
      expect(container.firstChild).toEqual(null);
    });
  });

  describe('id', () => {
    it('has the given id', () => {
      const { container } = render(<HintText id="test-id">Test text</HintText>);
      expect(container.firstChild).toHaveAttribute('id', 'test-id');
    });
  });

  describe('className', () => {
    it('has the given custom classname', () => {
      const { container } = render(
        <HintText className="custom-style">Test text</HintText>,
      );
      expect(container.firstChild).toHaveClass('custom-style');
    });
  });

  describe('margin', () => {
    it('should have margin style from margin prop', () => {
      const { getByText } = render(<HintText margin="xs">Test</HintText>);
      expect(getByText('Test')).toHaveAttribute('style', 'margin: 10px;');
    });

    it('should have margin prop overwritten from style prop', () => {
      const { getByText } = render(
        <HintText margin="xs" style={{ margin: 2 }}>
          Test
        </HintText>,
      );
      expect(getByText('Test')).toHaveAttribute('style', 'margin: 2px;');
    });
  });
});

test(
  'should not have basic accessibility issues',
  axeTest(<HintText>Test text</HintText>),
);
