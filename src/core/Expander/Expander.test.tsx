import React from 'react';
import { render } from 'react-testing-library';
import { axeTest } from '../../utils/test/axe';

import { Expander } from './Expander';
import { cssFromBaseStyles } from '../utils';
import { baseStyles } from './Panel.baseStyles';

const TestExpander = (
  <Expander
    title="Test expander"
    titleProps={{ 'data-testid': 'expander-title' }}
    className="expander-test"
  >
    Test expander content
  </Expander>
);

test('calling render with the same component on the same container does not remount', () => {
  const panelRenderer = render(TestExpander);
  const { getByTestId, container, rerender } = panelRenderer;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('expander-title').textContent).toBe('Test expander');

  // re-render the same component with different props
  rerender(
    <Expander
      title="Test expander two"
      titleProps={{ 'data-testid': 'expander-title-2' }}
    >
      Test expander content
    </Expander>,
  );
  expect(getByTestId('expander-title-2').textContent).toBe('Test expander two');
});

test('CSS export', () => {
  const css = cssFromBaseStyles(baseStyles);
  expect(css).toEqual(expect.stringContaining('background-color'));
});

test('should not have basic accessibility issues', axeTest(TestExpander));
