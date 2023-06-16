import React, { forwardRef, ReactElement } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { IconChevronRight } from 'suomifi-icons';
import { LinkListItemStyles } from './LinkListItem.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlLi, HtmlLiProps, HtmlSpan } from '../../../reset';
import { LinkProps } from '../Link/Link';
import { ExternalLinkProps } from 'core/Link/ExternalLink/ExternalLink';
import { RouterLinkProps } from 'core/Link/RouterLink/RouterLink';

const baseClassName = 'fi-link-list-item';

const listLinkClassNames = {
  icon: `${baseClassName}_icon`,
};

export interface LinkListItemProps extends Omit<HtmlLiProps, 'className'> {
  /** Ref  is passed to the anchor element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLLIElement>;
  /** Custom icon to use for the list item */
  icon?: ReactElement;
  /** The link element of the list item */
  children: ReactElement<
    LinkProps | ExternalLinkProps | RouterLinkProps<React.ElementType>
  >;
  /** Custom className for list item */
  className?: string;
}

const StyledLinkListItem = styled(
  ({
    children,
    theme,
    className,
    icon,
    ...passProps
  }: LinkListItemProps & SuomifiThemeProp) => (
    <HtmlLi {...passProps} className={classnames(baseClassName, className)}>
      <HtmlSpan className={listLinkClassNames.icon}>
        {!!icon ? (
          { icon }
        ) : (
          <IconChevronRight color={theme.colors.highlightBase} />
        )}
      </HtmlSpan>
      {children}
    </HtmlLi>
  ),
)`
  ${({ theme }) => LinkListItemStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Used as a wrapper for links in LinkList to add correct styling.
 */
const LinkListItem = forwardRef(
  (props: LinkListItemProps, ref: React.Ref<HTMLElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledLinkListItem
          theme={suomifiTheme}
          forwardedRef={ref}
          {...props}
        />
      )}
    </SuomifiThemeConsumer>
  ),
);

LinkListItem.displayName = 'LinkListItem';
export { LinkListItem };
