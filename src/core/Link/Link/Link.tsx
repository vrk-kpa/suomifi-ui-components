import React, { forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { IconChevronRight } from 'suomifi-icons';
import { LinkStyles } from '../Link/Link.baseStyles';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../../theme';
import {
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../../theme/utils/spacing';
import { HtmlA } from '../../../reset';
import {
  BaseLinkProps,
  baseClassName,
  linkClassNames,
} from '../BaseLink/BaseLink';
import { filterDuplicateKeys } from '../../../utils/common/common';

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
    globalMargins,
    variant = 'default',
    children,
    underline = 'hover',
    ...rest
  }: LinkProps & SuomifiThemeProp & GlobalMarginProps) => {
    const [_marginProps, passProps] = separateMarginProps(rest);

    return (
      <HtmlA
        {...passProps}
        className={classnames(baseClassName, className, {
          [linkClassNames.linkUnderline]: underline === 'initial',
          [linkClassNames.accent]: variant === 'accent',
          [linkClassNames.small]: smallScreen,
        })}
        as={asProp}
        style={{ ...passProps?.style }}
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
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.button,
      marginProps,
    );
    return LinkStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const Link = forwardRef(
  (props: LinkProps, ref: React.Ref<HTMLAnchorElement>) => (
    <SpacingConsumer>
      {({ margins }) => (
        <SuomifiThemeConsumer>
          {({ suomifiTheme }) => (
            <StyledLink
              theme={suomifiTheme}
              globalMargins={margins}
              forwardedRef={ref}
              {...props}
            />
          )}
        </SuomifiThemeConsumer>
      )}
    </SpacingConsumer>
  ),
);

Link.displayName = 'Link';
export { Link };
