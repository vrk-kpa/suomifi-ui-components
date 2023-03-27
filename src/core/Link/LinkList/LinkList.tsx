import React, { forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { LinkListStyles } from './LinkList.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlUlProps, HtmlUlWithRef } from '../../../reset';

const LinkListClassName = 'fi-link-list';

export interface LinkListProps extends HtmlUlProps {
  /** Ref  is passed to the anchor element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLAnchorElement>;
}

const StyledLinkList = styled(
  ({
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
