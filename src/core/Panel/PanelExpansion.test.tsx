import React from 'react';
import { render } from 'react-testing-library';
import { axeTest } from '../../utils/test/axe';

import { PanelExpansion } from './PanelExpansion';
import { cssFromBaseStyles } from '../utils';
import { baseStyles } from './Panel.baseStyles';

const TestPanelExpansion = (
  <PanelExpansion
    title="Test expansion"
    titleProps={{ 'data-testid': 'panel-expansion-title' }}
    className="panel-expansion-test"
  >
    Test expansion content
  </PanelExpansion>
);

test('calling render with the same component on the same container does not remount', () => {
  const panelRenderer = render(TestPanelExpansion);
  const { getByTestId, container, rerender } = panelRenderer;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('panel-expansion-title').textContent).toBe(
    'Test expansion',
  );

  // re-render the same component with different props
  rerender(
    <PanelExpansion
      title="Test expansion two"
      titleProps={{ 'data-testid': 'panel-expansion-title-2' }}
    >
      Test expansion content
    </PanelExpansion>,
  );
  expect(getByTestId('panel-expansion-title-2').textContent).toBe(
    'Test expansion two',
  );
});

test('CSS export', () => {
  const css = cssFromBaseStyles(baseStyles);
  expect(css).toEqual(expect.stringContaining('background-color'));
});

test('should not have basic accessibility issues', axeTest(TestPanelExpansion));
