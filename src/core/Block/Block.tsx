import React, { Component, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SpacingWithoutInsetProp } from '../theme/utils/spacing';
import { baseStyles } from './Block.baseStyles';
import { HtmlDivWithNativeRef, HtmlDivProps } from '../../reset';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';

const baseClassName = 'fi-block';

export type BlockVariant =
  | 'default'
  | 'div'
  | 'span'
  | 'section'
  | 'header'
  | 'nav'
  | 'main'
  | 'footer';

export interface BlockProps extends HtmlDivProps {
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
  /**
   * `'default'` | `'div'` | `'span'` | `'section'` | `'header'` | `'nav'` | `'main'` | `'footer'`
   *
   * Changes block semantics. "Default" renders a `<div>` with SuomifiTheme reset styles applied,
   * whereas "div" renders a plain HTML `<div>`. "Span" gets rendered with `display: inline-block` style
   * @default default
   */
  variant?: BlockVariant;
  /** Ref is forwarded to the block element. All variants are supported. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<any>;
}

class SemanticBlock extends Component<BlockProps> {
  render() {
    const {
      className,
      variant,
      padding,
      margin,
      mt,
      mr,
      mb,
      ml,
      mx,
      my,
      pt,
      pr,
      pb,
      pl,
      px,
      py,
      forwardedRef,
      ...passProps
    } = this.props;

    const ComponentVariant =
      !variant || variant === 'default' ? HtmlDivWithNativeRef : variant;

    return (
      <ComponentVariant
        ref={forwardedRef}
        {...passProps}
        className={classnames(baseClassName, className, {
          [`${baseClassName}--padding-${padding}`]: !!padding,
          [`${baseClassName}--margin-${margin}`]: !!margin,
          [`${baseClassName}--${variant}`]: !!variant,
          [`${baseClassName}--margin-top-${mt}`]: !!mt,
          [`${baseClassName}--margin-right-${mr}`]: !!mr,
          [`${baseClassName}--margin-bottom-${mb}`]: !!mb,
          [`${baseClassName}--margin-left-${ml}`]: !!ml,
          [`${baseClassName}--margin-left-${mx}`]: !!mx,
          [`${baseClassName}--margin-right-${mx}`]: !!mx,
          [`${baseClassName}--margin-top-${my}`]: !!my,
          [`${baseClassName}--margin-bottom-${my}`]: !!my,
          [`${baseClassName}--padding-top-${pt}`]: !!pt,
          [`${baseClassName}--padding-right-${pr}`]: !!pr,
          [`${baseClassName}--padding-bottom-${pb}`]: !!pb,
          [`${baseClassName}--padding-left-${pl}`]: !!pl,
          [`${baseClassName}--padding-left-${px}`]: !!px,
          [`${baseClassName}--padding-right-${px}`]: !!px,
          [`${baseClassName}--padding-top-${py}`]: !!py,
          [`${baseClassName}--padding-bottom-${py}`]: !!py,
        })}
      />
    );
  }
}

const StyledBlock = styled((props: BlockProps & SuomifiThemeProp) => {
  const { theme, variant, ...passProps } = props;
  return <SemanticBlock variant={variant} {...passProps} />;
})`
  ${({ theme, variant }) => baseStyles(theme, variant)}
`;

const Block = forwardRef((props: BlockProps, ref: React.Ref<any>) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <StyledBlock theme={suomifiTheme} forwardedRef={ref} {...props} />
    )}
  </SuomifiThemeConsumer>
));

Block.displayName = 'Block';
export { Block };
