import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { noMouseFocus } from '../../theme/utils/mousefocus';
import { TokensProp, InternalTokensProp } from '../../theme';
import { HtmlDiv, HtmlButton, HtmlButtonProps } from '../../../reset';
import { ExpanderProps } from '../Expander/Expander';
import { baseStyles } from './ExpanderGroup.baseStyles';

const baseClassName = 'fi-expander-group';
const openClassName = `${baseClassName}--open`;
const expandersContainerClassName = `${baseClassName}_expanders`;
const openAllButtonClassName = `${baseClassName}_all-button`;

type ToggleAllExpanderState = {
  toState: boolean;
};

interface OpenExpanders {
  [key: number]: boolean;
}

interface ExpanderGroupState {
  /** Expanders that are open */
  openExpanders: OpenExpanders;
  toggleAllExpanderState: ToggleAllExpanderState;
}

interface InternalExpanderGroupProps {
  /** 'Open all'-component (Button) */
  OpenAllText: string;
  /** 'Close all'-component (Button) */
  CloseAllText: string;
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Use Expander's here
   */
  children: Array<React.ReactElement<ExpanderProps>>;
  /** Properties for OpenAllButton, aria-hidden = true by default */
  openAllButtonProps?: Omit<HtmlButtonProps, 'onClick'>;
}

export interface ExpanderGroupProviderState {
  onExpanderOpenChange: (index: number, toState: boolean) => void;
  toggleAllExpanderState: ToggleAllExpanderState;
}

const defaultProviderValue: ExpanderGroupProviderState = {
  onExpanderOpenChange: () => null,
  toggleAllExpanderState: {
    toState: false,
  },
};

const { Provider, Consumer: ExpanderGroupConsumer } = React.createContext(
  defaultProviderValue,
);

const InitialStateOfExpanders = (
  children: Array<React.ReactElement<ExpanderProps>>,
) => {
  const openExpanders: OpenExpanders = {};

  React.Children.forEach(children, (child, index) => {
    if (React.isValidElement(child)) {
      openExpanders[index] =
        child.props.defaultOpen || child.props.open || false;
    }
  });
  return openExpanders;
};

const OpenExpandersCount = (expanders: OpenExpanders) => {
  return Object.values(expanders).filter((value) => value).length;
};

class BaseExpanderGroup extends Component<InternalExpanderGroupProps> {
  state: ExpanderGroupState = {
    openExpanders: InitialStateOfExpanders(this.props.children),
    toggleAllExpanderState: {
      toState:
        OpenExpandersCount(InitialStateOfExpanders(this.props.children)) ===
          this.props.children.length && this.props.children.length > 0,
    },
  };

  handleExpanderOpenChange = (index: number, newState: boolean) => {
    this.setState((prevState: ExpanderGroupState) => {
      const { openExpanders: prevOpenExpanders } = prevState;
      const openExpanders = Object.assign({}, prevOpenExpanders);
      openExpanders[index] = newState;
      return {
        openExpanders,
      };
    });
  };

  allExpandersOpen = () => {
    return (
      this.props.children.length > OpenExpandersCount(this.state.openExpanders)
    );
  };

  handleAllToggleClick = () => {
    this.setState({
      toggleAllExpanderState: {
        toState: this.allExpandersOpen(),
      },
    });
  };

  render() {
    const {
      className,
      children,
      OpenAllText,
      CloseAllText,
      openAllButtonProps: {
        'aria-hidden': openAllAriaHidden,
        ...openAllButtonPassProps
      } = {
        'aria-hidden': true,
      },
      ...passProps
    } = this.props;
    const { openExpanders, toggleAllExpanderState } = this.state;
    const openExpandersCount = OpenExpandersCount(openExpanders);
    const allOpen = openExpandersCount === React.Children.count(children);

    return (
      <HtmlDiv
        {...passProps}
        className={classnames(className, baseClassName, {
          [openClassName]: openExpandersCount > 0,
        })}
      >
        <HtmlButton
          {...openAllButtonPassProps}
          {...openAllAriaHidden}
          {...noMouseFocus({ callback: this.handleAllToggleClick })}
          className={openAllButtonClassName}
        >
          {allOpen ? CloseAllText : OpenAllText}
        </HtmlButton>
        <HtmlDiv className={expandersContainerClassName}>
          <Provider
            value={{
              onExpanderOpenChange: this.handleExpanderOpenChange,
              toggleAllExpanderState,
            }}
          >
            {ExpanderGroupItems(children)}
          </Provider>
        </HtmlDiv>
      </HtmlDiv>
    );
  }
}

const StyledExpanderGroup = styled(
  ({ tokens, ...passProps }: ExpanderGroupProps & InternalTokensProp) => (
    <BaseExpanderGroup {...passProps} />
  ),
)`
  ${(props) => baseStyles(props)};
`;

export interface ExpanderGroupProps
  extends InternalExpanderGroupProps,
    TokensProp {}

const ExpanderGroupItems = (
  children: Array<React.ReactElement<ExpanderProps>>,
) =>
  React.Children.map(
    children,
    (child: React.ReactElement<ExpanderProps>, index) => {
      if (React.isValidElement(child)) {
        const isChildOpen = child.props.open;
        return React.cloneElement(child, {
          index,
          expanderGroup: true,
          open: isChildOpen,
        });
      }
      return child;
    },
  );

/**
 * <i class="semantics" />
 * Used for grouping expanders
 */
export class ExpanderGroup extends React.Component<ExpanderGroupProps> {
  render() {
    const { children, ...passProps } = withSuomifiDefaultProps(this.props);
    return (
      <StyledExpanderGroup {...passProps}>
        {ExpanderGroupItems(children)}
      </StyledExpanderGroup>
    );
  }
}

export { ExpanderGroupConsumer };
