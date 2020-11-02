import React, { Component, ReactNode, ReactElement } from 'react';
import classnames from 'classnames';
import { HtmlLabel, HtmlLabelProps, HtmlSpan } from '../../reset';
import { Paragraph, ParagraphProps } from '../Paragraph/Paragraph';
import {
  ListboxInput,
  ListboxButton,
  ListboxButtonProps,
  ListboxPopoverProps,
  ListboxList,
  ListboxOption,
  ListboxPopover,
} from '@reach/listbox';
import { positionMatchWidth } from '@reach/popover';
import { VisuallyHidden } from '../Visually-hidden/Visually-hidden';
import { logger } from '../../utils/logger';
import { idGenerator } from '../../utils/uuid';
export { ListboxOption as DropdownItem };

const baseClassName = 'fi-dropdown';

export const dropdownClassNames = {
  baseClassName,
  label: `${baseClassName}_label`,
  button: `${baseClassName}_button`,
  popover: `${baseClassName}_popover`,
  item: `${baseClassName}_item`,
  noSelectedStyles: `${baseClassName}--noSelectedStyles`,
  disabled: `${baseClassName}--disabled`,
};

export interface DropdownLabelProps extends HtmlLabelProps {}

export interface DropdownItemProps {
  /** Item value */
  value: string;
  /** Item content */
  children: ReactNode;
  /** Classname for item */
  className?: string;
}

interface DropdownState {
  selectedValue: string | undefined;
}
type OptionalListboxButtonProps = {
  [K in keyof ListboxButtonProps]?: ListboxButtonProps[K];
} & {
  className?: string;
  id?: string;
};
type OptionalListboxPopoverProps = {
  [K in keyof ListboxPopoverProps]?: ListboxPopoverProps[K];
} & {
  ref?: any;
};

type DropdownLabel = 'hidden' | 'top';

export interface DropdownProps {
  /**
   * Unique id
   * If no id is specified, one will be generated using uuid
   * @default uuidV4
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
  /** Custom props for label container */
  labelProps?: DropdownLabelProps;
  /** Custom props for Label text element */
  labelTextProps?: ParagraphProps;
  /** Label displaymode -
   * top: show above, hidden: use only for screenreader
   * @default top
   */
  labelMode?: DropdownLabel;
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
  dropdownButtonProps?: OptionalListboxButtonProps;
  /** Properties given to dropdown's popover-component, className etc. */
  dropdownPopoverProps?: OptionalListboxPopoverProps;
  listboxPopoverComponent?: React.ComponentType<OptionalListboxPopoverProps>;
  dropdownItemClassName?: string;
  /** DropdownItems */
  children?:
    | Array<ReactElement<DropdownItemProps>>
    | ReactElement<DropdownItemProps>;
  /** Callback that fires when the dropdown value changes. */
  onChange?(newValue: string): void;
}

export class Dropdown extends Component<DropdownProps> {
  state: DropdownState = {
    selectedValue:
      'value' in this.props
        ? this.props.value
        : 'defaultValue' in this.props
        ? this.props.defaultValue
        : undefined,
  };

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

  dropdownItems = (children: ReactNode, classNames?: { className: string }) =>
    React.Children.map(
      children,
      (child: React.ReactElement<DropdownItemProps>) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...classNames,
          });
        }
        return child;
      },
    );

  render() {
    const {
      id: propId,
      name,
      disabled,
      children,
      labelProps,
      labelText,
      labelTextProps,
      labelMode = 'top',
      'aria-labelledby': ariaLabelledBy,
      visualPlaceholder,
      alwaysShowVisualPlaceholder,
      className,
      dropdownButtonProps = {},
      dropdownPopoverProps = {},
      listboxPopoverComponent: ListboxPopoverComponentReplace,
      dropdownItemClassName = {},
      onChange: propOnChange,
      ...passProps
    } = this.props;

    if (React.Children.count(children) < 1) {
      logger.warn(`Dropdown '${labelText}' does not contain items`);
      return null;
    }

    const id = idGenerator(propId);
    const labelId = `${id}-label`;
    const ariaLabelledByIds = `${
      !!ariaLabelledBy ? `${ariaLabelledBy} ` : ''
    }${labelId}`;
    const buttonId = !!dropdownButtonProps.id
      ? dropdownButtonProps.id
      : `${id}_button`;

    const { selectedValue } = this.state;

    // don't read visualPlaceholder if nothing is selected
    const buttonAriaLabelledByOverride =
      selectedValue === undefined
        ? { 'aria-labelledby': ariaLabelledByIds }
        : {};

    const passDropdownButtonProps = {
      ...dropdownButtonProps,
      id: buttonId,
      className: classnames(
        dropdownClassNames.button,
        dropdownButtonProps.className,
        {
          [dropdownClassNames.disabled]: !!disabled,
        },
      ),
      ...buttonAriaLabelledByOverride,
    };

    const passDropdownPopoverProps = {
      ...dropdownPopoverProps,
      className: classnames(
        dropdownClassNames.popover,
        dropdownPopoverProps.className,
      ),
    };

    const passDropdownItemProps = {
      className: classnames(dropdownClassNames.item, dropdownItemClassName, {
        [dropdownClassNames.noSelectedStyles]: alwaysShowVisualPlaceholder,
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

    const listboxInputProps = {
      'aria-labelledby': ariaLabelledByIds,
      disabled,
      onChange,
      name,
      value: selectedValue || '',
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
        <HtmlLabel
          id={labelId}
          {...labelProps}
          className={dropdownClassNames.label}
        >
          {labelMode === 'hidden' ? (
            <VisuallyHidden>{labelText}</VisuallyHidden>
          ) : (
            <Paragraph {...labelTextProps}>{labelText}</Paragraph>
          )}
        </HtmlLabel>
        <ListboxInput {...listboxInputProps}>
          <ListboxButton {...passDropdownButtonProps}>
            {listboxDisplayValue}
          </ListboxButton>
          {!!ListboxPopoverComponentReplace ? (
            <ListboxPopoverComponentReplace {...passDropdownPopoverProps}>
              {this.dropdownItems(children, passDropdownItemProps)}
            </ListboxPopoverComponentReplace>
          ) : (
            <ListboxPopover
              position={positionMatchWidth}
              {...passDropdownPopoverProps}
            >
              <ListboxList>
                {this.dropdownItems(children, passDropdownItemProps)}
              </ListboxList>
            </ListboxPopover>
          )}
        </ListboxInput>
      </HtmlSpan>
    );
  }
}
