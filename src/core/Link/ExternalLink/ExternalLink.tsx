import React, { Component, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../../theme/utils/spacing';
import { IconChevronRight, IconLinkExternal } from 'suomifi-icons';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { ExternalLinkStyles } from './ExternalLink.baseStyles';
import { HtmlA } from '../../../reset';
import {
  BaseLinkProps,
  baseClassName,
  linkClassNames,
} from '../BaseLink/BaseLink';

const iconClassName = 'fi-link_icon';
const externalClassName = 'fi-link--external';

type newWindowProps =
  | {
      toNewWindow: false;
      labelNewWindow?: never;
    }
  | {
      toNewWindow?: true;
      labelNewWindow: string;
    };

interface InternalExternalLinkProps extends BaseLinkProps, MarginProps {
  /** Hides the icon */
  hideIcon?: boolean;
  /** Opens the link to a new window */
  toNewWindow?: boolean;
  /** Translated explanation of 'opens to a new window' for assistive technology. Required with `toNewWindow` */
  labelNewWindow?: string;
  /** Ref is forwarded to the anchor element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLAnchorElement>;
}

export type ExternalLinkProps = newWindowProps & InternalExternalLinkProps;

class BaseExternalLink extends Component<ExternalLinkProps & SuomifiThemeProp> {
  render() {
    const {
      asProp,
      children,
      className,
      variant = 'default',
      toNewWindow = true,
      labelNewWindow,
      smallScreen,
      theme,
      hideIcon,
      underline = 'hover',
      ...rest
    } = this.props;
    const [marginProps, passProps] = separateMarginProps(rest);
    const marginStyle = spacingStyles(marginProps);
    return (
      <HtmlA
        {...passProps}
        className={classnames(baseClassName, className, externalClassName, {
          [linkClassNames.linkUnderline]: underline === 'initial',
          [linkClassNames.accent]: variant === 'accent',
          [linkClassNames.small]: smallScreen,
        })}
        target={!!toNewWindow ? '_blank' : undefined}
        rel={!!toNewWindow ? 'noopener' : undefined}
        as={asProp}
        style={{ ...marginStyle, ...passProps?.style }}
      >
        {variant === 'accent' && (
          <IconChevronRight
            color={theme.colors.accentBase}
            className={linkClassNames.accentIcon}
          />
        )}
        {children}
        {toNewWindow && <VisuallyHidden>{labelNewWindow}</VisuallyHidden>}
        {!hideIcon && <IconLinkExternal className={iconClassName} />}
      </HtmlA>
    );
  }
}

const StyledExternalLink = styled(
  (props: ExternalLinkProps & SuomifiThemeProp & GlobalMarginProps) => {
    const { theme, globalMargins, ...passProps } = props;
    return <BaseExternalLink theme={theme} {...passProps} />;
  },
)`
  ${({ theme, globalMargins }) =>
    ExternalLinkStyles(theme, globalMargins?.externalLink)}
`;

const ExternalLink = forwardRef(
  (props: ExternalLinkProps, ref: React.Ref<HTMLAnchorElement>) => (
    <SpacingConsumer>
      {({ margins }) => (
        <SuomifiThemeConsumer>
          {({ suomifiTheme }) => (
            <StyledExternalLink
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

ExternalLink.displayName = 'ExternalLink';
export { ExternalLink };
