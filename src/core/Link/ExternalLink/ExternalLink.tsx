import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { logger } from '../../../utils/log';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { Icon } from '../../Icon/Icon';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { ExternalLinkStyles } from './ExternalLink.baseStyles';
import { HtmlA } from '../../../reset';
import { BaseLinkProps, baseClassName } from '../BaseLink/BaseLink';

const iconClassName = 'fi-link_icon';
const externalClassName = 'fi-link--external';

export interface ExternalLinkProps extends BaseLinkProps {
  /** Translated explanation of 'opens to a new window' */
  labelNewWindow: string;
  /** Hide the icon */
  hideIcon?: boolean;
  /** Open to a new window
   * @default true
   */
  toNewWindow?: boolean;
}

class BaseExternalLink extends Component<ExternalLinkProps> {
  render() {
    const {
      asProp,
      children,
      className,
      toNewWindow = true,
      labelNewWindow,
      hideIcon,
      ...passProps
    } = this.props;
    return (
      <HtmlA
        {...passProps}
        className={classnames(baseClassName, className, externalClassName)}
        target={!!toNewWindow ? '_blank' : undefined}
        rel={!!toNewWindow ? 'noopener' : undefined}
        as={asProp}
      >
        {children}
        <VisuallyHidden>{labelNewWindow}</VisuallyHidden>
        {!hideIcon && (
          <Icon
            icon="linkExternal"
            className={iconClassName}
            color="currentColor"
          />
        )}
      </HtmlA>
    );
  }
}

const StyledExternalLink = styled(
  (props: ExternalLinkProps & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseExternalLink {...passProps} />;
  },
)`
  ${({ theme }) => ExternalLinkStyles(theme)};
`;

/**
 * <i class="semantics" />
 * Used for adding a external site link
 */
export class ExternalLink extends Component<ExternalLinkProps> {
  render() {
    const { labelNewWindow, ...passProps } = this.props;
    if (!labelNewWindow) {
      logger.warn(
        'External link needs a translated description of link opening to a new window',
      );
    }
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledExternalLink
            theme={suomifiTheme}
            labelNewWindow={labelNewWindow}
            {...passProps}
          />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
