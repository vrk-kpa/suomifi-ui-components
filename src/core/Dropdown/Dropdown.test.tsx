import { cssFromBaseStyles } from '../utils';
import { baseStyles } from './Dropdown.baseStyles';

test('CSS export', () => {
  const css = cssFromBaseStyles(baseStyles);
  expect(css).toEqual(expect.stringContaining('position'));
});
