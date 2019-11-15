import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp, InternalTokensProp } from '../theme';
import {
  Block as CompBlock,
  BlockProps as CompBlockProps,
} from '../../components/Block/Block';
import { SpacingProp } from '../theme/spacing';
import { baseStyles } from './Block.baseStyles';
import classnames from 'classnames';

const baseClassName = 'fi-block';

export interface BlockProps extends CompBlockProps, TokensProp {
  /** Padding from theme */
  padding?: SpacingProp;
  /** Margin from theme */
  margin?: SpacingProp;
}

const StyledBlock = styled(
  ({
    tokens,
    className,
    padding,
    margin,
    ...passProps
  }: BlockProps & InternalTokensProp) => (
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
  ${props => baseStyles(props)};
`;

/**
 * Used displaying Block with correct styles
 */
export class Block extends Component<BlockProps> {
  static section = (props: BlockProps) => (
    <StyledBlock {...withSuomifiDefaultProps(props)} variant="section" />
  );

  static header = (props: BlockProps) => (
    <StyledBlock {...withSuomifiDefaultProps(props)} variant="header" />
  );

  static nav = (props: BlockProps) => (
    <StyledBlock {...withSuomifiDefaultProps(props)} variant="nav" />
  );

  static main = (props: BlockProps) => (
    <StyledBlock {...withSuomifiDefaultProps(props)} variant="main" />
  );

  static footer = (props: BlockProps) => (
    <StyledBlock {...withSuomifiDefaultProps(props)} variant="footer" />
  );

  render() {
    return <StyledBlock {...withSuomifiDefaultProps(this.props)} />;
  }
}
