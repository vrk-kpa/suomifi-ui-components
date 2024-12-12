import React, { forwardRef } from 'react';
import { styled } from 'styled-components';
import classnames from 'classnames';
import { LinkListStyles } from './LinkList.baseStyles';
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
import { HtmlUlProps, HtmlUlWithRef } from '../../../reset';
import { getConditionalAriaProp } from '../../../utils/aria';
import { filterDuplicateKeys } from '../../../utils/common/common';

const LinkListClassName = 'fi-link-list';
const SmallScreenClassName = 'fi-link-list--small';

export interface LinkListProps extends HtmlUlProps, MarginProps {
  /** Ref is forwarded to the list element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLUListElement>;
  /** Id of the heading or label of the list */
  ariaLabelledBy: string;
  /** Sets smaller font size for the list elements */
  smallScreen?: boolean;
}

const StyledLinkList = styled(
  ({
    className,
    theme,
    children,
    smallScreen,
    ariaLabelledBy,
    globalMargins,
    forwardedRef,
    ...rest
  }: LinkListProps & SuomifiThemeProp & GlobalMarginProps) => {
    const [_marginProps, passProps] = separateMarginProps(rest);

    return (
      <HtmlUlWithRef
        ref={forwardedRef}
        {...passProps}
        className={classnames(className, LinkListClassName, {
          [SmallScreenClassName]: smallScreen,
        })}
        {...getConditionalAriaProp('aria-labelledby', [ariaLabelledBy])}
        style={{ ...passProps?.style }}
      >
        {children}
      </HtmlUlWithRef>
    );
  },
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.linkList,
      marginProps,
    );
    return LinkListStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const LinkList = forwardRef(
  (props: LinkListProps, ref: React.Ref<HTMLUListElement>) => (
    <SpacingConsumer>
      {({ margins }) => (
        <SuomifiThemeConsumer>
          {({ suomifiTheme }) => (
            <StyledLinkList
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

LinkList.displayName = 'LinkList';
export { LinkList };
