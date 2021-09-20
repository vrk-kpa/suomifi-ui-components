import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlLi } from '../../../../../reset';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../../theme';
import { Icon } from '../../../../Icon/Icon';
import { baseStyles } from './SelectItem.baseStyles';

const baseClassName = 'fi-select-item';

const selectItemClassNames = {
  wrapper: `${baseClassName}_wrapper`,
  hasKeyboardFocus: `${baseClassName}--hasKeyboardFocus`,
  queryHighlight: `${baseClassName}--query_highlight`,
  selected: `${baseClassName}--selected`,
  disabled: `${baseClassName}--disabled`,
  icon: `${baseClassName}_icon`,
};

export interface SelectItemProps {
  /** SelectItem container div class name for custom styling. */
  className?: string;
  /** Indicates if the current item has keyboard focus. */
  hasKeyboardFocus: boolean;
  /** Query for matching string type item children for highlighting text. */
  hightlightQuery: string | undefined;
  checked: boolean;
  disabled?: boolean;
  id?: string;
  onClick: () => void;
  children: ReactNode;
}

class BaseSelectItem extends Component<SelectItemProps & SuomifiThemeProp> {
  private highlightQuery = (text: string, query: string = '') => {
    if (query.length > 0) {
      const substrings = text.split(new RegExp(`(${query})`, 'gi'));
      return substrings.map((substring, i) => {
        const isMatch = substring.toLowerCase() === query.toLowerCase();
        if (isMatch) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <mark className={selectItemClassNames.queryHighlight} key={i}>
              {substring}
            </mark>
          );
        }
        // eslint-disable-next-line react/no-array-index-key
        return <React.Fragment key={i}>{substring}</React.Fragment>;
      });
    }
    return text;
  };

  render() {
    const {
      className,
      theme,
      children,
      checked,
      hasKeyboardFocus,
      hightlightQuery,
      disabled,
      id,
      onClick,
      ...passProps
    } = this.props;

    return (
      <HtmlLi
        className={classnames(baseClassName, className, {
          [selectItemClassNames.hasKeyboardFocus]: hasKeyboardFocus,
          [selectItemClassNames.selected]: checked,
          [selectItemClassNames.disabled]: disabled,
        })}
        tabIndex={-1}
        role="option"
        aria-selected={checked}
        aria-disabled={disabled || false}
        id={id}
        onClick={onClick}
        {...passProps}
      >
        {React.Children.map(children, (child) => {
          if (typeof child === 'string') {
            return this.highlightQuery(child, hightlightQuery);
          }
          return child;
        })}

        {checked && (
          <Icon
            icon="check"
            className={selectItemClassNames.icon}
            aria-hidden={true}
          />
        )}
      </HtmlLi>
    );
  }
}

const StyledSelectItem = styled(BaseSelectItem)`
  ${({ theme }) => baseStyles(theme)}
`;

export class SelectItem extends Component<SelectItemProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledSelectItem theme={suomifiTheme} {...this.props} />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
