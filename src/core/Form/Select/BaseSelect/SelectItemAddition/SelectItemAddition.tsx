import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../../theme';
import { HtmlDiv, HtmlLi } from '../../../../../reset';
import { selectItemAdditionStyles } from './SelectItemAddition.baseStyles';
import classnames from 'classnames';

const baseClassName = 'fi-select-item-addition';

const classNames = {
  hint_text: `${baseClassName}_hint-text`,
  item: `${baseClassName}_item`,
  hasKeyboardFocus: `${baseClassName}_item--hasKeyboardFocus`,
};

export interface SelectItemAdditionProps {
  /** Text displayed above the item. Will also be read by screen readers when focusing on the item itself */
  hintText: string;
  /** onClick event handler */
  onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
  /** Indicates if the current item has keyboard focus. */
  hasKeyboardFocus: boolean;
  /** Unique id for the item */
  id: string;
  /** Text value for the item to be added */
  children: string;
}

class BaseSelectItemAddition extends Component<
  SelectItemAdditionProps & SuomifiThemeProp
> {
  render() {
    const {
      hintText,
      onClick,
      hasKeyboardFocus,
      id,
      theme,
      children,
      ...passProps
    } = this.props;

    return (
      <HtmlDiv {...passProps}>
        <HtmlDiv className={classNames.hint_text}>{hintText}</HtmlDiv>
        <HtmlLi
          className={classnames(classNames.item, {
            [classNames.hasKeyboardFocus]: hasKeyboardFocus,
          })}
          tabIndex={-1}
          onMouseDown={(event) => {
            // prevent focusing the li element
            event.preventDefault();
          }}
          onClick={(event) => {
            if (!!onClick) {
              onClick(event);
            }
          }}
          aria-label={`${hintText}. ${children}.`}
          role="option"
          id={id}
        >
          {children}
        </HtmlLi>
      </HtmlDiv>
    );
  }
}

const StyledSelectItemAddition = styled(BaseSelectItemAddition)`
  ${({ theme }) => selectItemAdditionStyles(theme)}
`;

export class SelectItemAddition extends Component<SelectItemAdditionProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledSelectItemAddition theme={suomifiTheme} {...this.props} />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
