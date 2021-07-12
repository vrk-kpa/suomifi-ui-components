import { css } from 'styled-components';

const normalize = {
  html:
    'line-height: 1.15; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;',
  h1: 'font-size: 2em; margin: 0.67em 0;',
  'dl dl': 'margin: 0;',
  'dl ol': 'margin: 0;',
  'dl ul': 'margin: 0;',
  'ol dl': 'margin: 0;',
  'ul dl': 'margin: 0;',
  'ol ol': 'margin: 0;',
  'ol ul': 'margin: 0;',
  'ul ol': 'margin: 0;',
  'ul ul': 'margin: 0;',
  hr: 'box-sizing: content-box; height: 0; overflow: visible;',
  main: 'display: block;',
  pre: 'font-family: monospace, monospace; font-size: 1em;',
  a: 'background-color: transparent;',
  'abbr[title]':
    'text-decoration: underline; text-decoration: underline dotted;',
  b: 'font-weight: bolder;',
  strong: 'font-weight: bolder;',
  code: 'font-family: monospace, monospace; font-size: 1em;',
  kbd: 'font-family: monospace, monospace; font-size: 1em;',
  samp: 'font-family: monospace, monospace; font-size: 1em;',
  small: 'font-size: 80%;',
  audio: 'display: inline-block;',
  video: 'display: inline-block;',
  'audio:not([controls])': 'display: none; height: 0;',
  img: 'border-style: none;',
  'svg:not(:root)': 'overflow: hidden;',
  button:
    'margin: 0;overflow: visible; text-transform: none;-webkit-appearance: button;',
  input: 'margin: 0;overflow: visible;',
  select: 'margin: 0;text-transform: none;',
  '[type="button"]': '-webkit-appearance: button;',
  '[type="reset"]': '-webkit-appearance: button;',
  '[type="submit"]': '-webkit-appearance: button;',
  fieldset: 'padding: 0.35em 0.75em 0.625em;',
  legend:
    'box-sizing: border-box; color: inherit; display: table; max-width: 100%; white-space: normal;',
  progress: 'display: inline-block; vertical-align: baseline;',
  textarea: 'margin: 0; overflow: auto;',
  '[type="checkbox"]': 'box-sizing: border-box; padding: 0;',
  '[type="radio"]': 'box-sizing: border-box; padding: 0;',
  '[type="search"]': '-webkit-appearance: textfield; outline-offset: -2px;',
  '::-webkit-inner-spin-button': 'height: auto;',
  '::-webkit-outer-spin-button': 'height: auto;',
  '::-webkit-input-placeholder': 'color: inherit; opacity: 0.54;',
  '::-webkit-search-decoration': '-webkit-appearance: none;',
  '::-webkit-file-upload-button': '-webkit-appearance: button; font: inherit;',
  '::-moz-focus-inner': 'border-style: none; padding: 0;',
  ':-moz-focusring': 'outline: 1px dotted ButtonText;',
  ':-moz-ui-invalid': 'box-shadow: none;',
  details: 'display: block;',
  dialog:
    // eslint-disable-next-line max-len
    'background-color: white; border: solid; color: black; display: block; height: -moz-fit-content; height: -webkit-fit-content; height: fit-content; left: 0; margin: auto; padding: 1em; position: absolute; right: 0; width: -moz-fit-content; width: -webkit-fit-content; width: fit-content;',
  'dialog:not([open])': 'display: none;',
  summary: 'display: list-item;',
  canvas: 'display: inline-block;',
  template: 'display: none;',
  '[hidden]': 'display: none;',
} as Record<string, string>;

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
// TODO: create versioned interface for normalize.css
