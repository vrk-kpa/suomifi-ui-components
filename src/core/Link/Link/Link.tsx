import React from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { LinkStyles } from '../Link/Link.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlA } from '../../../reset';
import { BaseLinkProps, baseClassName } from '../BaseLink/BaseLink';

export interface LinkProps extends BaseLinkProps {}

const StyledLink = styled(
  ({
    asProp,
    className,
    theme,
    ...passProps
  }: LinkProps & SuomifiThemeProp) => (
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
const Link = (props: LinkProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => <StyledLink theme={suomifiTheme} {...props} />}
  </SuomifiThemeConsumer>
);

Link.displayName = 'Link';
export { Link };
