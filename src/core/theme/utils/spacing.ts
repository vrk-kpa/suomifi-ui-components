import { SpacingDesignTokens } from 'suomifi-design-tokens';
import {
  SuomifiTheme,
  SpacingProp,
  defaultSuomifiTheme,
} from '../SuomifiTheme/SuomifiTheme';
import { css } from 'styled-components';

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

export interface SpacingProps {
  /** Padding from theme */
  padding?: SpacingWithoutInsetProp;
  /** Padding-top from theme */
  pt?: SpacingWithoutInsetProp;
  /** Padding-right from theme */
  pr?: SpacingWithoutInsetProp;
  /** Padding-bottom from theme */
  pb?: SpacingWithoutInsetProp;
  /** Padding-left from theme */
  pl?: SpacingWithoutInsetProp;
  /** Padding on the x-axis (left & right) from theme */
  px?: SpacingWithoutInsetProp;
  /** Padding on the y-axis (top & bottom) from theme */
  py?: SpacingWithoutInsetProp;
  /** Margin from theme */
  margin?: SpacingWithoutInsetProp;
  /** Margin-top from theme */
  mt?: SpacingWithoutInsetProp;
  /** Margin-right from theme */
  mr?: SpacingWithoutInsetProp;
  /** Margin-bottom from theme */
  mb?: SpacingWithoutInsetProp;
  /** Margin-left from theme */
  ml?: SpacingWithoutInsetProp;
  /** Margin on the x-axis (left & right) from theme */
  mx?: SpacingWithoutInsetProp;
  /** Margin on the y-axis (top & bottom) from theme */
  my?: SpacingWithoutInsetProp;
}

export const spacingClasses = (theme: SuomifiTheme) => css`
  ${spacingModifiers(theme)('margin')('&.fi-margin')}
  ${spacingModifiers(theme)('margin-top')('&.fi-margin-top')}
  ${spacingModifiers(theme)('margin-right')('&.fi-margin-right')}
  ${spacingModifiers(theme)('margin-bottom')('&.fi-margin-bottom')}
  ${spacingModifiers(theme)('margin-left')('&.fi-margin-left')}
  ${spacingModifiers(theme)('padding')('&.fi-padding')}
  ${spacingModifiers(theme)('padding-top')('&.fi-padding-top')}
  ${spacingModifiers(theme)('padding-right')('&.fi-padding-right')}
  ${spacingModifiers(theme)('padding-bottom')('&.fi-padding-bottom')}
  ${spacingModifiers(theme)('padding-left')('&.fi-padding-left')}
`;

export const getSpacingClassNamesFromProps = (props: SpacingProps) => ({
  [`fi-padding-${props.padding}`]: !!props.padding,
  [`fi-margin-${props.margin}`]: !!props.margin,
  [`fi-margin-top-${props.mt}`]: !!props.mt,
  [`fi-margin-right-${props.mr}`]: !!props.mr,
  [`fi-margin-bottom-${props.mb}`]: !!props.mb,
  [`fi-margin-left-${props.ml}`]: !!props.ml,
  [`fi-margin-left-${props.mx}`]: !!props.mx,
  [`fi-margin-right-${props.mx}`]: !!props.mx,
  [`fi-margin-top-${props.my}`]: !!props.my,
  [`fi-margin-bottom-${props.my}`]: !!props.my,
  [`fi-padding-top-${props.pt}`]: !!props.pt,
  [`fi-padding-right-${props.pr}`]: !!props.pr,
  [`fi-padding-bottom-${props.pb}`]: !!props.pb,
  [`fi-padding-left-${props.pl}`]: !!props.pl,
  [`fi-padding-left-${props.px}`]: !!props.px,
  [`fi-padding-right-${props.px}`]: !!props.px,
  [`fi-padding-top-${props.py}`]: !!props.py,
  [`fi-padding-bottom-${props.py}`]: !!props.py,
});

export const separateSpacingProps = (props: any) => {
  const {
    margin: marginProp,
    padding: paddingProp,
    my,
    mx,
    py,
    px,
    mt,
    mr,
    mb,
    ml,
    pt,
    pr,
    pb,
    pl,
    ...otherProps
  } = props;
  return [
    {
      margin: marginProp,
      padding: paddingProp,
      my,
      mx,
      py,
      px,
      mt,
      mr,
      mb,
      ml,
      pt,
      pr,
      pb,
      pl,
    },
    otherProps,
  ];
};
