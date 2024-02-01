import {
  SuomifiTheme,
  SpacingProp,
  defaultSuomifiTheme,
} from '../SuomifiTheme/SuomifiTheme';

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

export type GlobalMarginProps = { globalMargins: GlobalMargins };

const spaceVal = (theme: SuomifiTheme) => (val?: SpacingProp) => {
  if (val === '0') return '0';
  return !!val ? theme.spacing[val] : '';
};

export interface PaddingProps {
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
}
export interface MarginProps {
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

export type GlobalMargins = {
  all?: MarginProps;
  button?: MarginProps;
  checkbox?: MarginProps;
  checkboxGroup?: MarginProps;
  dateInput?: MarginProps;
  hintText?: MarginProps;
  label?: MarginProps;
  multiSelect?: MarginProps;
  radioButton?: MarginProps;
  radioButtonGroup?: MarginProps;
  textInput?: MarginProps;
};

export interface SpacingProps extends PaddingProps, MarginProps {}

export const spacingStyles = (props: SpacingProps | undefined) => {
  if (!props) return;
  const array = Object.entries(props).map(([key, value]) =>
    getSpacingStyle(defaultSuomifiTheme, key as keyof SpacingProps, value),
  );
  return Object.assign({}, ...array);
};

export const buildSpacingCSS = (props: SpacingProps | undefined): string => {
  if (!props) return '';

  const cssStyles = Object.entries(props)
    .map(([key, value]) =>
      getCSSSpacing(defaultSuomifiTheme, key as keyof SpacingProps, value),
    )
    .join('');

  return cssStyles;
};

const inlineStyle = {
  margin: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  padding: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
};

const cssSelector = {
  margin: 'margin',
  mt: 'margin-top',
  mr: 'margin-right',
  mb: 'margin-bottom',
  ml: 'margin-left',
  padding: 'padding',
  pt: 'padding-top',
  pr: 'padding-right',
  pb: 'padding-bottom',
  pl: 'padding-left',
};

const getSpacingStyle = (
  theme: SuomifiTheme,
  key: keyof SpacingProps,
  value: SpacingProp,
) => {
  const amount = spaceVal(theme)(value);
  switch (key) {
    case 'mx':
      return { marginRight: `${amount}`, marginLeft: `${amount}` };
    case 'my':
      return { marginTop: `${amount}`, marginBottom: `${amount}` };
    case 'px':
      return { paddingRight: `${amount}`, paddingLeft: `${amount}` };
    case 'py':
      return { paddingTop: `${amount}`, paddingBottom: `${amount}` };
    case 'margin':
    case 'mt':
    case 'mr':
    case 'mb':
    case 'ml':
    case 'padding':
    case 'pt':
    case 'pr':
    case 'pb':
    case 'pl':
      return { [inlineStyle[key]]: `${amount}` };
    default:
      return '';
  }
};

const getCSSSpacing = (
  theme: SuomifiTheme,
  key: keyof SpacingProps,
  value: SpacingProp,
) => {
  const amount = spaceVal(theme)(value);
  switch (key) {
    case 'mx':
      return `margin-right: ${amount}; margin-left: ${amount};`;
    case 'my':
      return `margin-top: ${amount}; margin-bottom: ${amount};`;
    case 'px':
      return `padding-right: ${amount}; padding-left: ${amount};`;
    case 'py':
      return `padding-top: ${amount}; padding-bottom: ${amount};`;
    default:
      return `${[cssSelector[key]]}: ${amount};`;
  }
};

export const separateMarginProps = <T extends MarginProps>(
  props: T,
): [MarginProps, Omit<T, keyof MarginProps>] => {
  const { margin, my, mx, mt, mr, mb, ml, ...otherProps } = props;
  return [
    {
      ...(margin !== undefined && { margin }),
      ...(my !== undefined && { my }),
      ...(mx !== undefined && { mx }),
      ...(mt !== undefined && { mt }),
      ...(mr !== undefined && { mr }),
      ...(mb !== undefined && { mb }),
      ...(ml !== undefined && { ml }),
    },
    otherProps,
  ];
};

export const separateMarginAndPaddingProps = <T extends SpacingProps>(
  props: T,
): [SpacingProps, Omit<T, keyof SpacingProps>] => {
  const {
    margin,
    padding,
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
      ...(margin !== undefined && { margin }),
      ...(padding !== undefined && { padding }),
      ...(my !== undefined && { my }),
      ...(mx !== undefined && { mx }),
      ...(py !== undefined && { py }),
      ...(px !== undefined && { px }),
      ...(mt !== undefined && { mt }),
      ...(mr !== undefined && { mr }),
      ...(mb !== undefined && { mb }),
      ...(ml !== undefined && { ml }),
      ...(pt !== undefined && { pt }),
      ...(pr !== undefined && { pr }),
      ...(pb !== undefined && { pb }),
      ...(pl !== undefined && { pl }),
    },
    otherProps,
  ];
};
