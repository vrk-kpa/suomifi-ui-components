import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SpacingWithoutInsetProp } from '../theme/spacing';
import { baseStyles } from './Block.baseStyles';
import { HtmlDiv, HtmlDivProps } from '../../reset';

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
    const { className, variant, ...passProps } = this.props;
    const ComponentVariant =
      !variant || variant === 'default' ? HtmlDiv : variant;
    return (
      <ComponentVariant
        {...passProps}
        className={classnames(baseClassName, className)}
      />
    );
  }
}

const StyledBlock = styled(
  ({ className, padding, margin, ...passProps }: BlockProps) => (
    <SemanticBlock
      {...passProps}
      className={classnames(className, {
        [`${baseClassName}--padding-${padding}`]: !!padding,
        [`${baseClassName}--margin-${margin}`]: !!margin,
        [`${baseClassName}--${passProps.variant}`]: !!passProps.variant,
      })}
    />
  ),
)`
  ${baseStyles};
`;

/**
 * Used displaying Block with correct styles
 */
export class Block extends Component<BlockProps> {
  render() {
    return <StyledBlock {...this.props} />;
  }
}
