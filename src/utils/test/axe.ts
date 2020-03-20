import { ReactElement } from 'react';
import server from 'react-dom/server';
import { axe } from 'jest-axe';

export const axeTest = (element: ReactElement<any> | string) => async () => {
  const html =
    typeof element === 'string' ? element : server.renderToString(element);
  const results = await axe(html);
  expect(results).toHaveNoViolations();
};
