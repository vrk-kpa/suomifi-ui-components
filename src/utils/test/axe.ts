import { ReactElement } from 'react';
import server from 'react-dom/server';
import { axe } from 'jest-axe';

export const axeTest = (
  element: ReactElement<any>,
  options: any = {},
) => async () => {
  const html = server.renderToString(element);
  const results = await axe(html, options);
  expect(results).toHaveNoViolations();
};
