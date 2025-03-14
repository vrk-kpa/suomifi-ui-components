import React, { forwardRef, RefObject, ReactNode } from 'react';
import { styled } from 'styled-components';
import classnames from 'classnames';
import { baseStyles } from './Toast.baseStyles';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../theme';
import {
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../theme/utils/spacing';
import { IconCheckCircle, IconClose } from 'suomifi-icons';
import { Heading } from '../Heading/Heading';
import { HtmlDiv, HtmlDivWithRef, HtmlDivWithRefProps } from '../../reset';
import { hLevels } from '../../reset/HtmlH/HtmlH';
import { filterDuplicateKeys } from '../../utils/common/common';
import { Button, ButtonProps, LoadingProps } from '../Button/Button';
import { getConditionalAriaProp } from '../../utils/aria';

export type InternalToastProps = MarginProps &
  HtmlDivWithRefProps & {
    /** Sets aria-live mode for the Toast text content and label.
     * @default 'polite'
     */
    ariaLiveMode?: 'polite' | 'assertive' | 'off';
    /** Heading for the Toast */
    headingText?: string;
    /** Main content of the Toast. */
    children?: ReactNode;
    /** CSS class for custom styles */
    className?: string;
    /** Heading variant for Toast.
     * @default 'h2'
     */
    headingVariant?: Exclude<hLevels, 'h1'>;
    /** HTML id attribute */
    id?: string;
    /** Ref is placed on the outermost div element of the component. Alternative to React `ref` attribute. */
    forwardedRef?: RefObject<HTMLDivElement>;
  };

export type CloseButtonProps =
  | {
      showCloseButton?: false;
      closeText?: string;
      onCloseButtonClick?: () => void;
      closeButtonProps?: Omit<ButtonProps, 'onClick' | keyof LoadingProps>;
    }
  | {
      /** Show or hide close button
       * @default false
       */
      showCloseButton: true;
      /**
       * Text to be used as aria-label for the close button.
       */
      closeText: string;
      /** Callback fired on close button click */
      onCloseButtonClick?: () => void;
      /** Custom props passed to the close button */
      closeButtonProps?: Omit<ButtonProps, 'onClick'>;
    };

export type ToastProps = InternalToastProps & CloseButtonProps;

const baseClassName = 'fi-toast';
export const toastClassNames = {
  styleWrapper: `${baseClassName}-wrapper`,
  heading: `${baseClassName}-heading`,
  contentWrapper: `${baseClassName}-content-wrapper`,
  icon: `${baseClassName}_icon`,
  iconWrapper: `${baseClassName}_icon-wrapper`,
  closeButton: `${baseClassName}_close-button`,
};
const BaseToast = (props: ToastProps) => {
  const {
    ariaLiveMode = 'polite',
    children,
    className,
    headingText,
    headingVariant = 'h2',
    showCloseButton = false,
    closeText,
    onCloseButtonClick,
    closeButtonProps = {},
    id,
    style,
    ...rest
  } = props;
  const [_marginProps, passProps] = separateMarginProps(rest);

  const {
    className: customCloseButtonClassName,
    'aria-describedby': closeButtonPropsAriaDescribedBy,
    'aria-label': closeButtonPropsAriaLabel,
    ...closeButtonPassProps
  } = closeButtonProps;

  return (
    <HtmlDivWithRef
      className={classnames(baseClassName, className)}
      asProp="section"
      {...passProps}
      style={style}
    >
      <HtmlDiv className={toastClassNames.styleWrapper}>
        <HtmlDiv className={toastClassNames.iconWrapper}>
          <IconCheckCircle className={toastClassNames.icon} />
        </HtmlDiv>

        <HtmlDiv
          className={toastClassNames.contentWrapper}
          id={id}
          aria-live={ariaLiveMode}
        >
          {headingText && (
            <Heading
              variant={headingVariant}
              className={toastClassNames.heading}
            >
              {headingText}
            </Heading>
          )}
          {children}
        </HtmlDiv>
        {showCloseButton && (
          <Button
            variant="secondaryNoBorder"
            className={classnames(
              toastClassNames.closeButton,
              customCloseButtonClassName,
            )}
            aria-label={closeButtonPropsAriaLabel || closeText}
            {...getConditionalAriaProp('aria-describedby', [
              closeButtonPropsAriaDescribedBy,
            ])}
            onClick={onCloseButtonClick}
            {...closeButtonPassProps}
            iconRight={<IconClose />}
          >
            {''}
          </Button>
        )}
      </HtmlDiv>
    </HtmlDivWithRef>
  );
};

const StyledToast = styled(
  (props: ToastProps & SuomifiThemeProp & GlobalMarginProps) => {
    const { theme, globalMargins, ...passProps } = props;
    return <BaseToast {...passProps} />;
  },
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.toast,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const Toast = forwardRef(
  (props: ToastProps, ref: RefObject<HTMLDivElement>) => {
    const { ...passProps } = props;
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <StyledToast
                forwardedRef={ref}
                theme={suomifiTheme}
                globalMargins={margins}
                {...passProps}
              />
            )}
          </SuomifiThemeConsumer>
        )}
      </SpacingConsumer>
    );
  },
);

Toast.displayName = 'Toast';
export { Toast };
