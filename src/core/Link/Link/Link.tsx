import React, { forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { LinkStyles } from '../Link/Link.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlA } from '../../../reset';
import {
  BaseLinkProps,
  baseClassName,
  linkClassNames,
} from '../BaseLink/BaseLink';

export interface LinkProps extends BaseLinkProps {
  /** Ref  is passed to the anchor element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLAnchorElement>;
}

const StyledLink = styled(
  ({
    asProp,
    className,
    theme,
    underline = 'hover',
    ...passProps
  }: LinkProps & SuomifiThemeProp) => (
    <HtmlA
      {...passProps}
      className={classnames(baseClassName, className, {
        [linkClassNames.linkUnderline]: underline === 'initial',
      })}
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
