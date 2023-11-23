import React, { MouseEvent, forwardRef, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlDivWithRef, HtmlDivProps, hLevels } from '../../../reset';
import { IconError } from 'suomifi-icons';
import { AutoId } from '../../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../../theme/utils/spacing';
import { baseStyles } from './ErrorSummary.baseStyles';
import { Heading } from '../../Heading/Heading';
import { Link } from '../../Link';

const baseClassName = 'fi-error-summary';
const inlineAlertClassNames = {
  styleWrapper: `${baseClassName}_style-wrapper`,
  content: `${baseClassName}_content`,
  heading: `${baseClassName}_heading`,
  textContentWrapper: `${baseClassName}_text-content-wrapper`,
  icon: `${baseClassName}_icon`,
  smallScreen: `${baseClassName}--small-screen`,
};

export interface ErrorSummaryItemProps {
  /** Visible text of the error item */
  text: string;
  /** HTML id of an input element. The error corresponds to this input */
  inputId: string;
}

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
  const [marginProps, passProps] = separateMarginProps(rest);
  const marginStyle = spacingStyles(marginProps);

  const focusInput = (
    event: MouseEvent<HTMLAnchorElement>,
    elementId: string,
  ) => {
    // Prevents the normal browser behavior when clicking on an anchor
    event.preventDefault();
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
    }
  };

  return (
    <HtmlDivWithRef
      as="section"
      {...passProps}
      className={classnames(baseClassName, className, {
        [inlineAlertClassNames.smallScreen]: !!smallScreen,
      })}
      style={{ ...marginStyle, ...passProps?.style }}
      ref={forwardedRef}
    >
      <HtmlDiv className={inlineAlertClassNames.styleWrapper}>
        <IconError className={classnames(inlineAlertClassNames.icon)} />

        <HtmlDiv className={inlineAlertClassNames.textContentWrapper} id={id}>
          <Heading
            variant={headingVariant}
            className={inlineAlertClassNames.heading}
            ref={headingRef}
            tabIndex={0}
          >
            {headingText}
          </Heading>
          <HtmlDiv className={inlineAlertClassNames.content}>
            {items && (
              <ul>
                {items.map((item) => (
                  <li key={item.inputId}>
                    <Link
                      href={item.inputId}
                      onClick={(event) => {
                        focusInput(event, item.inputId);
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
  (props: ErrorSummaryProps & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseErrorSummary {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const ErrorSummary = forwardRef<HTMLDivElement, ErrorSummaryProps>(
  (props: ErrorSummaryProps, ref: React.RefObject<HTMLDivElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledErrorSummary
                forwardedRef={ref}
                theme={suomifiTheme}
                id={id}
                {...passProps}
              />
            )}
          </AutoId>
        )}
      </SuomifiThemeConsumer>
    );
  },
);

ErrorSummary.displayName = 'ErrorSummary';
export { ErrorSummary };
