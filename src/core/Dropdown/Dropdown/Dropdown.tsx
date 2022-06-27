import React, {
  Component,
  ReactNode,
  ReactElement,
  forwardRef,
  KeyboardEvent,
  useRef,
} from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  ListboxInput,
  ListboxButton,
  ListboxButtonProps,
  ListboxPopoverProps,
  ListboxList,
  ListboxPopover,
  useListboxContext,
} from '@reach/listbox';
import { positionMatchWidth } from '@reach/popover';
import { getConditionalAriaProp } from '../../../utils/aria';
import { useEnhancedEffect } from '../../../utils/common';
import { getLogger } from '../../../utils/log';
import { AutoId } from '../../utils/AutoId/AutoId';
import { HtmlSpan, HtmlDiv } from '../../../reset';
import { Label, LabelMode } from '../../Form/Label/Label';
import { DropdownItemProps } from '../DropdownItem/DropdownItem';
import { baseStyles } from './Dropdown.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';

const baseClassName = 'fi-dropdown';

export const dropdownClassNames = {
  baseClassName,
  labelIsVisible: `${baseClassName}_label--visible`,
  button: `${baseClassName}_button`,
  popover: `${baseClassName}_popover`,
  item: `${baseClassName}_item`,
  noSelectedStyles: `${baseClassName}--noSelectedStyles`,
  disabled: `${baseClassName}--disabled`,
};

interface DropdownState {
  selectedValue: string | undefined;
}

interface InternalDropdownProps {
  /**
   * Unique id
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /** Name used for input's form value. */
  name?: string;
  /** Default for non controlled Dropdown, intially selected value */
  defaultValue?: string;
  /** Controlled selected value, overrides defaultValue if provided. */
  value?: string;
  /** Label for the Dropdown component. */
  labelText: string;
  /** Visual hint to show if nothing is selected and no value or defaultValue is provided */
  visualPlaceholder?: ReactNode;
  /** Show the visual placeholder instead of selected value and act as an action menu */
  alwaysShowVisualPlaceholder?: boolean;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
  /** Text to mark a field optional. Will be wrapped in parentheses and shown after labelText. */
  optionalText?: string;
  /**
   * Additional label id. E.g. form group label.
   * Used in addition to labelText for screen readers.
   */
  'aria-labelledby'?: string;
  /** Custom classname to extend or customize */
  className?: string;
  /** Disable component */
  disabled?: boolean;
  /** Properties given to dropdown's Button-component, className etc. */
  dropdownButtonProps?: ListboxButtonProps;
  /** Properties given to dropdown's popover-component, className etc. */
  dropdownPopoverProps?: ListboxPopoverProps;
  /** DropdownItems */
  children?:
    | Array<ReactElement<DropdownItemProps>>
    | ReactElement<DropdownItemProps>;
  /** Callback that fires when the dropdown value changes. */
  onChange?(newValue: string): void;
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

export interface DropdownProps extends InternalDropdownProps {
  /** Ref object to be passed to the input element */
  ref?: React.RefObject<HTMLDivElement>;
}

const ListBoxContextWrapper = (props: {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  // eslint-disable-next-line react/require-default-props
  children?:
    | Array<ReactElement<DropdownItemProps>>
    | ReactElement<DropdownItemProps>;
}) => {
  const { highlightedOptionRef, selectedOptionRef, isExpanded } =
    useListboxContext();
  const scrollToHighlightedOptionRef = useRef(false);
  useEnhancedEffect(() => {
    if (scrollToHighlightedOptionRef.current) {
      scrollItemList();
      scrollToHighlightedOptionRef.current = false;
    }
  });

  useEnhancedEffect(() => {
    if (isExpanded) {
      scrollItemList(selectedOptionRef);
    }
  }, [isExpanded]);

  const scrollItemList = (
    scrollToRef?: React.RefObject<HTMLElement | null>,
  ) => {
    const scrollToItem = !!scrollToRef?.current
      ? scrollToRef.current
      : highlightedOptionRef.current;
    if (!!scrollToItem && !!props.scrollContainerRef.current) {
      const elementOffsetTop = scrollToItem.offsetTop || 0;
      const elementOffsetHeight = scrollToItem.offsetHeight || 0;
      if (elementOffsetTop < props.scrollContainerRef.current.scrollTop) {
        // eslint-disable-next-line no-param-reassign
        props.scrollContainerRef.current.scrollTop = elementOffsetTop;
      } else {
        const offsetBottom = elementOffsetTop + elementOffsetHeight;
        const scrollBottom =
          props.scrollContainerRef.current.scrollTop +
          props.scrollContainerRef.current.offsetHeight;
        if (offsetBottom > scrollBottom) {
          // eslint-disable-next-line no-param-reassign
          props.scrollContainerRef.current.scrollTop =
            offsetBottom - props.scrollContainerRef.current.offsetHeight;
        }
      }
    }
  };

  return (
    <ListboxList
      onKeyDown={(event) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
          scrollToHighlightedOptionRef.current = true;
        }
      }}
    >
      {props.children}
    </ListboxList>
  );
};

class BaseDropdown extends Component<DropdownProps & InnerRef> {
  state: DropdownState = {
    selectedValue:
      'value' in this.props
        ? this.props.value
        : 'defaultValue' in this.props
        ? this.props.defaultValue
        : undefined,
  };

  buttonRef: React.RefObject<HTMLButtonElement>;

  popoverRef: React.RefObject<HTMLDivElement>;

  constructor(props: DropdownProps & InnerRef) {
    super(props);
    this.buttonRef = React.createRef();
    this.popoverRef = React.createRef();
  }

  static getDerivedStateFromProps(
    nextProps: DropdownProps,
    prevState: DropdownState,
  ) {
    const { value } = nextProps;
    if ('value' in nextProps && value !== prevState.selectedValue) {
      return { selectedValue: value };
    }
    return null;
  }

  render() {
    const {
      id,
      name,
      disabled,
      children,
      labelText,
      labelMode,
      forwardedRef,
      optionalText,
      'aria-labelledby': ariaLabelledBy,
      visualPlaceholder,
      alwaysShowVisualPlaceholder,
      className,
      dropdownButtonProps = {},
      dropdownPopoverProps = {},
      onChange: propOnChange,
      ...passProps
    } = this.props;

    if (React.Children.count(children) < 1) {
      getLogger().warn(`Dropdown '${labelText}' does not contain items`);
      return null;
    }

    const labelId = `${id}-label`;
    const buttonId = `${id}_button`;

    const { selectedValue } = this.state;

    const passDropdownPopoverProps = {
      ...dropdownPopoverProps,
      className: classnames(className, dropdownClassNames.popover, {
        [dropdownClassNames.noSelectedStyles]: !!alwaysShowVisualPlaceholder,
      }),
    };

    const onChange = (newValue: string) => {
      if (!!propOnChange) {
        propOnChange(newValue);
      }
      if (!('value' in this.props)) {
        this.setState({ selectedValue: newValue });
      }
    };

    // If alwaysShowVisualPlaceholder is true or there is no selected value, use visualPlaceHolder.
    // With seleceted value use null and let Reach fetch the seleceted item node from internal context.
    const listboxDisplayValue = alwaysShowVisualPlaceholder
      ? visualPlaceholder
      : !!selectedValue
      ? null
      : visualPlaceholder;

    return (
      <HtmlSpan
        className={classnames(className, baseClassName)}
        id={id}
        {...passProps}
      >
        <HtmlDiv>
          <Label
            id={labelId}
            labelMode={labelMode}
            optionalText={optionalText}
            className={classnames({
              [dropdownClassNames.labelIsVisible]: labelMode !== 'hidden',
            })}
          >
            {labelText}
          </Label>
          <ListboxInput
            {...getConditionalAriaProp('aria-labelledby', [
              ariaLabelledBy,
              labelId,
            ])}
            disabled={disabled}
            onChange={onChange}
            ref={forwardedRef}
            name={name}
            value={selectedValue || ''}
          >
            <ListboxButton
              ref={this.buttonRef}
              {...dropdownButtonProps}
              id={buttonId}
              className={classnames(dropdownClassNames.button, {
                [dropdownClassNames.disabled]: !!disabled,
              })}
              {...getConditionalAriaProp(
                'aria-labelledby',
                selectedValue === undefined ? [ariaLabelledBy, labelId] : [],
              )}
            >
              {listboxDisplayValue}
            </ListboxButton>
            <ListboxPopover
              ref={this.popoverRef}
              position={positionMatchWidth}
              {...passDropdownPopoverProps}
              onKeyDownCapture={(event: KeyboardEvent) => {
                if (event.code === 'Tab' && !!this.buttonRef.current) {
                  event.preventDefault();
                  this.buttonRef.current.focus();
                }
              }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  event.stopPropagation();
                }
              }}
            >
              <ListBoxContextWrapper scrollContainerRef={this.popoverRef}>
                {children}
              </ListBoxContextWrapper>
            </ListboxPopover>
          </ListboxInput>
        </HtmlDiv>
      </HtmlSpan>
    );
  }
}

const StyledDropdown = styled(
  ({
    theme,
    ...passProps
  }: InternalDropdownProps & InnerRef & SuomifiThemeProp) => (
    <BaseDropdown {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Use for selectable dropdown with items.
 */
export const Dropdown = forwardRef(
  (props: DropdownProps, ref: React.RefObject<HTMLDivElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledDropdown
                theme={suomifiTheme}
                id={id}
                forwardedRef={ref}
                {...passProps}
              />
            )}
          </AutoId>
        )}
      </SuomifiThemeConsumer>
    );
  },
);
