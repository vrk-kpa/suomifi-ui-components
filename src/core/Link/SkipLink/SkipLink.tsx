import React, { Component } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { Link } from '../Link/Link';
import { SkipLinkStyles } from './SkipLink.baseStyles';
import { BaseLinkProps } from '../BaseLink/BaseLink';
import { SuomifiTheme, SuomifiThemeConsumer } from '../../theme';

const skipClassName = 'fi-link--skip';

export interface SkipLinkProps extends BaseLinkProps {}

const StyledSkipLink = styled(
  (props: SkipLinkProps & { theme: SuomifiTheme }) => {
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
export class SkipLink extends Component<SkipLinkProps> {
  render() {
    const { className, ...passProps } = this.props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledSkipLink
            theme={suomifiTheme}
            {...passProps}
            className={classnames(className, skipClassName)}
          />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
