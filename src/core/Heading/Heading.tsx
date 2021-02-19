import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { ColorProp } from '../theme';
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

export interface HeadingProps extends Omit<CompHeadingProps, 'variant'> {
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
    smallScreen,
    className,
    variant,
    asProp, // as-property is defined internally as asProp and need to be implemented back if used
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
  ${baseStyles}
`;

/**
 * <i class="semantics" />
 * Used displaying headings with correct fonts
 */
export class Heading extends Component<HeadingProps> {
  static h1hero = ({ as, ...passProps }: Omit<HeadingProps, 'variant'>) => (
    <StyledHeading asProp={as} {...passProps} variant="h1hero" />
  );

  static h1 = ({ as, ...passProps }: Omit<HeadingProps, 'variant'>) => (
    <StyledHeading asProp={as} {...passProps} variant="h1" />
  );

  static h2 = ({ as, ...passProps }: Omit<HeadingProps, 'variant'>) => (
    <StyledHeading asProp={as} {...passProps} variant="h2" />
  );

  static h3 = ({ as, ...passProps }: Omit<HeadingProps, 'variant'>) => (
    <StyledHeading asProp={as} {...passProps} variant="h3" />
  );

  static h4 = ({ as, ...passProps }: Omit<HeadingProps, 'variant'>) => (
    <StyledHeading asProp={as} {...passProps} variant="h4" />
  );

  static h5 = ({ as, ...passProps }: Omit<HeadingProps, 'variant'>) => (
    <StyledHeading asProp={as} {...passProps} variant="h5" />
  );

  render() {
    const { as, variant, ...passProps } = this.props;
    if (!variant) {
      logger.warn(
        `Does not contain heading level (variant): ${passProps.children}`,
      );
      return null;
    }
    return <StyledHeading asProp={as} {...passProps} variant={variant} />;
  }
}
