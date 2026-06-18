import React, { MouseEvent, forwardRef, ReactNode } from 'react';
import { styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlDivWithRef, HtmlDivProps, hLevels } from '../../../reset';
import { IconErrorFilled } from 'suomifi-icons';
import { AutoId } from '../../utils/AutoId/AutoId';
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
import { filterDuplicateKeys } from '../../../utils/common/common';
import { baseStyles } from './ErrorSummary.baseStyles';
import { Heading } from '../../Heading/Heading';
import { Link } from '../../Link';

const baseClassName = 'fi-error-summary';
const errorSummaryClassNames = {
  styleWrapper: `${baseClassName}_style-wrapper`,
  content: `${baseClassName}_content`,
  heading: `${baseClassName}_heading`,
  textContentWrapper: `${baseClassName}_text-content-wrapper`,
  icon: `${baseClassName}_icon`,
  smallScreen: `${baseClassName}--small-screen`,
};

interface BasicErrorSummaryItemProps {
  /** Visible text of the error item */
  text: string;
}

type InputReferenceProps =
  | {
      /** HTML id of an input element. The error corresponds to this input. Provide either this or `inputRef`. */
      inputId: string;
      /** Ref pointing to an input element. The error corresponds to this input. Provide either this or `inputId` */
      inputRef?: never;
    }
  | {
      inputId?: never;
      inputRef: React.RefObject<HTMLElement>;
    };

export type ErrorSummaryItemProps = BasicErrorSummaryItemProps &
  InputReferenceProps;

export interface ErrorSummaryProps extends HtmlDivProps, MarginProps {
  /**
   * List of error messages.
   * Each item is rendered as a link and represents an error message concerning one input field.
   * When user clicks a link, the input associated with it is focused.
   */
  items?: Array<ErrorSummaryItemProps>;
  /** Toggles small screen styling */
  smallScreen?: boolean;
  /** Heading for the error summary */
  headingText: ReactNode;
  /** Semantic level of the heading. Does not affect visual styling.
   * @default 'h3'
   */
  headingVariant?: Exclude<hLevels, 'h1'>;
  /** Ref for the summary's heading. Used in applying focus to the heading when the form is submitted. */
  headingRef: React.Ref<HTMLHeadingElement>;
  /** Ref is placed to the outermost div element of the component. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLDivElement>;
}

const BaseErrorSummary = (props: ErrorSummaryProps) => {
  const {
    className,
    headingText,
    headingVariant = 'h3',
    headingRef,
    items,
    smallScreen,
    id,
    forwardedRef,
    ...rest
  } = props;
  const [_marginProps, passProps] = separateMarginProps(rest);

  const focusInput = (
    event: MouseEvent<HTMLAnchorElement>,
    errorItem: ErrorSummaryItemProps,
  ) => {
    // Prevents the normal browser behavior when clicking on an anchor
    event.preventDefault();

    if (errorItem.inputRef && errorItem.inputRef.current) {
      errorItem.inputRef.current.focus();
    } else if (errorItem.inputId && errorItem.inputId !== '') {
      const element = document.getElementById(errorItem.inputId);
      if (element) {
        element.focus();
      }
    }
  };

  return (
    <HtmlDivWithRef
      asProp="section"
      {...passProps}
      className={classnames(baseClassName, className, {
        [errorSummaryClassNames.smallScreen]: !!smallScreen,
      })}
      style={{ ...passProps?.style }}
    >
      <HtmlDiv className={errorSummaryClassNames.styleWrapper}>
        <IconErrorFilled className={classnames(errorSummaryClassNames.icon)} />

        <HtmlDiv className={errorSummaryClassNames.textContentWrapper} id={id}>
          <Heading
            variant={headingVariant}
            className={errorSummaryClassNames.heading}
            ref={headingRef}
            tabIndex={0}
          >
            {headingText}
          </Heading>
          <HtmlDiv className={errorSummaryClassNames.content}>
            {items && (
              <ul>
                {items.map((item) => (
                  <li key={item.text}>
                    <Link
                      href={item.inputId || '#'}
                      onClick={(event) => {
                        focusInput(event, item);
                      }}
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </HtmlDiv>
        </HtmlDiv>
      </HtmlDiv>
    </HtmlDivWithRef>
  );
};

const StyledErrorSummary = styled(
  (props: ErrorSummaryProps & SuomifiThemeProp & GlobalMarginProps) => {
    const { theme, globalMargins, ...passProps } = props;
    return <BaseErrorSummary {...passProps} />;
  },
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.errorSummary,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const ErrorSummary = forwardRef<HTMLDivElement, ErrorSummaryProps>(
  (props: ErrorSummaryProps, ref: React.RefObject<HTMLDivElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <AutoId id={propId}>
                {(id) => (
                  <StyledErrorSummary
                    forwardedRef={ref}
                    theme={suomifiTheme}
                    globalMargins={margins}
                    id={id}
                    {...passProps}
                  />
                )}
              </AutoId>
            )}
          </SuomifiThemeConsumer>
        )}
      </SpacingConsumer>
    );
  },
);

ErrorSummary.displayName = 'ErrorSummary';
export { ErrorSummary };
