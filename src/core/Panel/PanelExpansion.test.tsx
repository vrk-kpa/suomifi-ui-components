// import React from 'react';
// import { render } from 'react-testing-library';

// import { PanelExpansion } from './PanelExpansion';
import { cssFromBaseStyles } from '../utils';
import { baseStyles } from './Panel.baseStyles';

// const Title1 = () => (
//   <span data-testid="panel-expansion-title">Test expansion</span>
// );
// const Title2 = () => (
//   <span data-testid="panel-expansion-title-2">Test expansion two</span>
// );

// test('calling render with the same component on the same container does not remount', () => {
//   const panelRenderer = render(
//     <PanelExpansion
//       title={Title1}
//       titleTag="h3"
//       className="panel-expansion-test"
//       data-testid="panel-expansion"
//     >
//       Test expansion content
//     </PanelExpansion>,
//   );
//   const { getByTestId, container, rerender } = panelRenderer;
//   expect(container.firstChild).toMatchSnapshot();
//   expect(getByTestId('panel-expansion-title').textContent).toBe(
//     'Test expansion',
//   );

//   // re-render the same component with different props
//   rerender(
//     <PanelExpansion title={Title2}>Test expansion content</PanelExpansion>,
//   );
//   expect(getByTestId('panel-expansion-title-2').textContent).toBe(
//     'Test expansion two',
//   );
// });

test('CSS export', () => {
  const css = cssFromBaseStyles(baseStyles);
  expect(css).toEqual(expect.stringContaining('background-color'));
});
