import { ReactElement } from 'react';
import server from 'react-dom/server';
import { axe } from 'jest-axe';

const defaultOptions: any = { region: { enabled: false } };

export const axeTest = (
  element: ReactElement<any>,
  options?: any,
) => async () => {
  const mergedOptions = { rules: { ...defaultOptions, ...options?.rules } };
  const html = server.renderToString(element);
  const results = await axe(html, mergedOptions);
  expect(results).toHaveNoViolations();
};
