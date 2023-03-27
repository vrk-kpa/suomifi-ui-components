import React, { forwardRef, ReactElement } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { ListLinkStyles } from './ListLink.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlDiv, HtmlLi, HtmlSpan } from '../../../reset';
import { LinkProps } from '../Link/Link';
import { ExternalLinkProps } from 'core/Link/ExternalLink/ExternalLink';
import { RouterLinkProps } from 'core/Link/RouterLink/RouterLink';
import { Icon } from '../../Icon/Icon';
import { BaseIconKeys } from 'suomifi-icons';

const baseClassName = 'fi-list-link';

const listLinkClassNames = {
  icon: `${baseClassName}_icon`,
};

export interface ListLinkProps {
  /** Ref  is passed to the anchor element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLAnchorElement>;
  /**
   * Custom icon to use for the list item
   */
  icon?: BaseIconKeys;
  /**
   * The link element of the list item
   */
  children: ReactElement<
    LinkProps | ExternalLinkProps | RouterLinkProps<React.ElementType>
  >;
  className?: string;
  /** Use for list style links outside of a list element. Changes outermost element from `li` to `div` */
  standalone?: boolean;
}

const StyledListLink = styled(
  ({
    children,
    theme,
    className,
    standalone = false,
    icon,
    ...passProps
  }: ListLinkProps & SuomifiThemeProp) =>
    standalone ? (
      <HtmlDiv {...passProps} className={classnames(baseClassName, className)}>
        <HtmlSpan className={listLinkClassNames.icon}>
          {!!icon ? (
            <Icon icon={icon} />
          ) : (
            <Icon icon={'chevronRight'} color={theme.colors.highlightBase} />
          )}
        </HtmlSpan>
        {children}
      </HtmlDiv>
    ) : (
      <HtmlLi {...passProps} className={classnames(baseClassName, className)}>
        <HtmlSpan className={listLinkClassNames.icon}>
          {!!icon ? (
            <Icon icon={icon} />
          ) : (
            <Icon icon={'chevronRight'} color={theme.colors.highlightBase} />
          )}
        </HtmlSpan>
        {children}
      </HtmlLi>
    ),
)`
  ${({ theme }) => ListLinkStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Used for adding a link
 */
const ListLink = forwardRef(
  (
    props: ListLinkProps,
    ref: React.Ref<HTMLAnchorElement> /* TODO: ref typing */,
  ) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledListLink theme={suomifiTheme} forwardedRef={ref} {...props} />
      )}
    </SuomifiThemeConsumer>
  ),
);

ListLink.displayName = 'ListLink';
export { ListLink };
