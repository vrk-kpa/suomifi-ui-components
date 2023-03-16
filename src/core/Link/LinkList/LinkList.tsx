import React, { forwardRef } from 'react';
import { default as styled } from 'styled-components';
import { LinkListStyles } from './LinkList.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlLi, HtmlUlWithRef } from '../../../reset';
import { BaseLinkProps } from '../BaseLink/BaseLink';
import { Icon } from '../../Icon/Icon';

export interface LinkListProps extends BaseLinkProps {
  /** Ref  is passed to the anchor element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLAnchorElement>;
}

export const ListLink = (children: any, ...passProps: any) => {
  <HtmlLi {...passProps}>
    <Icon icon="chevronRight" color="green" />
    {children}
  </HtmlLi>;
};

const StyledLinkList = styled(
  ({
    asProp,
    className,
    theme,
    children,
    ...passProps
  }: LinkListProps & SuomifiThemeProp) => (
    <HtmlUlWithRef {...passProps} forwardRef={}>
      {children}
    </HtmlUlWithRef>
  ),
)`
  ${({ theme }) => LinkListStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Used for adding a link
 */
const Link = forwardRef(
  (props: LinkListProps, ref: React.Ref<HTMLAnchorElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledLinkList theme={suomifiTheme} forwardedRef={ref} {...props} />
      )}
    </SuomifiThemeConsumer>
  ),
);

Link.displayName = 'Link';
export { Link };
