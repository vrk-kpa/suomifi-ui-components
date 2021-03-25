import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlButton, HtmlButtonProps, HtmlSpan } from '../../../reset';
import { VisuallyHidden } from '../../../components';
import { baseStyles } from './ExpanderGroup.baseStyles';

const baseClassName = 'fi-expander-group';
const openClassName = `${baseClassName}--open`;
const expandersContainerClassName = `${baseClassName}_expanders`;
const openAllButtonClassName = `${baseClassName}_all-button`;
export interface ExpanderGroupProps {
  /** Expanders and optionally, other ReactNodes */
  children: ReactNode;
  /** 'Open all' button text */
  OpenAllText: string;
  /** 'Close all' button text */
  CloseAllText: string;
  /** 'Open all' button text for screen readers, hides OpenAllText for screen readers if provided */
  AriaOpenAllText?: string;
  /** 'Close all' button text for screen readers, hides CloseAllText for screen readers if provided */
  AriaCloseAllText?: string;
  /** Custom classname to extend or customize */
  className?: string;
  /** Open/Close all button props */
  toggleAllButtonProps?: Omit<
    HtmlButtonProps,
    | 'onClick'
    | 'onMouseDown'
    | 'onMouseUp'
    | 'onKeyPress'
    | 'onKeyUp'
    | 'onKeyDown'
  >;
}

interface ExpanderOpenStates {
  [key: string]: boolean;
}

type ExpanderGroupTargetOpenState = {
  targetOpenState: boolean;
};

interface ExpanderGroupState {
  /** Current combined open state of all expanders */
  allOpen: boolean | undefined;
  /** State change transition request */
  expanderGroupOpenState: ExpanderGroupTargetOpenState;
}

export interface ExpanderGroupProviderState {
  onExpanderOpenChange: (id: string, newState: boolean | undefined) => void;
  expanderGroupOpenState: ExpanderGroupTargetOpenState;
}

const defaultProviderValue: ExpanderGroupProviderState = {
  onExpanderOpenChange: () => null,
  expanderGroupOpenState: {
    targetOpenState: false,
  },
};

const { Provider, Consumer: ExpanderGroupConsumer } = React.createContext(
  defaultProviderValue,
);

class BaseExpanderGroup extends Component<ExpanderGroupProps> {
  state: ExpanderGroupState = {
    allOpen: undefined,
    expanderGroupOpenState: {
      targetOpenState: false,
    },
  };

  /** Expanders by id with current open state */
  private expanders: ExpanderOpenStates = {};

  handleExpanderOpenChange = (id: string, newState: boolean | undefined) => {
    if (newState !== undefined) {
      this.expanders[id] = newState;
    } else {
      delete this.expanders[id];
    }
    const newAllOpenState = this.expandersOpenState();
    console.log(this.state.allOpen, newAllOpenState.allOpen, id, newState);
    if (this.state.allOpen !== newAllOpenState.allOpen) {
      this.setState({ allOpen: newAllOpenState.allOpen });
    }
  };

  expandersOpenState = () => {
    const expanderCount = Object.keys(this.expanders).length;
    const openExpanderCount = Object.values(this.expanders).filter(
      (isOpen) => !!isOpen,
    ).length;
    return {
      expanderCount,
      openExpanderCount,
      allOpen: expanderCount === openExpanderCount,
    };
  };

  handleAllToggleClick = () => {
    this.setState({
      expanderGroupOpenState: {
        targetOpenState: !this.expandersOpenState().allOpen,
      },
    });
  };

  render() {
    const {
      className,
      children,
      OpenAllText,
      AriaOpenAllText,
      CloseAllText,
      AriaCloseAllText,
      toggleAllButtonProps,
      ...passProps
    } = this.props;
    const { expanderGroupOpenState } = this.state;
    const { openExpanderCount, allOpen } = this.expandersOpenState();
    return (
      <HtmlDiv
        {...passProps}
        className={classnames(className, baseClassName, {
          [openClassName]: openExpanderCount > 0,
        })}
      >
        <HtmlButton
          {...toggleAllButtonProps}
          onClick={this.handleAllToggleClick}
          className={classnames(
            toggleAllButtonProps?.className,
            openAllButtonClassName,
          )}
        >
          <HtmlSpan aria-hidden={true}>
            {allOpen ? CloseAllText : OpenAllText}
          </HtmlSpan>
          <VisuallyHidden>
            {allOpen
              ? AriaCloseAllText || CloseAllText
              : AriaOpenAllText || OpenAllText}
          </VisuallyHidden>
        </HtmlButton>
        <HtmlDiv className={expandersContainerClassName}>
          <Provider
            value={{
              onExpanderOpenChange: this.handleExpanderOpenChange,
              expanderGroupOpenState,
            }}
          >
            {children}
          </Provider>
        </HtmlDiv>
      </HtmlDiv>
    );
  }
}

const StyledExpanderGroup = styled(BaseExpanderGroup)`
  ${baseStyles}
`;

/**
 * <i class="semantics" />
 * Wrapper for multiple expanders with Open/Close All button
 */
export class ExpanderGroup extends Component<ExpanderGroupProps> {
  render() {
    return <StyledExpanderGroup {...this.props} />;
  }
}

export { ExpanderGroupConsumer };
