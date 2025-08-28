import React, { Component, ReactNode, ReactElement } from 'react';
import { styled } from 'styled-components';
import classnames from 'classnames';
import { getConditionalAriaProp } from '../../../../utils/aria';
import { getLogger } from '../../../../utils/log';
import { AutoId } from '../../../utils/AutoId/AutoId';
import {
  HtmlSpan,
  HtmlDiv,
  HtmlInput,
  HtmlButton,
  HtmlButtonProps,
} from '../../../../reset';
import { Label, LabelMode } from '../../Label/Label';
import { DropdownItemProps } from '../DropdownItem/DropdownItem';
import { baseStyles } from './Dropdown.baseStyles';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../../../theme';
import {
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../../../theme/utils/spacing';
import {
  filterDuplicateKeys,
  forkRefs,
  getOwnerDocument,
} from '../../../../utils/common/common';
import { Popover, PopoverConsumer } from '../../../../core/Popover/Popover';
import { SelectItemList } from '../../../Form/Select/BaseSelect/SelectItemList/SelectItemList';
import { HintText } from '../../../Form/HintText/HintText';
import { StatusText } from '../../../Form/StatusText/StatusText';
import { StatusTextCommonProps } from '../../../Form/types';

const baseClassName = 'fi-dropdown';

export const dropdownClassNames = {
  baseClassName,
  labelIsVisible: `${baseClassName}_label--visible`,
  inputWrapper: `${baseClassName}_input-wrapper`,
  button: `${baseClassName}_button`,
  popover: `${baseClassName}_popover`,
  itemList: `${baseClassName}_item-list`,
  item: `${baseClassName}_item`,
  statusTextHasContent: `${baseClassName}_statusText--has-content`,
  displayValue: `${baseClassName}_display-value`,
  open: `${baseClassName}--open`,
  disabled: `${baseClassName}--disabled`,
  error: `${baseClassName}--error`,
  italicize: `${baseClassName}--italicize`,
  fullWidth: `${baseClassName}--full-width`,
};

export interface DropdownProviderState<T extends string = string> {
  /** Callback for communicating DropdownItem click to parent  */
  onItemClick: (itemValue: T) => void;
  /** Currently selected DropdownItem */
  selectedDropdownValue: T | undefined | null;
  /** Currently focused DropdownItem */
  focusedItemValue: T | null | undefined;
  /** ID of the Dropdown component.
   * Used in DropdownItem to create a derived ID for each item
   */
  id: string | undefined;
  /** Disable selected styling when used as an action menu */
  noSelectedStyles: boolean | undefined;
  /**
   * Callback for communicating DropdownItem Tab key press to the parent
   */
  onItemTabPress: () => void;
  /** Callback for communicating DropdownItem mouse over to parent  */
  onItemMouseOver: (itemValue: T) => void;
}

const defaultProviderValue: DropdownProviderState = {
  onItemClick: () => null,
  selectedDropdownValue: null,
  id: '',
  focusedItemValue: null,
  noSelectedStyles: false,
  onItemTabPress: () => null,
  onItemMouseOver: () => null,
};

const { Provider: DropdownProvider, Consumer: DropdownConsumer } =
  React.createContext(defaultProviderValue);

interface DropdownState<T> {
  selectedValue: T | undefined | null;
  selectedValueNode: ReactNode | undefined | null;
  ariaExpanded: boolean;
  showPopover: boolean;
  focusedDescendantId: string | null | undefined;
  /**
   * Controls whether SelectItemList should scroll when focusedDescendantId changes.
   * Is set to true when focusedDescendantId changes via onMouseOver.
   * This prevents scrolling bugs
   */
  preventListScrolling: boolean;
  popoverPlacement: string | undefined;
}

export interface DropdownProps<T extends string = string>
  extends StatusTextCommonProps,
    MarginProps,
    Omit<HtmlButtonProps, 'onChange' | 'value'> {
  /**
   * HTML id attribute
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /** HTML name attribute. */
  name?: string;
  /** Sets a default, initially selected value for non controlled Dropdown */
  defaultValue?: T;
  /** Controlled selected value, overrides `defaultValue` if provided. */
  value?: T | null;
  /** Label for the Dropdown component. */
  labelText: ReactNode;
  /** Hint text to be shown below the label */
  hintText?: string;
  /** Visual hint to show if nothing is selected and no value or defaultValue is provided.
   * Should not be used for instructions since assistive technologies don't reliably read a placeholder text */
  visualPlaceholder?: ReactNode;
  /** Always show the visual placeholder instead of the selected value. Makes the Dropdown act as an action menu. */
  alwaysShowVisualPlaceholder?: boolean;
  /** Hides or shows the label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
  /** Text to mark the Dropdown optional. Will be wrapped in parentheses and shown after `labelText` */
  optionalText?: string;
  /**
   * Id of an external label e.g. input group label.
   * Used in addition to `labelText` for screen readers.
   */
  'aria-labelledby'?: string;
  /**
   * `'default'` | `'error'`
   *
   * Status of the component. Error state creates a red border around the Dropdown.
   * Always use a descriptive `statusText` with an error status.
   * @default default
   */
  status?: 'default' | 'error';
  /** Status text to be shown below the component. Use e.g. for validation error messages */
  statusText?: string;
  /** CSS class for custom styles */
  className?: string;
  /** Disables the component */
  disabled?: boolean;
  /** Use `<DropdownItem>` components as children */
  children?:
    | Array<
        | ReactElement<DropdownItemProps<T>>
        | Array<ReactElement<DropdownItemProps<T>>>
      >
    | ReactElement<DropdownItemProps<T>>;
  /** Callback that fires when the Dropdown value changes. */
  onChange?(value: T): void;
  /** Callback that fires on blur */
  onBlur?: () => void;
  /** Tooltip component for the Dropdown's label */
  tooltipComponent?: ReactElement;
  /**
   * Whether the Dropdown's popover is rendered in a portal
   * @default true
   */
  portal?: boolean;
  /** Popover container div CSS class for custom styles. Can be used to modify popover z-index. */
  popoverClassName?: string;
  /** Set component's width to 100% */
  fullWidth?: boolean;
  /** Ref is forwarded to the button element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLButtonElement>;
}

class BaseDropdown<T extends string = string> extends Component<
  DropdownProps<T>
> {
  state: DropdownState<T> = {
    selectedValue:
      'value' in this.props
        ? this.props.value
        : 'defaultValue' in this.props
        ? this.props.defaultValue
        : undefined,
    selectedValueNode: BaseDropdown.getSelectedValueNode(
      'value' in this.props
        ? this.props.value
        : 'defaultValue' in this.props
        ? this.props.defaultValue
        : undefined,
      this.props.children,
    ),
    ariaExpanded: false,
    showPopover: false,
    focusedDescendantId:
      'value' in this.props && !!this.props.value
        ? this.props.value
        : 'defaultValue' in this.props
        ? this.props.defaultValue
        : this.getFirstItemValue(),
    preventListScrolling: false,
    popoverPlacement: 'bottom',
  };

  buttonRef: React.RefObject<HTMLButtonElement>;

  popoverRef: React.RefObject<HTMLUListElement>;

  componentIsMounted: boolean;

  constructor(props: DropdownProps<T>) {
    super(props);
    this.buttonRef = React.createRef();
    this.popoverRef = React.createRef();
  }

  static getDerivedStateFromProps<U extends string>(
    nextProps: DropdownProps<U>,
    prevState: DropdownState<U>,
  ) {
    const { value } = nextProps;
    if (
      // Handle selected value parsing with controlled state and changed value
      'value' in nextProps &&
      value !== prevState.selectedValue
    ) {
      return {
        selectedValue: value,
        selectedValueNode: BaseDropdown.getSelectedValueNode(
          value,
          nextProps.children,
        ),
      };
    }
    // Case language change. Make sure selectedValueNode gets updated with new text from children
    if (
      prevState.selectedValue &&
      nextProps.children &&
      BaseDropdown.valueExistsInChildren(
        prevState.selectedValue,
        nextProps.children,
      )
    ) {
      return {
        selectedValue: prevState.selectedValue,
        selectedValueNode: BaseDropdown.getSelectedValueNode(
          prevState.selectedValue,
          nextProps.children,
        ),
      };
    }
    return null;
  }

  static getSelectedValueNode<U extends string>(
    selectedValue: string | undefined | null,
    children:
      | Array<
          | ReactElement<DropdownItemProps<U>>
          | Array<ReactElement<DropdownItemProps<U>>>
        >
      | ReactElement<DropdownItemProps<U>>
      | undefined,
  ): ReactNode | undefined {
    if (selectedValue === undefined || children === undefined) return undefined;

    if (Array.isArray(children)) {
      const flatChildren = children.flat();
      for (let index = 0; index < flatChildren.length; index += 1) {
        const element = flatChildren[index];

        if (element.props.value === selectedValue) {
          return element.props.children;
        }
      }
    } else {
      return children.props.children;
    }
  }

  static valueExistsInChildren<U extends string>(
    value: string,
    children:
      | Array<
          | ReactElement<DropdownItemProps<U>>
          | Array<ReactElement<DropdownItemProps<U>>>
        >
      | ReactElement<DropdownItemProps<U>>,
  ) {
    if (Array.isArray(children)) {
      const flatChildren = children.flat();
      return flatChildren.some((child) => child.props.value === value);
    }
    return children.props.value === value;
  }

  componentDidMount(): void {
    this.componentIsMounted = true;
  }

  componentWillUnmount(): void {
    this.componentIsMounted = false;
  }

  componentDidUpdate(prevProps: Readonly<DropdownProps<T>>): void {
    // Case nullifying value by setting it from a defined value to undefined
    if (this.props.value === undefined && prevProps.value !== undefined) {
      this.setState({
        selectedValue: undefined,
        selectedValueNode: undefined,
      });
    }
  }

  private isOutsideClick(event: MouseEvent) {
    return (
      !!this.buttonRef &&
      (this.buttonRef.current as Node).contains(event.target as Node)
    );
  }

  private handleItemSelection(itemValue: T) {
    if (!!this.props.onChange) {
      this.props.onChange(itemValue);
    }
    this.setState({
      selectedValue: itemValue,
      selectedValueNode: BaseDropdown.getSelectedValueNode(
        itemValue,
        this.props.children,
      ),
      focusedDescendantId: itemValue,
      ariaExpanded: false,
    });
    setTimeout(() => {
      // Check mounted status to prevent setting state on an unmounted component
      if (this.componentIsMounted) {
        // NVDA with Firefox requires small timeout before focus to read updated value
        this.buttonRef.current?.focus();
        // Set showPopover separately to prevent NVDA focus from going to body
        this.setState({ showPopover: false });
      }
    }, 10);
  }

  private handleSpaceAndEnter = (
    popoverItems: Array<ReactElement<DropdownItemProps<T>>>,
    getNextItem: () => ReactElement<DropdownItemProps<T>>,
  ) => {
    const { focusedDescendantId, showPopover } = this.state;
    if (!showPopover) {
      this.openPopover();
      if (!focusedDescendantId) {
        const nextItem = getNextItem();
        if (nextItem) {
          this.setState({ focusedDescendantId: nextItem.props.value });
        }
      }
    } else if (showPopover && focusedDescendantId) {
      const focusedItem = popoverItems.find(
        (item) => item?.props.value === focusedDescendantId,
      );
      if (focusedItem && !focusedItem.props.disabled) {
        this.handleItemSelection(focusedItem.props.value);
      }
    }
  };

  private handleKeyDown = (event: React.KeyboardEvent) => {
    // First let's make sure item list scroll is enabled when controlling via keyboard
    this.setState({ preventListScrolling: false });

    const { focusedDescendantId, ariaExpanded, showPopover } = this.state;
    const items = Array.isArray(this.props.children)
      ? this.props.children
      : this.props.children !== undefined
      ? [this.props.children]
      : undefined;
    if (!items) return;
    const popoverItems: Array<ReactElement<DropdownItemProps<T>>> =
      items.flat();
    const index = !!focusedDescendantId
      ? popoverItems.findIndex(
          (item) => item?.props.value === focusedDescendantId,
        )
      : null;

    const getNextIndex = () =>
      index !== null ? (index + 1) % popoverItems.length : 0;
    const getPreviousIndex = () =>
      index !== null && index !== -1
        ? (index - 1 + popoverItems.length) % popoverItems.length
        : popoverItems.length - 1;

    const getNextItem = () => popoverItems[getNextIndex()];
    const getPreviousItem = () => popoverItems[getPreviousIndex()];

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        if (!showPopover) {
          this.openPopover();
        } else {
          const nextItem = getNextItem();
          if (nextItem) {
            this.setState({ focusedDescendantId: nextItem.props.value });
          }
        }
        break;
      }

      case 'ArrowUp': {
        event.preventDefault();
        if (!showPopover) {
          this.openPopover();
        } else {
          const previousItem = getPreviousItem();
          if (previousItem) {
            this.setState({ focusedDescendantId: previousItem.props.value });
          }
        }
        break;
      }

      case ' ': {
        event.preventDefault();
        this.setState({
          showPopover: !showPopover,
          ariaExpanded: !ariaExpanded,
        });
        this.handleSpaceAndEnter(popoverItems, getNextItem);
        break;
      }

      case 'Enter': {
        event.preventDefault();
        this.handleSpaceAndEnter(popoverItems, getNextItem);
        break;
      }

      case 'Escape': {
        if (showPopover) {
          event.stopPropagation();
          this.focusToButtonAndClosePopover();
        }
        break;
      }

      default: {
        break;
      }
    }
  };

  private handleOnBlur = () => {
    const ownerDocument = getOwnerDocument(this.buttonRef);
    if (!ownerDocument) {
      return;
    }
    requestAnimationFrame(() => {
      const focusInPopover = this.popoverRef.current?.contains(
        ownerDocument.activeElement,
      );
      // If focus was moved to an element inside the popover, it's not really a blur event
      if (focusInPopover) {
        return;
      }

      if (!!this.props.onBlur) {
        this.props.onBlur();
      }

      const focusInToggleButton = this.buttonRef.current?.contains(
        ownerDocument.activeElement,
      );
      const focusInDropdown = focusInPopover || focusInToggleButton;
      if (!focusInDropdown) {
        this.setState({
          showPopover: focusInDropdown,
          ariaExpanded: focusInDropdown,
        });
      }
    });
  };

  private getFirstItemValue() {
    if (Array.isArray(this.props.children)) {
      const element = this.props.children[0];

      if (Array.isArray(element)) {
        return element[0].props.value;
      }

      return element.props.value;
    }
    if (!!this.props.children) {
      return this.props.children.props.value;
    }
    return null;
  }

  private getDisplayValue() {
    if (this.props.alwaysShowVisualPlaceholder) {
      return this.props.visualPlaceholder;
    }
    return this.state.selectedValueNode ?? this.props.visualPlaceholder;
  }

  private focusToButtonAndClosePopover() {
    this.setState({ ariaExpanded: false });
    this.buttonRef.current?.focus();
    this.setState({ showPopover: false });
  }

  private openPopover() {
    this.setState({ showPopover: true, ariaExpanded: true });
    /**
     * Timeout is used here to ensure the popover
     * exists when setting focus
     */
    setTimeout(() => {
      this.popoverRef.current?.focus();
    }, 200);
  }

  private updatePopoverPlacement = (placement: string | undefined) => {
    if (!placement) return;
    if (placement !== this.state.popoverPlacement) {
      requestAnimationFrame(() => {
        if (this.componentIsMounted) {
          this.setState({ popoverPlacement: placement });
        }
      });
    }
  };

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
      hintText,
      status,
      statusText,
      visualPlaceholder,
      alwaysShowVisualPlaceholder,
      className,
      onChange: propOnChange,
      onBlur,
      tooltipComponent,
      portal = true,
      popoverClassName,
      statusTextAriaLiveMode = 'assertive',
      fullWidth,
      style,
      ...rest
    } = this.props;
    const [_marginProps, passProps] = separateMarginProps(rest);

    if (React.Children.count(children) < 1) {
      getLogger().warn(`Dropdown '${labelText}' does not contain items`);
      return null;
    }

    const {
      selectedValue,
      ariaExpanded,
      showPopover,
      focusedDescendantId,
      preventListScrolling,
    } = this.state;

    const labelId = `${id}-label`;
    const buttonId = `${id}_button`;
    const popoverItemListId = `${id}-popover`;
    const hintTextId = hintText ? `${id}-hintText` : undefined;
    const statusTextId = statusText ? `${id}-statusText` : undefined;
    const displayValueId = `${id}-displayValue`;

    const ariaActiveDescendant = focusedDescendantId
      ? `${id}-${focusedDescendantId}`
      : '';

    const dropdownDisplayValue = this.getDisplayValue();
    const italicize =
      visualPlaceholder && !alwaysShowVisualPlaceholder && !selectedValue;

    // Remove the possibility to have undefined forwardedRef as a parameter for forkRefs
    const definedRef = forwardedRef || null;

    return (
      <HtmlDiv
        className={classnames(className, baseClassName, {
          [dropdownClassNames.disabled]: !!disabled,
          [dropdownClassNames.open]: !!showPopover,
          [dropdownClassNames.error]: status === 'error',
          [dropdownClassNames.italicize]: italicize,
          [dropdownClassNames.fullWidth]: fullWidth,
        })}
        id={id}
        style={style}
      >
        <Label
          id={labelId}
          labelMode={labelMode}
          optionalText={optionalText}
          className={classnames({
            [dropdownClassNames.labelIsVisible]: labelMode !== 'hidden',
          })}
          tooltipComponent={tooltipComponent}
          onClick={() => {
            if (!disabled) {
              this.buttonRef.current?.focus();
            }
          }}
        >
          {labelText}
        </Label>
        <HintText id={hintTextId}>{hintText}</HintText>
        <HtmlDiv className={dropdownClassNames.inputWrapper}>
          <HtmlButton
            aria-haspopup="listbox"
            tabIndex={!disabled ? 0 : -1}
            forwardedRef={forkRefs(this.buttonRef, definedRef)}
            id={buttonId}
            className={dropdownClassNames.button}
            {...getConditionalAriaProp('aria-labelledby', [
              displayValueId,
              ariaLabelledBy,
              labelId,
            ])}
            {...getConditionalAriaProp('aria-describedby', [
              statusTextId,
              hintTextId,
            ])}
            aria-controls={popoverItemListId}
            aria-expanded={ariaExpanded}
            onClick={() => {
              if (!showPopover) {
                this.openPopover();
              } else {
                this.focusToButtonAndClosePopover();
              }
            }}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleOnBlur}
            data-floating-ui-placement={this.state.popoverPlacement}
            {...passProps}
          >
            <HtmlSpan
              className={dropdownClassNames.displayValue}
              id={displayValueId}
            >
              {dropdownDisplayValue}
            </HtmlSpan>
            <HtmlInput
              tabIndex={-1}
              type="hidden"
              name={name}
              value={selectedValue || ''}
            />
          </HtmlButton>
          <StatusText
            id={statusTextId}
            className={classnames({
              [dropdownClassNames.statusTextHasContent]: !!statusText,
            })}
            status={status}
            disabled={disabled}
            ariaLiveMode={statusTextAriaLiveMode}
          >
            {statusText}
          </StatusText>
          {showPopover && (
            <Popover
              sourceRef={this.buttonRef}
              onClickOutside={(event) => {
                if (!this.isOutsideClick(event)) {
                  this.setState({
                    showPopover: false,
                    ariaExpanded: false,
                  });
                }
              }}
              matchWidth={true}
              onKeyDown={this.handleKeyDown}
              portal={portal}
              className={popoverClassName}
            >
              <PopoverConsumer>
                {(consumer) => {
                  this.updatePopoverPlacement(consumer?.popoverPlacement);
                  return (
                    <DropdownProvider
                      value={{
                        onItemClick: (itemValue: T) =>
                          this.handleItemSelection(itemValue),
                        selectedDropdownValue: selectedValue,
                        id,
                        focusedItemValue: focusedDescendantId,
                        noSelectedStyles: alwaysShowVisualPlaceholder,
                        onItemTabPress: () =>
                          this.focusToButtonAndClosePopover(),
                        onItemMouseOver: (itemValue) =>
                          this.setState({
                            preventListScrolling: true,
                            focusedDescendantId: itemValue,
                          }),
                      }}
                    >
                      <SelectItemList
                        id={popoverItemListId}
                        ref={this.popoverRef}
                        focusedDescendantId={ariaActiveDescendant}
                        className={dropdownClassNames.itemList}
                        onKeyDown={(event) => {
                          if (event.key === 'Tab') {
                            event.preventDefault();
                            this.focusToButtonAndClosePopover();
                          }
                        }}
                        preventScrolling={preventListScrolling}
                        popoverPlacement={consumer?.popoverPlacement}
                      >
                        {children || []}
                      </SelectItemList>
                    </DropdownProvider>
                  );
                }}
              </PopoverConsumer>
            </Popover>
          )}
        </HtmlDiv>
      </HtmlDiv>
    );
  }
}

const StyledDropdown = styled(
  <T extends string = string>({
    theme,
    globalMargins,
    ...passProps
  }: DropdownProps<T> & SuomifiThemeProp & GlobalMarginProps) => (
    <BaseDropdown {...passProps} />
  ),
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.dropdown,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const DropdownInner = <T extends string = string>(
  props: DropdownProps<T>,
  ref: React.RefObject<HTMLButtonElement>,
) => {
  const { id: propId, ...passProps } = props;
  return (
    <SpacingConsumer>
      {({ margins }) => (
        <SuomifiThemeConsumer>
          {({ suomifiTheme }) => (
            <AutoId id={propId}>
              {(id) => (
                <StyledDropdown
                  theme={suomifiTheme}
                  globalMargins={margins}
                  id={id}
                  forwardedRef={ref}
                  {...passProps}
                />
              )}
            </AutoId>
          )}
        </SuomifiThemeConsumer>
      )}
    </SpacingConsumer>
  );
};

// Not directly exporting the DropdownInner as styleguidist was not showing props then.
export const Dropdown = React.forwardRef<
  HTMLButtonElement,
  DropdownProps<string>
>(DropdownInner) as <T extends string = string>(
  props: DropdownProps<T> & { ref?: React.Ref<HTMLButtonElement> },
) => React.ReactElement | null;

DropdownInner.displayName = 'Dropdown';
export { DropdownProvider, DropdownConsumer };
