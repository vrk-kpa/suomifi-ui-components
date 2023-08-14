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

export interface SpacingProps extends PaddingProps, MarginProps {}

export const spacingStyle = (props: SpacingProps) => {
  const array = Object.entries(props).map(([key, value]) =>
    getSpacingStyle(defaultSuomifiTheme, key as keyof SpacingProps, value),
  );
  return Object.assign({}, ...array);
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
      ...(marginProp !== undefined && { margin: marginProp }),
      ...(paddingProp !== undefined && { padding: paddingProp }),
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
