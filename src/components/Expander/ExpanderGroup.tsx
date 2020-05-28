import React, { Component } from 'react';
import { HtmlDiv } from '../../reset';
import classnames from 'classnames';
import { ExpanderProps, StyledDiv } from './Expander';
import { ButtonProps } from '../Button/Button';

export const baseClassName = 'fi-expander-group';
const openClassName = `${baseClassName}--open`;
const expandersContainerClassName = `${baseClassName}_expanders`;
const openAllButtonClassName = `${baseClassName}_all-button`;

export type ToggleAllExpanderState = {
  toState: boolean;
};

export interface OpenExpanders {
  [key: number]: boolean;
}
export interface ExpanderGroupState {
  /** Expanders that are open */
  openExpanders: OpenExpanders;
  toggleAllExpanderState: ToggleAllExpanderState;
}

interface OpenCloseAll {
  /** 'Open all'-component (Button) */
  OpenAll: React.ReactElement<ButtonProps>;
  /** 'Close all'-component (Button) */
  CloseAll: React.ReactElement<ButtonProps>;
  onClickAll?: () => void;
}

export interface ExpanderGroupProps extends OpenCloseAll {
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Use Expander's here
   */
  children: Array<React.ReactElement<ExpanderProps>>;
  /** Properties for OpenAllButton */
  openAllButtonProps?: ButtonProps;
}

export interface ExpanderProviderState {
  onExpanderOpenChange: (index: number, toState: boolean) => void;
  toggleAllExpanderState: ToggleAllExpanderState;
}

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

const defaultProviderValue: ExpanderProviderState = {
  onExpanderOpenChange: () => null,
  toggleAllExpanderState: {
    toState: false,
  },
};

const { Provider, Consumer: ExpanderGroupConsumer } = React.createContext(
  defaultProviderValue,
);

interface OpenAllButtonProps extends OpenCloseAll {
  allOpen: boolean;
  onClick: (event: React.MouseEvent<Element>) => void;
  openAllButtonProps?: ButtonProps;
}

const openAllButtonProps = (
  onClick: (event: React.MouseEvent<Element>) => void,
  onClickAll?: () => void,
) => (children: React.ReactElement<ButtonProps>) => {
  const combinedHandleClick = (event: React.MouseEvent<Element>) => {
    onClick(event);
    if (onClickAll) {
      onClickAll();
    }
  };
  return React.cloneElement(children, {
    onClick: combinedHandleClick,
    className: classnames(openAllButtonClassName, children.props.className),
  });
};

const OpenAllButton = ({
  allOpen,
  onClick,
  OpenAll,
  CloseAll,
  onClickAll,
}: OpenAllButtonProps) => {
  return !!allOpen
    ? openAllButtonProps(onClick, onClickAll)(CloseAll)
    : openAllButtonProps(onClick, onClickAll)(OpenAll);
};

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

export class ExpanderGroup extends Component<ExpanderGroupProps> {
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
      OpenAll,
      CloseAll,
      onClickAll: clickAllHandler,
      ...passProps
    } = this.props;
    const { openExpanders, toggleAllExpanderState } = this.state;
    const openExpandersCount = OpenExpandersCount(openExpanders);
    const allOpen = openExpandersCount === React.Children.count(children);

    return (
      <StyledDiv
        {...passProps}
        className={classnames(className, baseClassName, {
          [openClassName]: openExpandersCount > 0,
        })}
      >
        <OpenAllButton
          allOpen={allOpen}
          onClick={this.handleAllToggleClick}
          OpenAll={OpenAll}
          CloseAll={CloseAll}
          onClickAll={clickAllHandler}
        />
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
      </StyledDiv>
    );
  }
}

export { ExpanderGroupConsumer };
