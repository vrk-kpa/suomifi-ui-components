import React, { forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { asPropType } from '../../utils/typescript';
import { getLogger } from '../../utils/log';
import { ColorProp, SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../theme/utils/spacing';
import { baseStyles } from './Heading.baseStyles';
import { HtmlH, HtmlHProps, hLevels } from '../../reset';

const baseClassName = 'fi-heading';
const smallScreenClassName = `${baseClassName}--small-screen`;
type styleVariants = hLevels | 'h1hero';

export interface HeadingProps extends HtmlHProps, MarginProps {
  /**
   * `"h1hero"` | `"h1"` | `"h2"` | `"h3"` | `"h4"` | `"h5"`
   *
   * Heading level to assign semantic element and styling.
   * @default h1
   */
  variant: styleVariants;
  /** Changes font to smaller screen size and style */
  smallScreen?: boolean;
  /** Changes color for text. Use color tokens from Suomi.fi theme colors */
  color?: ColorProp;
  /** CSS class for custom styles */
  className?: string;
  /** Renders the heading as another element e.g. h3 as h2.
   * Will override semantics derived from variant prop but keep the variant styles.
   */
  as?: asPropType;
  /** Ref object is placed on the heading element. Alternative to React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLHeadingElement>;
}

interface InternalHeadingProps extends HeadingProps, SuomifiThemeProp {
  asProp?: asPropType;
}

const getSemanticVariant = (variant: styleVariants) => {
  if (variant === 'h1hero') return 'h1';
  return variant;
};

const StyledHeading = styled(
  ({
    smallScreen,
    className,
    theme,
    variant,
    color,
    asProp,
    ...rest
  }: InternalHeadingProps) => {
    const [marginProps, passProps] = separateMarginProps(rest);
    const marginStyle = spacingStyles(marginProps);
    return (
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
        as={!!asProp ? asProp : getSemanticVariant(variant)}
        style={{ ...marginStyle, ...passProps?.style }}
      />
    );
  },
)`
  ${(props) => baseStyles(props)}
`;

const Heading = forwardRef(
  (props: HeadingProps, ref: React.RefObject<HTMLHeadingElement>) => {
    const { as, variant, ...passProps } = props;
    if (!variant) {
      getLogger().warn(
        `Does not contain heading level (variant): ${passProps.children}`,
      );
      return null;
    }
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledHeading
            theme={suomifiTheme}
            forwardedRef={ref}
            asProp={as}
            {...passProps}
            variant={variant}
          />
        )}
      </SuomifiThemeConsumer>
    );
  },
);

Heading.displayName = 'Heading';
export { Heading };
