import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { noMouseFocus } from '../../theme/utils/mousefocus';
import { TokensProp, InternalTokensProp } from '../../theme';
import { HtmlDiv, HtmlButton, HtmlButtonProps, HtmlSpan } from '../../../reset';
import { ExpanderProps } from '../Expander/Expander';
import { baseStyles } from './ExpanderGroup.baseStyles';
import { VisuallyHidden } from '../../../components';

const baseClassName = 'fi-expander-group';
const openClassName = `${baseClassName}--open`;
const expandersContainerClassName = `${baseClassName}_expanders`;
const openAllButtonClassName = `${baseClassName}_all-button`;

type ToggleAllExpanderState = {
  toState: boolean;
};

interface ExpanderOpenState {
  [key: string]: boolean;
}

interface ExpanderGroupState {
  /** Expanders that are open */
  expanders: ExpanderOpenState;
  toggleAllExpanderState: ToggleAllExpanderState;
}

interface InternalExpanderGroupProps {
  /**
   * Use Expander's here
   */
  children: Array<React.ReactElement<ExpanderProps>>;
  /** 'Open all' button text */
  OpenAllText: string;
  /** 'Close all'-component (Button) */
  CloseAllText: string;
  /** Custom classname to extend or customize */
  className?: string;
  /** 'Open all' button text for screen readers, hides OpenAllText for screen readers if provided */
  AriaOpenAllText?: string;
  /** 'Close all' button text for screen readers, hides CloseAllText for screen readers if provided */
  AriaCloseAllText?: string;
  /** Properties for OpenAllButton, aria-hidden = true by default */
  openAllButtonProps?: Omit<HtmlButtonProps, 'onClick'>;
}

export interface ExpanderGroupProviderState {
  onExpanderOpenChange: (id: string, toState: boolean | undefined) => void;
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

class BaseExpanderGroup extends Component<InternalExpanderGroupProps> {
  state: ExpanderGroupState = {
    expanders: {},
    toggleAllExpanderState: {
      toState: false,
    },
  };

  handleExpanderOpenChange = (id: string, newState: boolean | undefined) => {
    this.setState((prevState: ExpanderGroupState) => {
      const { expanders: prevExpanders } = prevState;
      const expanders = Object.assign({}, prevExpanders);
      if (newState !== undefined) {
        expanders[id] = newState;
        return {
          expanders,
        };
      }
      delete expanders[id];
      return { expanders };
    });
  };

  expandersOpenState = () => {
    const expanderCount = Object.keys(this.state.expanders).length;
    const openExpanderCount = Object.values(this.state.expanders).filter(
      (value) => value === true,
    ).length;
    return {
      expanderCount,
      openExpanderCount,
      allOpen: expanderCount === openExpanderCount,
    };
  };

  handleAllToggleClick = () => {
    this.setState({
      toggleAllExpanderState: {
        toState: !this.expandersOpenState().allOpen,
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
      openAllButtonProps,
      ...passProps
    } = this.props;
    const { toggleAllExpanderState } = this.state;
    const { openExpanderCount, allOpen } = this.expandersOpenState();

    return (
      <HtmlDiv
        {...passProps}
        className={classnames(className, baseClassName, {
          [openClassName]: openExpanderCount > 0,
        })}
      >
        <HtmlButton
          {...openAllButtonProps}
          {...noMouseFocus({ callback: this.handleAllToggleClick })}
          className={openAllButtonClassName}
        >
          <HtmlSpan {...{ 'aria-hidden': true }}>
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
              toggleAllExpanderState,
            }}
          >
            {children}
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

/**
 * <i class="semantics" />
 * Used for grouping expanders
 */
export class ExpanderGroup extends React.Component<ExpanderGroupProps> {
  render() {
    const { ...passProps } = withSuomifiDefaultProps(this.props);
    return <StyledExpanderGroup {...passProps} />;
  }
}

export { ExpanderGroupConsumer };
