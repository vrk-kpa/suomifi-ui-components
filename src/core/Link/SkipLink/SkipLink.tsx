import React, { forwardRef } from 'react';
import classnames from 'classnames';
import { styled } from 'styled-components';
import { Link } from '../Link/Link';
import { SkipLinkStyles } from './SkipLink.baseStyles';
import { BaseLinkProps } from '../BaseLink/BaseLink';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';

const skipClassName = 'fi-link--skip';

export interface SkipLinkProps extends BaseLinkProps {
  /** Ref is forwarded to the anchor element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLAnchorElement>;
}

const StyledSkipLink = styled((props: SkipLinkProps & SuomifiThemeProp) => {
  const { theme, ...passProps } = props;
  return <Link {...passProps} />;
})`
  ${({ theme }) => SkipLinkStyles(theme)}
`;

const SkipLink = forwardRef(
  (props: SkipLinkProps, ref: React.Ref<HTMLAnchorElement>) => {
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
