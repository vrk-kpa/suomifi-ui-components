import { css } from 'styled-components';
import { normalize } from './normalize';

const common = css`
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  font: 100% inherit;
  line-height: 1;
  text-align: left;
  text-decoration: none;
  vertical-align: baseline;
  color: inherit;
  background: none;
  cursor: inherit;

  ::before,
  ::after {
    box-sizing: border-box;
  }
`;

const resets = {
  normalize,
  common,
};

const selectorDeclaration = (selector: string, styles: string) =>
  `&${selector} {
    ${styles}
  }`;

const selectorsAndCss = (selector: string) => {
  const styles = !!normalize && normalize[selector];
  return !!styles ? selectorDeclaration(selector, styles) : '';
};

/**
 * Return selectors with resets in Emotion-css
 * @param selectors string or array of strings
 */
const resetWithSelectors = (selectors: string | string[]): string => {
  if (Array.isArray(selectors) && selectors.length > 0) {
    return `
      ${selectors.map((s) => selectorsAndCss(s)).join('')}
    `;
  }
  if (typeof selectors === 'string') {
    return selectorsAndCss(selectors);
  }
  return '';
};

export { resets, resetWithSelectors };

// TODO: Add tests
