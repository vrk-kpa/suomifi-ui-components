import { SpacingDesignTokens } from 'suomifi-design-tokens';
import {
  SuomifiTheme,
  SpacingProp,
  defaultSuomifiTheme,
} from '../SuomifiTheme/SuomifiTheme';

type SpacingDesignTokensKeys = keyof SpacingDesignTokens;

export const spacingTokensKeys = Object.keys(
  defaultSuomifiTheme.spacing,
) as SpacingDesignTokensKeys[];

export type SpacingWithoutInsetProp =
  | 'xxs'
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | 'xxl'
  | 'xxxl'
  | 'xxxxl'
  | '0';

const spaceVal = (theme: SuomifiTheme) => (val?: SpacingProp) => {
  if (val === '0') return '0';
  return !!val ? theme.spacing[val] : '';
};

/**
 * Spacing type
 * @typedef {String} spacingType
 * @param {String} type 'padding' or 'margin'
 */
/**
 * Spacing tokens
 * @typedef {String} spacingTokens
 * @param {String} t token for top, or top and bottom, or all
 * @param {String} r token for right, or right and left
 * @param {String} b token for bottom
 * @param {String} l token for left
 */
/**
 * Set margin or padding pased on tokens
 * @param {Object} theme suomifiTheme
 * @return {(spacingType) => (spacingTokens) => String}
 */
const space =
  (theme: SuomifiTheme) =>
  (type: 'padding' | 'margin') =>
  (t?: SpacingProp, r?: SpacingProp, b?: SpacingProp, l?: SpacingProp) =>
    !!t
      ? `${!!t ? `${type}-top: ${spaceVal(theme)(t)};` : ''}
    ${!!r ? `${type}-right: ${spaceVal(theme)(r)};` : ''}
    ${!!b ? `${type}-bottom: ${spaceVal(theme)(b)};` : ''}
    ${!!l ? `${type}-left:${spaceVal(theme)(l)};` : ''}`
      : '';

/**
 * Set margin based on theme
 * @param {Object} theme
 */
export const margin = (theme: SuomifiTheme) => space(theme)('margin');
/**
 * Set padding based on theme
 * @param {Object} theme
 */
export const padding = (theme: SuomifiTheme) => space(theme)('padding');

/**
 * Create spacing styles for CSS-selector (-xxs, -xs, -s...)
 * TODO: this should be in suomifiTheme? or integrated somehow with that
 * @param {Object} tokens Design tokens
 * @return {(spacingType) => (selector: String) => String}
 */
export const spacingModifiers =
  (theme: SuomifiTheme) =>
  (
    spacing:
      | 'padding'
      | 'padding-top'
      | 'padding-right'
      | 'padding-bottom'
      | 'padding-left'
      | 'margin'
      | 'margin-top'
      | 'margin-right'
      | 'margin-bottom'
      | 'margin-left',
  ) =>
  (selector: string) =>
    spacingTokensKeys.reduce(
      (ret, k) =>
        `${ret}${selector}-${k}{
        ${spacing}: ${spaceVal(theme)(k)}
  } `,
      '',
    );
