import { cssFromBaseStyles } from '../utils';
import { baseStyles } from './Menu.baseStyles';

test('CSS export', () => {
  const css = cssFromBaseStyles(baseStyles);
  expect(css).toEqual(expect.stringContaining('position'));
});
