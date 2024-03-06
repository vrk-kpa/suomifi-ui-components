import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../utils/test';

import { Block } from './Block';

const TestBlock = (
  <div data-testid="test-block">
    <Block>Hey this is test</Block>
    <Block padding="xxxl">Hey this is test lead</Block>
    <Block variant="section">Hey this is test bold</Block>
  </div>
);

describe('margin', () => {
  it('should have margin style from margin prop', () => {
    const { container } = render(<Block margin="xs">Test</Block>);
    expect(container.firstChild).toHaveStyle('margin: 10px');
  });

  it('should have margin right and margin left from mx prop', () => {
    const { container } = render(<Block mx="xs">Test</Block>);
    expect(container.firstChild).toHaveStyle(
      'margin-right: 10px; margin-left: 10px;',
    );
  });
});

describe('padding', () => {
  it('should have padding style from padding prop', () => {
    const { container } = render(<Block padding="xs">Test</Block>);
    expect(container.firstChild).toHaveStyle('padding: 10px');
  });

  it('should have padding top and padding bottom from py prop', () => {
    const { container } = render(<Block py="xs">Test</Block>);
    expect(container.firstChild).toHaveStyle(
      'padding-top: 10px; padding-bottom: 10px;',
    );
  });
});

test('calling render with the same component on the same container does not remount', () => {
  const BlockRendered = render(TestBlock);
  const { container } = BlockRendered;
  expect(container.firstChild).toMatchSnapshot();
});

test('should not have basic accessibility issues', axeTest(TestBlock));
