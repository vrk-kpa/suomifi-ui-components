import React, {
  Component,
  RefObject,
  forwardRef,
  ReactElement,
  createRef,
  FocusEvent,
} from 'react';
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
  /** List items */
  children:
    | Array<ReactElement<SelectItemProps>>
    | ReactElement<SelectItemProps>;
  /** Id for the currently focused list item for styles and scrolling */
  focusedDescendantId: string;
  /** onBlur event handler */
  onBlur?: (event: FocusEvent<Element>) => void;
  /** Id needed for aria-owns and aria-controls */
  id: string;
}

interface InnerRef {
  forwardedRef: RefObject<HTMLDivElement>;
}
class BaseSelectItemList extends Component<
  SelectItemListProps & InnerRef & SuomifiThemeProp
> {
  private wrapperRef: RefObject<HTMLUListElement>;

  constructor(props: SelectItemListProps & InnerRef & SuomifiThemeProp) {
    super(props);
    this.wrapperRef = createRef();
  }

  componentDidUpdate(
    prevProps: SelectItemListProps & InnerRef & SuomifiThemeProp,
  ) {
    if (
      this.props.focusedDescendantId !== prevProps.focusedDescendantId &&
      !!this.props.focusedDescendantId
    ) {
      this.scrollItemList(this.props.focusedDescendantId);
    }
  }

  private scrollItemList = (elementId: string) => {
    // 4px reduction to scroll position is required due to container padding.
    const wrapperOffsetPx = 4;
    if (this.wrapperRef !== null && this.wrapperRef.current !== null) {
      const elementOffsetTop =
        document.getElementById(elementId)?.offsetTop || 0;
      const elementOffsetHeight =
        document.getElementById(elementId)?.offsetHeight || 0;
      if (elementOffsetTop < this.wrapperRef.current.scrollTop) {
        this.wrapperRef.current.scrollTop = elementOffsetTop - wrapperOffsetPx;
      } else {
        const offsetBottom = elementOffsetTop + elementOffsetHeight;
        const scrollBottom =
          this.wrapperRef.current.scrollTop +
          this.wrapperRef.current.offsetHeight;
        if (offsetBottom > scrollBottom) {
          this.wrapperRef.current.scrollTop =
            offsetBottom -
            this.wrapperRef.current.offsetHeight -
            wrapperOffsetPx;
        }
      }
    }
  };

  render() {
    const {
      className,
      theme,
      forwardedRef,
      children,
      onBlur,
      id,
      focusedDescendantId,
      ...passProps
    } = this.props;
    return (
      <HtmlDivWithRef
        forwardedRef={forwardedRef}
        className={classnames(baseClassName, className, {})}
      >
        <HtmlUlWithRef
          id={id}
          tabIndex={0}
          {...passProps}
          role="listbox"
          onBlur={onBlur}
          forwardRef={this.wrapperRef}
          className={selectItemListClassNames.content_wrapper}
        >
          {children}
        </HtmlUlWithRef>
      </HtmlDivWithRef>
    );
  }
}

const StyledSelectItemList = styled(BaseSelectItemList)`
  ${({ theme }) => baseStyles(theme)}
`;

export const SelectItemList = forwardRef(
  (props: SelectItemListProps, ref: RefObject<HTMLDivElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledSelectItemList
          theme={suomifiTheme}
          forwardedRef={ref}
          {...props}
        />
      )}
    </SuomifiThemeConsumer>
  ),
);
