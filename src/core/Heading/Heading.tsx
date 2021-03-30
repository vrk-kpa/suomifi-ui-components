import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { asPropType } from '../../utils/typescript';
import { logger } from '../../utils/logger';
import { ColorProp } from '../theme';
import { baseStyles } from './Heading.baseStyles';
import { HtmlH, HtmlHProps, hLevels } from '../../reset';

const baseClassName = 'fi-heading';
const smallScreenClassName = `${baseClassName}--small-screen`;
type styleVariants = hLevels | 'h1hero';

export interface HeadingProps extends HtmlHProps {
  /**
   * Heading level
   * @default h1
   */
  variant: styleVariants;
  /** Change font to smaller screen size and style */
  smallScreen?: boolean;
  /** Change color for text from theme colors */
  color?: ColorProp;
}

const getSemanticVariant = (variant: styleVariants) => {
  if (variant === 'h1hero') return 'h1';
  return variant;
};

const StyledHeading = styled(
  ({
    smallScreen,
    className,
    variant,
    color,
    asProp,
    ...passProps
  }: HeadingProps & { asProp?: asPropType }) => (
    <HtmlH
      {...passProps}
      className={classnames(
        baseClassName,
        className,
        [`${baseClassName}--${variant}`],
        {
          [smallScreenClassName]: smallScreen,
        },
      )}
      variant={getSemanticVariant(variant)}
      as={!!asProp ? asProp : getSemanticVariant(variant)}
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
