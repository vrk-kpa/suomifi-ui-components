import React, { Component, forwardRef } from 'react';
import { styled } from 'styled-components';
import classnames from 'classnames';
import { IconArrowLeft, IconArrowRight } from 'suomifi-icons';
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
import { baseStyles } from './Pagination.baseStyles';
import { HtmlSpan, HtmlNav, HtmlDiv, HtmlNavProps } from '../../reset';
import { PageInput, PageInputValue } from './PageInput/PageInput';
import { Button } from '../Button/Button';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import { AutoId } from '../utils/AutoId/AutoId';
import { filterDuplicateKeys } from '../../utils/common/common';

export interface PageInputProps {
  /** Page input action button label for screen readers  */
  buttonText: string;
  /** Input placeholder text */
  inputPlaceholderText: string;
  /** Error text shown with invalid page number input */
  invalidValueErrorText: (value: PageInputValue) => string;
  /** Visually hidden label for input field */
  labelText: string;
}

type ShowInputProps =
  | {
      pageInput: false;
      pageInputProps?: never;
    }
  | {
      /** Shows the input field for page number */
      pageInput?: true;
      /** Props for the page input field
       * <pre>
       * // Page input action button label for screen readers
       * buttonText: string;
       * // Input placeholder text
       * inputPlaceholderText: string;
       * // Error text shown with invalid page number input
       * invalidValueErrorText: (value: PageInputValue) => string;
       * // Visually hidden label for input field
       * labelText: string;
       * </pre> */
      pageInputProps: PageInputProps;
    };

interface InternalPaginationProps {
  /** CSS class for custom styles */
  className?: string;
  /** aria-label for the Pagination's root `<nav>` element  */
  'aria-label': string;
  /**
   * HTML id attribute.
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /**
   * Function to form the number indicator text shown between the arrow navigation buttons. Should return e.g. 'Page 1/5'
   * @param {number} currentPage Current page
   * @param {number} lastPage Last page
   */
  pageIndicatorText: (currentPage: number, lastPage: number) => string;
  /** Function to form the page indicator text for screen readers. Should return e.g. 'Page 1 out of 5'
   * @param {number} currentPage Current page
   * @param {number} lastPage Last page
   */
  ariaPageIndicatorText: (currentPage: number, lastPage: number) => string;
  /** Toggles small screen styling */
  smallScreen?: boolean;
  /** Controlled number of the current page. Will be used instead of component's own internal state if provided. */
  currentPage?: number;
  /** Number of the last page */
  lastPage: number;
  /** Returns the selected page number */
  onChange: (page: number) => void;
  /** Ref is placed to the outermost div element of the component. Alternative for React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLElement>;
  /** Next page button label for screen readers  */
  nextButtonAriaLabel: string;
  /** Previous page button label for screen readers */
  previousButtonAriaLabel: string;
}

export type PaginationProps = ShowInputProps &
  InternalPaginationProps &
  Omit<HtmlNavProps, 'onChange'> &
  MarginProps;

const baseClassName = 'fi-pagination';

export const paginationClassNames = {
  styleWrapper: `${baseClassName}_style-wrapper`,
  content: `${baseClassName}_content`,
  contentWrapper: `${baseClassName}_contentWrapper`,
  heading: `${baseClassName}_heading`,
  textContentWrapper: `${baseClassName}_text-content-wrapper`,
  icon: `${baseClassName}_icon`,
  iconWrapper: `${baseClassName}_icon-wrapper`,
  pageButton: `${baseClassName}_page-button`,
  arrowButton: `${baseClassName}_arrow-button`,
  smallScreen: `${baseClassName}--small-screen`,
  pageInputWrapper: `${baseClassName}_page-input-wrapper`,
  buttonsWrapper: `${baseClassName}_buttons-wrapper`,
  actionElementWrapper: `${baseClassName}_action-element-wrapper`,
  pageNumbers: `${baseClassName}_page-numbers`,
};

interface PaginationState {
  currentPage: number;
}

class BasePagination extends Component<PaginationProps> {
  private onLeftButtonClick = () => {
    if (this.props.currentPage) {
      this.props.onChange(this.props.currentPage - 1);
    } else {
      this.props.onChange(this.state.currentPage - 1);
      this.setState((prevState: PaginationState) => ({
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

  private onRightButtonClick = () => {
    if (this.props.currentPage) {
      this.props.onChange(this.props.currentPage + 1);
    } else {
      this.props.onChange(this.state.currentPage + 1);
      this.setState((prevState: PaginationState) => ({
        currentPage: prevState.currentPage + 1,
      }));
    }
  };

  private onNumberInputChange = (page: number) => {
    this.props.onChange(page);
    this.setState({ currentPage: page });
  };

  state: PaginationState = {
    currentPage: 1,
  };

  getCurrentPage() {
    return this.props.currentPage || this.state.currentPage;
  }

  render() {
    const {
      children,
      className,
      pageIndicatorText,
      ariaPageIndicatorText,
      onChange,
      currentPage,
      lastPage,
      previousButtonAriaLabel,
      nextButtonAriaLabel,
      pageInput,
      pageInputProps,
      smallScreen,
      id,
      style,
      ...rest
    } = this.props;

    const [_marginProps, passProps] = separateMarginProps(rest);

    const pageInputId = `${id}-pageInput`;

    return (
      <HtmlNav
        {...passProps}
        className={classnames(baseClassName, className, {
          [paginationClassNames.smallScreen]: !!smallScreen,
        })}
        style={style}
      >
        <HtmlDiv className={paginationClassNames.styleWrapper}>
          <HtmlDiv className={paginationClassNames.buttonsWrapper}>
            <VisuallyHidden
              aria-live="polite"
              aria-atomic="true"
              id={`${id}-page-change-announce`}
            >
              {ariaPageIndicatorText(this.getCurrentPage(), lastPage)}
            </VisuallyHidden>

            <Button
              id={`${id}-previous-button`}
              className={paginationClassNames.arrowButton}
              variant="secondary"
              onClick={this.onLeftButtonClick}
              icon={<IconArrowLeft />}
              disabled={this.getCurrentPage() <= 1}
              aria-label={previousButtonAriaLabel}
            />

            <HtmlSpan className={paginationClassNames.pageNumbers}>
              {pageIndicatorText(this.getCurrentPage(), lastPage)}
            </HtmlSpan>
            <Button
              id={`${id}-next-button`}
              className={paginationClassNames.arrowButton}
              variant="secondary"
              onClick={this.onRightButtonClick}
              disabled={this.getCurrentPage() >= lastPage}
              aria-label={nextButtonAriaLabel}
              icon={<IconArrowRight />}
            />
          </HtmlDiv>

          {pageInput === true && pageInputProps && (
            <HtmlDiv className={paginationClassNames.pageInputWrapper}>
              <PageInput
                id={pageInputId}
                pageInputButtonLabel={pageInputProps.buttonText}
                visualPlaceholder={pageInputProps.inputPlaceholderText}
                maxValue={lastPage}
                labelText={pageInputProps.labelText}
                onPageChange={(page) => {
                  this.onNumberInputChange(Number(page));
                }}
                invalidValueErrorText={pageInputProps.invalidValueErrorText}
              />
            </HtmlDiv>
          )}
        </HtmlDiv>
      </HtmlNav>
    );
  }
}

const StyledPagination = styled(
  (props: PaginationProps & SuomifiThemeProp & GlobalMarginProps) => {
    const { theme, globalMargins, ...passProps } = props;
    return <BasePagination {...passProps} />;
  },
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.pagination,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const Pagination = forwardRef(
  (props: PaginationProps, ref: React.RefObject<HTMLElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <AutoId id={propId}>
                {(id) => (
                  <StyledPagination
                    id={id}
                    theme={suomifiTheme}
                    globalMargins={margins}
                    forwardedRef={ref}
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

Pagination.displayName = 'Pagination';
export { Pagination };
