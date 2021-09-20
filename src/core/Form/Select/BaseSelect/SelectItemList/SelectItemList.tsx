import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../../theme';
import { HtmlDivWithRef, HtmlUlWithRef } from '../../../../../reset';
import { SelectItemProps } from '../SelectItem/SelectItem';
import { baseStyles } from './SelectItemList.baseStyles';

const baseClassName = 'fi-select-item-list';

const selectItemListClassNames = {
  content_wrapper: `${baseClassName}_content_wrapper`,
};

export interface SelectItemListProps {
  /** SelectItemList container div class name for custom styling. */
  className?: string;
  children:
    | Array<React.ReactElement<SelectItemProps>>
    | React.ReactElement<SelectItemProps>;
  forwardRef: React.RefObject<HTMLUListElement>;
  focusedDescendantId: { id: string };
  onBlur?: (event: React.FocusEvent<Element>) => void;
  /** Id needed for aria-owns and aria-controls in Combobox */
  id: string;
}

class BaseSelectItemList extends Component<
  SelectItemListProps & SuomifiThemeProp
> {
  private wrapperRef: React.RefObject<HTMLDivElement>;

  constructor(props: SelectItemListProps & SuomifiThemeProp) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  componentDidUpdate(prevProps: SelectItemListProps & SuomifiThemeProp) {
    if (
      this.props.focusedDescendantId !== prevProps.focusedDescendantId &&
      !!this.props.focusedDescendantId.id
    ) {
      this.scrollItemList(this.props.focusedDescendantId.id);
    }
  }

  private scrollItemList = (elementId: string) => {
    if (this.wrapperRef !== null && this.wrapperRef.current !== null) {
      const elementOffsetTop =
        document.getElementById(elementId)?.offsetTop || 0;
      const elementOffsetHeight =
        document.getElementById(elementId)?.offsetHeight || 0;
      if (elementOffsetTop < this.wrapperRef.current.scrollTop) {
        this.wrapperRef.current.scrollTop = elementOffsetTop;
      } else {
        const offsetBottom = elementOffsetTop + elementOffsetHeight;
        const scrollBottom =
          this.wrapperRef.current.scrollTop +
          this.wrapperRef.current.offsetHeight;
        if (offsetBottom > scrollBottom) {
          this.wrapperRef.current.scrollTop =
            offsetBottom - this.wrapperRef.current.offsetHeight;
        }
      }
    }
  };

  render() {
    const {
      className,
      theme,
      forwardRef,
      children,
      onBlur,
      id,
      focusedDescendantId,
      ...passProps
    } = this.props;
    return (
      <HtmlUlWithRef
        id={id}
        tabIndex={0}
        forwardRef={forwardRef}
        className={classnames(baseClassName, className, {})}
        {...passProps}
        role="listbox"
        onBlur={onBlur}
      >
        <HtmlDivWithRef
          forwardedRef={this.wrapperRef}
          className={selectItemListClassNames.content_wrapper}
        >
          {children}
        </HtmlDivWithRef>
      </HtmlUlWithRef>
    );
  }
}

const StyledSelectItemList = styled(BaseSelectItemList)`
  ${({ theme }) => baseStyles(theme)}
`;

export class SelectItemList extends Component<SelectItemListProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledSelectItemList theme={suomifiTheme} {...this.props} />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
