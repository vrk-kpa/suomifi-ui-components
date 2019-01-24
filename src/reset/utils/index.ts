import { css } from '@emotion/core';
import { normalizeCssInJs } from 'normalize.cssinjs';

const normalize = normalizeCssInJs({ cssToString: true });

const common = css`
  box-sizing: border-box;
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
      ${selectors.map(s => selectorsAndCss(s)).join('')}
    `;
  }
  if (typeof selectors === 'string') {
    return selectorsAndCss(selectors);
  }
  return '';
};

export { resets, resetWithSelectors };

// TODO: Add tests
// TODO: create versioned interface for normalize.css
