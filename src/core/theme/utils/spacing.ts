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
  alert?: MarginProps;
  actionMenu?: MarginProps;
  block?: MarginProps;
  button?: MarginProps;
  breadcrumb?: MarginProps;
  checkbox?: MarginProps;
  checkboxGroup?: MarginProps;
  chip?: MarginProps;
  dateInput?: MarginProps;
  dropdown?: MarginProps;
  expander?: MarginProps;
  expanderGroup?: MarginProps;
  externalLink?: MarginProps;
  fileInput?: MarginProps;
  heading?: MarginProps;
  hintText?: MarginProps;
  inlineAlert?: MarginProps;
  label?: MarginProps;
  languageMenu?: MarginProps;
  link?: MarginProps;
  linkList?: MarginProps;
  loadingSpinner?: MarginProps;
  multiSelect?: MarginProps;
  notification?: MarginProps;
  pagination?: MarginProps;
  paragraph?: MarginProps;
  radioButton?: MarginProps;
  radioButtonGroup?: MarginProps;
  routerLink?: MarginProps;
  searchInput?: MarginProps;
  serviceNavigation?: MarginProps;
  sideNavigation?: MarginProps;
  singleSelect?: MarginProps;
  staticChip?: MarginProps;
  statusText?: MarginProps;
  text?: MarginProps;
  textarea?: MarginProps;
  textInput?: MarginProps;
  timeInput?: MarginProps;
  toast?: MarginProps;
  toggleInput?: MarginProps;
  toggleButton?: MarginProps;
  tooltip?: MarginProps;
  wizardNavigation?: MarginProps;
};

export interface SpacingProps extends PaddingProps, MarginProps {}

export const spacingStyles = (props: SpacingProps | undefined) => {
  if (!props) return;
  const array = Object.entries(props).map(([key, value]) =>
    getSpacingStyle(defaultSuomifiTheme, key as keyof SpacingProps, value),
  );
  return Object.assign({}, ...array);
};

export const buildSpacingCSS = (
  spacing?: SpacingProps,
  important?: boolean,
): string => {
  if (!spacing) return '';

  const cssStyles = Object.entries(spacing)
    .map(([key, value]) =>
      getCSSSpacing(
        defaultSuomifiTheme,
        key as keyof SpacingProps,
        value,
        important,
      ),
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
  important: boolean = false,
) => {
  const amount = spaceVal(theme)(value);
  const importantValue = important ? '!important' : '';
  switch (key) {
    case 'mx':
      return `margin-right: ${amount} ${importantValue}; margin-left: ${amount} ${importantValue};`;
    case 'my':
      return `margin-top: ${amount} ${importantValue}; margin-bottom: ${amount} ${importantValue};`;
    case 'px':
      return `padding-right: ${amount} ${importantValue}; padding-left: ${amount} ${importantValue};`;
    case 'py':
      return `padding-top: ${amount} ${importantValue}; padding-bottom: ${amount} ${importantValue};`;
    default:
      return `${cssSelector[key]}: ${amount} ${importantValue};`;
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
