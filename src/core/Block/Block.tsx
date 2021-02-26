import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import {
  Block as CompBlock,
  BlockProps as CompBlockProps,
} from '../../components/Block/Block';
import { SpacingWithoutInsetProp } from '../theme/spacing';
import { baseStyles } from './Block.baseStyles';
import classnames from 'classnames';

const baseClassName = 'fi-block';

export interface BlockProps extends CompBlockProps {
  /** Padding from theme */
  padding?: SpacingWithoutInsetProp;
  /** Margin from theme */
  margin?: SpacingWithoutInsetProp;
}

const StyledBlock = styled(
  ({ className, padding, margin, ...passProps }: BlockProps) => (
    <CompBlock
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
  static section = (props: BlockProps) => (
    <StyledBlock {...props} variant="section" />
  );

  static header = (props: BlockProps) => (
    <StyledBlock {...props} variant="header" />
  );

  static nav = (props: BlockProps) => <StyledBlock {...props} variant="nav" />;

  static main = (props: BlockProps) => (
    <StyledBlock {...props} variant="main" />
  );

  static footer = (props: BlockProps) => (
    <StyledBlock {...props} variant="footer" />
  );

  render() {
    return <StyledBlock {...this.props} />;
  }
}
