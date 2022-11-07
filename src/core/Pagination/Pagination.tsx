import React, { Component, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import { baseStyles } from './Pagination.baseStyles';
import { HtmlSpan, HtmlNav, HtmlDiv } from '../../reset';
import { asPropType } from '../../utils/typescript';
import { PageInput } from './PageInput/PageInput';
import { Button } from '../Button/Button';

const externalClassName = 'fi-link--external';

export interface PaginationInputProps {
  /** Page input action button label for screen readers  */
  pageInputButtonText: string;
  /** Input placeholder text */
  inputPlaceholderText: string;
  /** Error text shown with invalid page number input */
  invalidValueErrorText: string;
  /** Visually hidden label for input field */
  labelText: string;
}

interface InternalPaginationProps {
  /** Custom classname to extend or customize */
  className?: string;
  /** Is there any need to have as prop */
  asProp?: asPropType;
  /** aria-label for pagination  */
  'aria-label': string;
  /** Function for page number indicator text */
  textFunction?: (currentPage: number, lastPage: number) => string;
  /** Use small screen styling */
  smallScreen?: boolean;
  /** Number of the current page */
  currentPage: number;
  /** Number of the last page */
  lastPage: number;
  /** Returns the selected page number */
  onChange: (page: number) => void;

  /** Ref is forwarded to root element. Alternative for React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLElement>;
  /** Next page button label for screen readers  */
  ariaNextButtonLabel: string;
  /** Previous page button label for screen readers */
  ariaPreviousButtonLabel: string;

  pageInput?: boolean;

  paginationInputProps?: PaginationInputProps;
}

// export type PaginationProps = inputProps & InternalPaginationProps;
export type PaginationProps = InternalPaginationProps;

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
  stockButton: `${baseClassName}_stock-button`,
  smallScreen: `${baseClassName}--small-screen`,
  pageInputWrapper: `${baseClassName}_page-input-wrapper`,
  buttonsWrapper: `${baseClassName}_buttons-wrapper`,
  actionElementWrapper: `${baseClassName}_action-element-wrapper`,
  pageNumbers: `${baseClassName}_page-numbers`,
};

class BasePagination extends Component<PaginationProps> {
  private onLeftButtonClick = () => {
    this.props.onChange(this.props.currentPage - 1);
  };

  private onRightButtonClick = () => {
    this.props.onChange(this.props.currentPage + 1);
  };

  private onNumberInputChange = (page: number) => {
    this.props.onChange(page);
  };

  render() {
    const {
      children,
      className,
      asProp,
      textFunction,
      onChange,
      currentPage,
      lastPage,
      ariaPreviousButtonLabel,
      ariaNextButtonLabel,
      pageInput,
      paginationInputProps,
      smallScreen,
      ...passProps
    } = this.props;
    return (
      <HtmlNav
        {...passProps}
        className={classnames(baseClassName, className, externalClassName, {
          [paginationClassNames.smallScreen]: !!smallScreen,
        })}
      >
        <HtmlDiv className={paginationClassNames.styleWrapper}>
          <HtmlDiv className={paginationClassNames.buttonsWrapper}>
            <Button
              className={paginationClassNames.stockButton}
              variant="secondary"
              onClick={this.onLeftButtonClick}
              icon="arrowLeft"
              disabled={currentPage <= 1}
              aria-label={ariaPreviousButtonLabel}
            />

            <HtmlSpan
              aria-live="polite"
              aria-atomic="true"
              className={paginationClassNames.pageNumbers}
            >
              {textFunction ? textFunction(currentPage, lastPage) : ''}
            </HtmlSpan>

            <Button
              className={paginationClassNames.stockButton}
              variant="secondary"
              onClick={this.onRightButtonClick}
              disabled={currentPage >= lastPage}
              aria-label={ariaNextButtonLabel}
              icon="arrowRight"
            />
          </HtmlDiv>

          {pageInput === true && paginationInputProps && (
            <HtmlDiv className={paginationClassNames.pageInputWrapper}>
              <PageInput
                pageInputButtonLabel={paginationInputProps.pageInputButtonText}
                visualPlaceholder={paginationInputProps.inputPlaceholderText}
                maxValue={lastPage}
                labelText={paginationInputProps.labelText}
                onPageChange={(page) => {
                  this.onNumberInputChange(Number(page));
                }}
                statusText={paginationInputProps.invalidValueErrorText}
              />
            </HtmlDiv>
          )}
        </HtmlDiv>
      </HtmlNav>
    );
  }
}

const StyledPagination = styled((props: PaginationProps & SuomifiThemeProp) => {
  const { theme, ...passProps } = props;
  return <BasePagination {...passProps} />;
})`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Used for pagination
 */

const Pagination = forwardRef(
  (props: PaginationProps, ref: React.RefObject<HTMLElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledPagination theme={suomifiTheme} forwardedRef={ref} {...props} />
      )}
    </SuomifiThemeConsumer>
  ),
);

Pagination.displayName = 'Pagination';
export { Pagination };
