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
  ListboxOptionProps,
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
};

export interface DropdownLabelProps extends HtmlLabelProps {}

export interface DropdownItemProps {
  value: string;
  /** Item content */
  children: ReactNode;
  className?: string;
}

type DropdownPopoverItems = DropdownItemProps;

interface DropdownState {
  selectedValue: ReactNode;
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
type OptionalListboxOptionProps = {
  [K in keyof ListboxOptionProps]?: ListboxOptionProps[K];
} & { children?: any; className?: string };

type DropdownLabel = 'hidden' | 'top';

export interface DropdownProps {
  /**
   * Unique id
   * If no id is specified, one will be generated using uuid
   * @default uuidV4
   */
  id?: string;
  /** Default, intially selected value */
  defaultValue?: string;
  /** Controlled selected value, overrides defaultValue if provided. */
  value?: string;
  /** Label for the Dropdown component. */
  labelText: string;
  /** Visual hint to show if nothing is selected and no value or defaultValue is provided */
  visualPlaceholder?: ReactNode;
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
  /** Properties given to dropdown's Button-component, className etc. */
  dropdownButtonProps?: OptionalListboxButtonProps;
  /** Properties given to dropdown's popover-component, className etc. */
  dropdownPopoverProps?: OptionalListboxPopoverProps;
  listboxPopoverComponent?: React.ComponentType<OptionalListboxPopoverProps>;
  /** Properties given to dropdown's item-component, className etc. */
  dropdownItemProps?: OptionalListboxOptionProps;
  /** DropdownItems */
  children?:
    | Array<ReactElement<DropdownPopoverItems>>
    | ReactElement<DropdownPopoverItems>;

  onChange?(newValue: string): void;
}

export class Dropdown extends Component<DropdownProps> {
  state: DropdownState = {
    selectedValue: !!this.props.defaultValue
      ? this.props.defaultValue
      : !!this.props.value
      ? this.props.value
      : undefined,
  };

  static getDerivedStateFromProps(
    nextProps: DropdownProps,
    prevState: DropdownState,
  ) {
    const { value } = nextProps;
    if (!!value && value !== prevState.selectedValue) {
      return { selectedValue: value };
    }
    return null;
  }

  dropdownItems = (
    children: ReactNode,
    dropdownItemProps?: OptionalListboxOptionProps,
  ) =>
    React.Children.map(
      children,
      (child: React.ReactElement<OptionalListboxOptionProps>) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...dropdownItemProps,
          });
        }
        return child;
      },
    );

  render() {
    const {
      id: propId,
      value,
      defaultValue,
      children,
      labelProps,
      labelText,
      labelTextProps,
      labelMode = 'top',
      'aria-labelledby': ariaLabelledBy,
      visualPlaceholder,
      className,
      dropdownButtonProps = {},
      dropdownPopoverProps = {},
      listboxPopoverComponent: ListboxPopoverComponentReplace,
      dropdownItemProps = {},
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

    const defaultPassValue = !!defaultValue ? { defaultValue } : {};

    // don't read visualPlaceholder if nothing is selected
    const buttonAriaLabelledByOverride =
      selectedValue === undefined
        ? { 'aria-labelledby': ariaLabelledByIds }
        : {};

    const passDropdownButtonProps = {
      ...dropdownButtonProps,
      ...defaultPassValue,
      id: buttonId,
      className: classnames(
        dropdownClassNames.button,
        dropdownButtonProps.className,
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
      ...dropdownItemProps,
      className: classnames(
        dropdownClassNames.item,
        dropdownItemProps.className,
      ),
    };

    const onChange = (newValue: string) => {
      if (!!propOnChange) {
        propOnChange(newValue);
      }
      if (value === undefined) {
        this.setState({ selectedValue: newValue });
      }
    };

    const listboxInputProps = {
      'aria-labelledby': ariaLabelledByIds,
      onChange,
    };

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
            {!!selectedValue ? selectedValue : visualPlaceholder}
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
