import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { asPropType } from '../../utils/typescript';
import { logger } from '../../utils/logger';
import {
  Heading as CompHeading,
  HeadingProps as CompHeadingProps,
  hLevels,
} from '../../components/Heading/Heading';
import { ColorProp } from '../theme';
import { baseStyles } from './Heading.baseStyles';

const baseClassName = 'fi-heading';
const smallScreenClassName = `${baseClassName}--small-screen`;

export interface HeadingProps extends Omit<CompHeadingProps, 'variant'> {
  /**
   * Heading level
   * @default h1
   */
  variant: hLevels | 'h1hero';
  /** Change font to smaller screen size and style */
  smallScreen?: boolean;
  /** Change color for text from theme colors */
  color?: ColorProp;
}

const StyledHeading = styled(
  ({
    smallScreen,
    className,
    variant,
    color,
    asProp, // as-property is defined internally as asProp and need to be implemented back if used
    ...passProps
  }: HeadingProps & { asProp?: asPropType }) => (
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
  ${(props) => baseStyles(props)}
`;

/**
 * <i class="semantics" />
 * Used displaying headings with correct fonts
 */
export class Heading extends Component<HeadingProps> {
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
