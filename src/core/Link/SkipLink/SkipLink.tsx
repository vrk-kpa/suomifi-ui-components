import React, { forwardRef } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { Link } from '../Link/Link';
import { SkipLinkStyles } from './SkipLink.baseStyles';
import { BaseLinkProps } from '../BaseLink/BaseLink';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';

const skipClassName = 'fi-link--skip';

export interface SkipLinkProps extends BaseLinkProps {}

interface InnerRef {
  forwardedRef?: React.RefObject<HTMLParagraphElement>;
}

const StyledSkipLink = styled(
  (props: SkipLinkProps & SuomifiThemeProp & InnerRef) => {
    const { theme, ...passProps } = props;
    return <Link {...passProps} />;
  },
)`
  ${({ theme }) => SkipLinkStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Used for adding skip link for keyboard and screenreader users
 */
const SkipLink = forwardRef(
  (props: SkipLinkProps, ref: React.RefObject<HTMLAnchorElement>) => {
    const { className, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledSkipLink
            theme={suomifiTheme}
            forwardedRef={ref}
            {...passProps}
            className={classnames(className, skipClassName)}
          />
        )}
      </SuomifiThemeConsumer>
    );
  },
);

SkipLink.displayName = 'SkipLink';
export { SkipLink };
