import React, { forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { LinkStyles } from '../Link/Link.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlA } from '../../../reset';
import { BaseLinkProps, baseClassName } from '../BaseLink/BaseLink';

export interface LinkProps extends BaseLinkProps {}

interface InternalLinkProps extends LinkProps, SuomifiThemeProp {
  forwardedRef?: React.RefObject<HTMLAnchorElement>;
}

const StyledLink = styled(
  ({ asProp, className, theme, ...passProps }: InternalLinkProps) => (
    <HtmlA
      {...passProps}
      className={classnames(baseClassName, className)}
      as={asProp}
    />
  ),
)`
  ${({ theme }) => LinkStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Used for adding a link
 */
const Link = forwardRef(
  (props: LinkProps, ref: React.RefObject<HTMLAnchorElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledLink theme={suomifiTheme} forwardedRef={ref} {...props} />
      )}
    </SuomifiThemeConsumer>
  ),
);

Link.displayName = 'Link';
export { Link };
