import React, { Component, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  GlobalMarginProps,
  SpacingProps,
  separateMarginAndPaddingProps,
} from '../theme/utils/spacing';
import { baseStyles } from './Block.baseStyles';
import { HtmlDivWithNativeRef, HtmlDivProps } from '../../reset';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../theme';

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

export interface BlockProps extends HtmlDivProps, SpacingProps {
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
    const { className, variant, forwardedRef, ...rest } = this.props;

    const [_, passProps] = separateMarginAndPaddingProps(rest);

    const ComponentVariant =
      !variant || variant === 'default' ? HtmlDivWithNativeRef : variant;

    return (
      <ComponentVariant
        ref={forwardedRef}
        {...passProps}
        className={classnames(baseClassName, className, {
          [`${baseClassName}--${variant}`]: !!variant,
        })}
      />
    );
  }
}

const StyledBlock = styled(
  ({ theme, variant, ...passProps }: BlockProps & SuomifiThemeProp) => (
    <SemanticBlock variant={variant} {...passProps} />
  ),
)`
  ${(props) => {
    const { theme, variant, ...rest } = props;
    const [spacingProps] = separateMarginAndPaddingProps(rest);
    return baseStyles(theme, variant, spacingProps);
  }}
`;

const Block = forwardRef((props: BlockProps, ref: React.Ref<any>) => (
  <SpacingConsumer>
    {({ margins }) => (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledBlock
            theme={suomifiTheme}
            globalMargin={margins}
            forwardedRef={ref}
            {...props}
          />
        )}
      </SuomifiThemeConsumer>
    )}
  </SpacingConsumer>
));

Block.displayName = 'Block';
export { Block };
