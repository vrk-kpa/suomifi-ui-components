import React, { forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { IconChevronRight } from 'suomifi-icons';
import { LinkStyles } from '../Link/Link.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../../theme/utils/spacing';
import { HtmlA } from '../../../reset';
import {
  BaseLinkProps,
  baseClassName,
  linkClassNames,
} from '../BaseLink/BaseLink';

export interface LinkProps extends BaseLinkProps, MarginProps {
  /** Ref is forwarded to the anchor element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLAnchorElement>;
}

const StyledLink = styled(
  ({
    asProp,
    className,
    smallScreen,
    theme,
    variant = 'default',
    children,
    underline = 'hover',
    ...rest
  }: LinkProps & SuomifiThemeProp) => {
    const [marginProps, passProps] = separateMarginProps(rest);
    const marginStyle = spacingStyles(marginProps);
    return (
      <HtmlA
        {...passProps}
        className={classnames(baseClassName, className, {
          [linkClassNames.linkUnderline]: underline === 'initial',
          [linkClassNames.accent]: variant === 'accent',
          [linkClassNames.small]: smallScreen,
        })}
        as={asProp}
        style={{ ...marginStyle, ...passProps?.style }}
      >
        {variant === 'accent' && (
          <IconChevronRight
            color={theme.colors.accentBase}
            className={linkClassNames.accentIcon}
          />
        )}
        {children}
      </HtmlA>
    );
  },
)`
  ${({ theme }) => LinkStyles(theme)}
`;

const Link = forwardRef(
  (props: LinkProps, ref: React.Ref<HTMLAnchorElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledLink theme={suomifiTheme} forwardedRef={ref} {...props} />
      )}
    </SuomifiThemeConsumer>
  ),
);

Link.displayName = 'Link';
export { Link };
