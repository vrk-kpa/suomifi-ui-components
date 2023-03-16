import React, { Component, ReactNode, ReactElement, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { getConditionalAriaProp } from '../../../utils/aria';
import { getLogger } from '../../../utils/log';
import { AutoId } from '../../utils/AutoId/AutoId';
import { HtmlSpan, HtmlDiv, HtmlInput, HtmlButton } from '../../../reset';
import { Label, LabelMode } from '../../Form/Label/Label';
import { DropdownItemProps } from '../DropdownItem/DropdownItem';
import { baseStyles } from './Dropdown.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import {
  forkRefs,
  getOwnerDocument,
  getRecursiveChildText,
} from '../../../utils/common/common';
import { Popover } from '../../../core/Popover/Popover';
import { SelectItemList } from '../../Form/Select/BaseSelect/SelectItemList/SelectItemList';
import { HintText } from '../../Form/HintText/HintText';
import { StatusText } from '../../Form/StatusText/StatusText';
import { StatusTextCommonProps } from '../../Form/types';

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
  open: `${baseClassName}--open`,
  disabled: `${baseClassName}--disabled`,
  error: `${baseClassName}--error`,
  italicize: `${baseClassName}--italicize`,
};

export interface DropdownProviderState {
  /** Callback for communicating DropdownItem click to parent  */
  onItemClick: (itemValue: string) => void;
  /** Currently selected DropdownItem */
  selectedDropdownValue: string | undefined | null;
  /** Currently focused DropdownItem */
  focusedItemValue: string | null | undefined;
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
}

const defaultProviderValue: DropdownProviderState = {
  onItemClick: () => null,
  selectedDropdownValue: null,
  id: '',
  focusedItemValue: null,
  noSelectedStyles: false,
  onItemTabPress: () => null,
};

const { Provider: DropdownProvider, Consumer: DropdownConsumer } =
  React.createContext(defaultProviderValue);

interface DropdownState {
  selectedValue: string | undefined | null;
  selectedValueText: string | undefined | null;
  showPopover: boolean;
  focusedDescendantId: string | null | undefined;
}

export interface DropdownProps extends StatusTextCommonProps {
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
  labelText: ReactNode;
  /** Hint text to be shown below the label */
  hintText?: string;
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
   * ID on an additional label id. E.g. form group label.
   * Used in addition to labelText for screen readers.
   */
  'aria-labelledby'?: string;
  /**
   * 'default' | 'error'
   * @default default
   */
  status?: 'default' | 'error';
  /** Status text to be shown below the component. Use e.g. for validation error */
  statusText?: string;
  /** Custom classname to extend or customize */
  className?: string;
  /** Disable component */
  disabled?: boolean;
  /** DropdownItems */
  children?:
    | Array<ReactElement<DropdownItemProps>>
    | ReactElement<DropdownItemProps>;
  /** Callback that fires when the dropdown value changes. */
  onChange?(value: string): void;
  /** Callback that fires on blur */
  onBlur?: () => void;
  /** Tooltip component for the dropdown's label */
  tooltipComponent?: ReactElement;
  /**
   * Whether the Dropdown's popover is rendered in a portal
   * @default true
   */
  portal?: boolean;
  /** Ref object to be passed to the button element. Alternative to React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLButtonElement>;
}

class BaseDropdown extends Component<DropdownProps> {
  state: DropdownState = {
    selectedValue:
      'value' in this.props
        ? this.props.value
        : 'defaultValue' in this.props
        ? this.props.defaultValue
        : undefined,
    selectedValueText: BaseDropdown.parseSelectedValueText(
      'value' in this.props
        ? this.props.value
        : 'defaultValue' in this.props
        ? this.props.defaultValue
        : undefined,
      this.props.children,
    ),
    showPopover: false,
    focusedDescendantId:
      'value' in this.props
        ? this.props.value
        : 'defaultValue' in this.props
        ? this.props.defaultValue
        : null,
  };

  buttonRef: React.RefObject<HTMLButtonElement>;

  popoverRef: React.RefObject<HTMLUListElement>;

  constructor(props: DropdownProps) {
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
      return {
        selectedValue: value,
        selectedValueText: BaseDropdown.parseSelectedValueText(
          value,
          nextProps.children,
        ),
      };
    }
    return null;
  }

  static parseSelectedValueText(
    selectedValue: string | undefined,
    children:
      | Array<ReactElement<DropdownItemProps>>
      | ReactElement<DropdownItemProps>
      | undefined,
  ): string | undefined {
    if (selectedValue === undefined || children === undefined) return undefined;

    if (Array.isArray(children)) {
      for (let index = 0; index < children.length; index += 1) {
        const element = children[index];
        if (element.props.value === selectedValue) {
          return getRecursiveChildText(element);
        }
      }
    } else {
      return getRecursiveChildText(children);
    }
  }

  private isOutsideClick(event: MouseEvent) {
    return (
      !!this.buttonRef &&
      (this.buttonRef.current as Node).contains(event.target as Node)
    );
  }

  private handleItemSelection(itemValue: string) {
    if (!!this.props.onChange) {
      this.props.onChange(itemValue);
    }
    this.setState({
      selectedValue: itemValue,
      selectedValueText: BaseDropdown.parseSelectedValueText(
        itemValue,
        this.props.children,
      ),
      showPopover: false,
      focusedDescendantId: itemValue,
    });
    this.buttonRef.current?.focus();
  }

  private handleKeyDown = (event: React.KeyboardEvent) => {
    const { focusedDescendantId, showPopover } = this.state;
    const popoverItems = Array.isArray(this.props.children)
      ? this.props.children
      : [this.props.children];
    if (!popoverItems) return;
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
          this.setState({ showPopover: true });
        }
        const nextItem = getNextItem();
        if (nextItem) {
          this.setState({ focusedDescendantId: nextItem.props.value });
        }
        break;
      }

      case 'ArrowUp': {
        event.preventDefault();
        if (!showPopover) {
          this.setState({ showPopover: true });
        }
        const previousItem = getPreviousItem();
        if (previousItem) {
          this.setState({ focusedDescendantId: previousItem.props.value });
        }
        break;
      }

      case ' ': {
        event.preventDefault();
        this.setState({ showPopover: !showPopover });
        if (!showPopover) {
          this.setState({ showPopover: true });
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
          if (focusedItem) {
            this.handleItemSelection(focusedItem.props.value);
          }
        }
        break;
      }

      case 'Enter': {
        event.preventDefault();
        if (!showPopover) {
          this.setState({ showPopover: true });
          if (!focusedDescendantId) {
            const nextItem = getNextItem();
            if (nextItem) {
              this.setState({ focusedDescendantId: nextItem.props.value });
            }
          }
        } else if (focusedDescendantId && showPopover) {
          const focusedItem = popoverItems.find(
            (item) => item?.props.value === focusedDescendantId,
          );
          if (focusedItem) {
            this.handleItemSelection(focusedItem.props.value);
          }
        }
        break;
      }

      case 'Escape': {
        if (showPopover) {
          event.stopPropagation();
          this.setState({ showPopover: false });
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
        this.setState({ showPopover: focusInDropdown });
      }
    });
  };

  private getDisplayValue() {
    if (this.props.alwaysShowVisualPlaceholder) {
      return this.props.visualPlaceholder;
    }
    return this.state.selectedValueText ?? this.props.visualPlaceholder;
  }

  private focusToButtonAndClosePopover() {
    this.buttonRef.current?.focus();
    this.setState({ showPopover: false });
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
      statusTextAriaLiveMode = 'assertive',
      ...passProps
    } = this.props;

    if (React.Children.count(children) < 1) {
      getLogger().warn(`Dropdown '${labelText}' does not contain items`);
      return null;
    }

    const {
      selectedValue,
      selectedValueText,
      showPopover,
      focusedDescendantId,
    } = this.state;

    const labelId = `${id}-label`;
    const buttonId = `${id}_button`;
    const popoverItemListId = `${id}-popover`;
    const hintTextId = hintText ? `${id}-hintText` : undefined;
    const statusTextId = statusText ? `${id}-statusText` : undefined;
    const displayValueId = selectedValueText ? `${id}-displayValue` : undefined;

    const ariaActiveDescendant = focusedDescendantId
      ? `${id}-${focusedDescendantId}`
      : '';

    const dropdownDisplayValue = this.getDisplayValue();
    const italicize =
      visualPlaceholder && !alwaysShowVisualPlaceholder && !selectedValue;

    // Remove the possibility to have undefined forwardedRef as a parameter for forkRefs
    const definedRef = forwardedRef || null;

    return (
      <HtmlSpan
        className={classnames(className, baseClassName, {
          [dropdownClassNames.disabled]: !!disabled,
          [dropdownClassNames.open]: !!showPopover,
          [dropdownClassNames.error]: status === 'error',
          [dropdownClassNames.italicize]: italicize,
        })}
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
          <HtmlDiv className={classnames(dropdownClassNames.inputWrapper)}>
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
              aria-owns={popoverItemListId}
              aria-expanded={showPopover}
              aria-activedescendant={ariaActiveDescendant}
              onClick={() => {
                if (!disabled) {
                  this.setState({ showPopover: !showPopover });
                }
              }}
              onKeyDown={this.handleKeyDown}
              onBlur={this.handleOnBlur}
            >
              <HtmlSpan id={displayValueId}>{dropdownDisplayValue}</HtmlSpan>
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
            <Popover
              sourceRef={this.buttonRef}
              onClickOutside={(event) => {
                if (!this.isOutsideClick(event)) {
                  this.setState({
                    showPopover: false,
                  });
                }
              }}
              matchWidth={true}
              onKeyDown={this.handleKeyDown}
              portal={portal}
              portalStyleProps={{
                visibility: showPopover && !!children ? 'visible' : 'hidden',
              }}
            >
              <DropdownProvider
                value={{
                  onItemClick: (itemValue) =>
                    this.handleItemSelection(itemValue),
                  selectedDropdownValue: selectedValue,
                  id,
                  focusedItemValue: focusedDescendantId,
                  noSelectedStyles: alwaysShowVisualPlaceholder,
                  onItemTabPress: () => this.focusToButtonAndClosePopover(),
                }}
              >
                <SelectItemList
                  id={popoverItemListId}
                  ref={this.popoverRef}
                  focusedDescendantId={ariaActiveDescendant}
                  className={dropdownClassNames.itemList}
                >
                  {children || []}
                </SelectItemList>
              </DropdownProvider>
            </Popover>
          </HtmlDiv>
        </HtmlDiv>
      </HtmlSpan>
    );
  }
}

const StyledDropdown = styled(
  ({ theme, ...passProps }: DropdownProps & SuomifiThemeProp) => (
    <BaseDropdown {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Use for selectable dropdown with items.
 */
const Dropdown = forwardRef(
  (props: DropdownProps, ref: React.RefObject<HTMLButtonElement>) => {
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

Dropdown.displayName = 'Dropdown';
export { Dropdown, DropdownProvider, DropdownConsumer };
