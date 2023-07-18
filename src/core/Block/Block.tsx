import React, { Component, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  SpacingProps,
  getSpacingClassNamesFromProps,
  separateSpacingProps,
} from '../theme/utils/spacing';
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
    const [spacingProps, baseProps] = separateSpacingProps(this.props);
    const spacingClassnames = getSpacingClassNamesFromProps(spacingProps);
    const { className, variant, forwardedRef, ...passProps } = baseProps;

    const ComponentVariant =
      !variant || variant === 'default' ? HtmlDivWithNativeRef : variant;

    return (
      <ComponentVariant
        ref={forwardedRef}
        {...passProps}
        className={classnames(baseClassName, className, spacingClassnames, {
          [`${baseClassName}--${variant}`]: !!variant,
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
