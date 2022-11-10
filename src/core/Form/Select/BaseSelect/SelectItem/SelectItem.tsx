import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { IconCheck } from 'suomifi-icons/baseIcons';
import { escapeStringRegexp } from '../../../../../utils/common';
import { HtmlLi } from '../../../../../reset';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../../theme';
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
  /** Unique id for the item */
  id: string;
  /** Indicates if the current item has keyboard focuses. */
  hasKeyboardFocus: boolean;
  /** Query for matching string type item children for highlighting text. */
  hightlightQuery: string | undefined;
  /** Checked state for the item */
  checked: boolean;
  /** onClick event handler */
  onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
  /** Item children, dislayed as item content */
  children: ReactNode;
  /** SelectItem container div class name for custom styling. */
  className?: string;
  /** Item disabled state */
  disabled?: boolean;
}

class BaseSelectItem extends Component<SelectItemProps & SuomifiThemeProp> {
  private highlightQuery = (text: string, query: string = '') => {
    if (query.length > 0) {
      const substrings = text.split(
        new RegExp(`(${escapeStringRegexp(query)})`, 'gi'),
      );
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
        onClick={(event) => {
          if (!!onClick) {
            onClick(event);
          }
        }}
        onMouseDown={(event) => {
          // prevent focusing the li element
          event.preventDefault();
        }}
        {...passProps}
      >
        {React.Children.map(children, (child) => {
          if (typeof child === 'string') {
            return this.highlightQuery(child, hightlightQuery);
          }
          return child;
        })}

        {checked && (
          <IconCheck className={selectItemClassNames.icon} aria-hidden={true} />
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
