import React, { forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { LinkListStyles } from './LinkList.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlUlWithRef } from '../../../reset';
import { BaseLinkProps } from '../BaseLink/BaseLink';

const LinkListClassName = 'fi-link-list';

export interface LinkListProps extends BaseLinkProps {
  /** Ref  is passed to the anchor element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLAnchorElement>;
}

const StyledLinkList = styled(
  ({
    asProp,
    className,
    theme,
    children,
    ...passProps
  }: LinkListProps & SuomifiThemeProp) => (
    <HtmlUlWithRef
      {...passProps}
      className={classnames(className, LinkListClassName)}
    >
      {children}
    </HtmlUlWithRef>
  ),
)`
  ${() => LinkListStyles()}
`;

/**
 * <i class="semantics" />
 * Used for adding a link
 */
const LinkList = forwardRef(
  (props: LinkListProps, ref: React.Ref<HTMLUListElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledLinkList theme={suomifiTheme} forwardedRef={ref} {...props} />
      )}
    </SuomifiThemeConsumer>
  ),
);

LinkList.displayName = 'LinkList';
export { LinkList };
