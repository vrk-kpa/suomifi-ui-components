import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import { Icon } from '../Icon/Icon';

import { baseStyles } from './Pagination.baseStyles';
import { HtmlSpan, HtmlNav } from '../../reset';

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

  /*
- invalidValueText (5 ei ole sallittu arvo)

*/
}

const baseClassName = 'fi-pagination';

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
      ...passProps
    } = this.props;
    return (
      <HtmlNav
        {...passProps}
        className={classnames(baseClassName, className, externalClassName)}
      >
        <Button
          variant="secondary"
          onClick={this.onLeftButtonClick}
          icon="arrowLeft"
          disabled={currentPage <= 1}
          aria-label="Previous"
        />

        <HtmlSpan aria-live="polite" aria-atomic="true">
          {textFunction ? textFunction() : 'empty'}
        </HtmlSpan>

        <Button
          variant="secondary"
          onClick={this.onRightButtonClick}
          disabled={currentPage >= lastPage}
          aria-label="Next"
        >
          <Icon icon="arrowRight" />
        </Button>

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
