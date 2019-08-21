import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { withDefaultTheme } from '../theme/utils';
import { ThemeComponent } from '../theme';
import {
  Block as CompBlock,
  BlockProps as CompBlockProps,
} from '../../components/Block/Block';
import { spacingTokensProp } from '../theme/spacing';
import { baseStyles } from './Block.baseStyles';
import classnames from 'classnames';

const baseClassName = 'fi-block';

export interface BlockProps extends CompBlockProps, ThemeComponent {
  /** Padding from theme */
  padding?: spacingTokensProp;
  /** Margin from theme */
  margin?: spacingTokensProp;
}

const StyledBlock = styled(
  ({ theme, className, padding, margin, ...passProps }: BlockProps) => (
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
    <StyledBlock {...withDefaultTheme(props)} variant="section" />
  );

  static header = (props: BlockProps) => (
    <StyledBlock {...withDefaultTheme(props)} variant="header" />
  );

  static nav = (props: BlockProps) => (
    <StyledBlock {...withDefaultTheme(props)} variant="nav" />
  );

  static main = (props: BlockProps) => (
    <StyledBlock {...withDefaultTheme(props)} variant="main" />
  );

  static footer = (props: BlockProps) => (
    <StyledBlock {...withDefaultTheme(props)} variant="footer" />
  );

  render() {
    const passProps = withDefaultTheme(this.props);
    return <StyledBlock {...passProps} />;
  }
}
