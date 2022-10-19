import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import { baseStyles } from './Pagination.baseStyles';
import { HtmlSpan, HtmlNav, HtmlDiv } from '../../reset';
import { asPropType } from '../../utils/typescript';
import { SearchInput } from './PageInput/SearchInput';
import { Button } from '../Button/Button';

const externalClassName = 'fi-link--external';

export interface PaginationProps {
  /** Custom classname to extend or customize */
  className?: string;
  asProp?: asPropType;
  /** clickety left 
  onLeftButtonClick?: () => void; */
  /** click right 
  onRightButtonClick?: () => void; */

  'aria-label': string;

  /** click right */
  textFunction?: () => string;
  /** Show shortcut input */
  shortcut?: boolean;
  /** Use small screen styling */
  smallScreen?: boolean;

  currentPage: number;
  lastPage: number;

  onChange: (page: number) => void;

  /** Error text shown with invalid page number input */
  invalidValueErrorText: string;

  pageInput?: boolean;

  ariaNextButtonLabel: string;
  ariaPreviousButtonLabel: string;

  /*
- invalidValueText (5 ei ole sallittu arvo)

*/
}

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
      invalidValueErrorText,
      pageInput,
      smallScreen,
      ariaNextButtonLabel,
      ariaPreviousButtonLabel,
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
              {textFunction ? textFunction() : 'empty'}
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

          {pageInput === true && (
            <HtmlDiv className={paginationClassNames.pageInputWrapper}>
              <SearchInput
                labelText=""
                labelMode="hidden"
                searchButtonLabel="Siirry"
                visualPlaceholder="Siirry sivulle"
                maxValue={lastPage}
                // onSearch={(value) => console.log(value)}
                onSearch={(page) => {
                  this.onNumberInputChange(Number(page));
                }}
                statusText={invalidValueErrorText}
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
const Pagination = (props: PaginationProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => <StyledPagination theme={suomifiTheme} {...props} />}
  </SuomifiThemeConsumer>
);

Pagination.displayName = 'Pagination';
export { Pagination };
