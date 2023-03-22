import React, { forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { LinkListStyles } from './LinkList.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { hLevels, HtmlDiv, HtmlUlWithRef } from '../../../reset';
import { BaseLinkProps } from '../BaseLink/BaseLink';
import { Heading } from '../../Heading/Heading';

const LinkListClassName = 'fi-link-list';

export interface LinkListProps extends BaseLinkProps {
  /** Ref  is passed to the anchor element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLAnchorElement>;
  /** Heading element content */
  headingText: string;
  /** Semantic heading level. Look will always match h5 styles */
  headingLevel?: hLevels;
}

const StyledLinkList = styled(
  ({
    asProp,
    className,
    theme,
    children,
    headingText,
    headingLevel,
    ...passProps
  }: LinkListProps & SuomifiThemeProp) => (
    <HtmlDiv>
      <Heading variant="h5" as={headingLevel}>
        {headingText}
      </Heading>
      <HtmlUlWithRef
        {...passProps}
        className={classnames(className, LinkListClassName)}
      >
        {children}
      </HtmlUlWithRef>
    </HtmlDiv>
  ),
)`
  ${() => LinkListStyles()}
`;

/**
 * <i class="semantics" />
 * Used for adding a link
 */
const LinkList = forwardRef(
  (props: LinkListProps, ref: React.Ref<HTMLAnchorElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledLinkList theme={suomifiTheme} forwardedRef={ref} {...props} />
      )}
    </SuomifiThemeConsumer>
  ),
);

LinkList.displayName = 'LinkList';
export { LinkList };
