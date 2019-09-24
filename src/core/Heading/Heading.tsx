import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { withDefaultTheme } from '../theme/utils';
import { ThemeComponent, ColorProp } from '../theme';
import {
  Heading as CompHeading,
  HeadingProps as CompHeadingProps,
  hLevels,
} from '../../components/Heading/Heading';
import { baseStyles } from './Heading.baseStyles';
import classnames from 'classnames';
import { Omit, asPropType } from '../../utils/typescript';
import { logger } from '../../utils/logger';

const baseClassName = 'fi-heading';
const smallScreenClassName = `${baseClassName}--small-screen`;

export interface HeadingProps
  extends Omit<CompHeadingProps, 'variant'>,
    ThemeComponent {
  /**
   * Heading level
   * @default h1
   */
  variant: hLevels | 'h1hero';
  /** Change color for text from theme colors */
  smallScreen?: boolean;
  /** Change font to smaller screen size and style */
  color?: ColorProp;
  asProp?: asPropType;
}

const StyledHeading = styled(
  ({
    theme,
    color,
    smallScreen,
    className,
    variant,
    asProp,
    ...passProps
  }: HeadingProps) => (
    <CompHeading
      {...passProps}
      className={classnames(className, [`${baseClassName}--${variant}`], {
        [smallScreenClassName]: smallScreen,
      })}
      variant={variant === 'h1hero' ? 'h1' : variant}
      as={asProp}
    />
  ),
)`
  ${props => baseStyles(props)};
`;

/**
 * <i class="semantics" />
 * Used displaying headings with correct fonts
 */
export class Heading extends Component<HeadingProps> {
  static h1hero = (props: Omit<HeadingProps, 'variant'>) => (
    <StyledHeading {...withDefaultTheme(props)} variant="h1hero" />
  );

  static h1 = (props: Omit<HeadingProps, 'variant'>) => (
    <StyledHeading {...withDefaultTheme(props)} variant="h1" />
  );

  static h2 = (props: Omit<HeadingProps, 'variant'>) => (
    <StyledHeading {...withDefaultTheme(props)} variant="h2" />
  );

  static h3 = (props: Omit<HeadingProps, 'variant'>) => (
    <StyledHeading {...withDefaultTheme(props)} variant="h3" />
  );

  static h4 = (props: Omit<HeadingProps, 'variant'>) => (
    <StyledHeading {...withDefaultTheme(props)} variant="h4" />
  );

  static h5 = (props: Omit<HeadingProps, 'variant'>) => (
    <StyledHeading {...withDefaultTheme(props)} variant="h5" />
  );

  static h6 = (props: Omit<HeadingProps, 'variant'>) => (
    <StyledHeading {...withDefaultTheme(props)} variant="h6" />
  );

  render() {
    const { variant, ...passProps } = withDefaultTheme(this.props);
    if (!variant) {
      logger.warn(
        `Does not contain heading level (variant): ${passProps.children}`,
      );
      return null;
    }
    return <StyledHeading {...passProps} variant={variant} />;
  }
}
