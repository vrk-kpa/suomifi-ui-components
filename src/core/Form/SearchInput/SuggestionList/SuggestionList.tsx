import React, {
  Component,
  RefObject,
  forwardRef,
  ReactElement,
  createRef,
  FocusEvent,
} from 'react';
import styled from 'styled-components'; // Fixed import for styled-components
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../theme';
import { HtmlUlWithRef } from '../../../../reset';
import { forkRefs } from '../../../../utils/common/common';
import { baseStyles } from './SuggestionList.baseStyles';

const baseClassName = 'fi-suggstion-list';

export interface SuggestionListProps {
  /** SuggestionList container div class name for custom styling. */
  className?: string;
  /** List items */
  children: ReactElement | Array<ReactElement | Array<ReactElement>>;
  /** Id for the currently focused list item for styles and scrolling */
  focusedDescendantId: string;
  /** onBlur event handler */
  onBlur?: (event: FocusEvent<Element>) => void;
  /** onKeyDown event handler */
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void;
  /** Id needed for aria-owns and aria-controls */
  id: string;
  /** Prevents scrollItemList() function from running */
  preventScrolling?: boolean;
}

interface InnerRef {
  forwardedRef: React.Ref<HTMLUListElement>;
}
class BaseSuggestionList extends Component<
  SuggestionListProps & InnerRef & SuomifiThemeProp
> {
  private wrapperRef: RefObject<HTMLUListElement>;

  constructor(props: SuggestionListProps & InnerRef & SuomifiThemeProp) {
    super(props);
    this.wrapperRef = createRef();
  }

  componentDidUpdate(
    prevProps: SuggestionListProps & InnerRef & SuomifiThemeProp,
  ) {
    if (
      this.props.focusedDescendantId !== prevProps.focusedDescendantId &&
      !!this.props.focusedDescendantId &&
      !this.props.preventScrolling
    ) {
      this.scrollItemList(this.props.focusedDescendantId);
    }
  }

  componentDidMount() {
    if (!!this.props.focusedDescendantId && !this.props.preventScrolling) {
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
      onKeyDown,
      id,
      focusedDescendantId,
      preventScrolling,
      ...passProps
    } = this.props;

    return (
      <HtmlUlWithRef
        id={id}
        tabIndex={0}
        forwardRef={forkRefs(this.wrapperRef, forwardedRef)}
        className={classnames(baseClassName, className, {})}
        {...passProps}
        role="listbox"
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        aria-activedescendant={focusedDescendantId}
      >
        {children}
      </HtmlUlWithRef>
    );
  }
}

const StyledSuggestionList = styled(BaseSuggestionList)`
  ${({ theme }) => baseStyles(theme)}
`;

export const SuggestionList = forwardRef(
  (props: SuggestionListProps, ref: RefObject<HTMLUListElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledSuggestionList
          theme={suomifiTheme}
          forwardedRef={ref}
          {...props}
        />
      )}
    </SuomifiThemeConsumer>
  ),
);
