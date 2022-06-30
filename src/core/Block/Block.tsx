import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SpacingWithoutInsetProp } from '../theme/utils/spacing';
import { baseStyles } from './Block.baseStyles';
import { HtmlDiv, HtmlDivProps } from '../../reset';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';

const baseClassName = 'fi-block';

export interface BlockProps extends HtmlDivProps {
  /** Padding from theme */
  padding?: SpacingWithoutInsetProp;
  /** Margin from theme */
  margin?: SpacingWithoutInsetProp;
  /**
   * Change block semantics
   * @default default
   */
  variant?: 'default' | 'section' | 'header' | 'nav' | 'main' | 'footer';
}

class SemanticBlock extends Component<BlockProps> {
  render() {
    const { className, variant, padding, margin, ...passProps } = this.props;
    const ComponentVariant =
      !variant || variant === 'default' ? HtmlDiv : variant;
    return (
      <ComponentVariant
        {...passProps}
        className={classnames(baseClassName, className, {
          [`${baseClassName}--padding-${padding}`]: !!padding,
          [`${baseClassName}--margin-${margin}`]: !!margin,
          [`${baseClassName}--${variant}`]: !!variant,
        })}
      />
    );
  }
}

const StyledBlock = styled((props: BlockProps & SuomifiThemeProp) => {
  const { theme, ...passProps } = props;
  return <SemanticBlock {...passProps} />;
})`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * Used in displaying a generic piece of HTML e.g. a <div>
 */
const Block = (props: BlockProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => <StyledBlock theme={suomifiTheme} {...props} />}
  </SuomifiThemeConsumer>
);

Block.displayName = 'Block';
export { Block };
