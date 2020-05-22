import React from 'react';
import { default as styled } from 'styled-components';
import { Omit } from '../../utils/typescript';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp, InternalTokensProp } from '../theme';
import {
  ExpanderGroup as CompExpanderGroup,
  ExpanderGroupProps as CompExpanderGroupProps,
  ExpanderProviderState as CompExpanderProviderState,
  ExpanderGroupState,
} from '../../components/Expander/ExpanderGroup';
import { ExpanderProps as CompExpanderProps } from '../../components/Expander/Expander';
import { Button, ButtonProps } from '../Button/Button';
import { baseStyles } from './ExpanderGroup.baseStyles';

const openAllButtonClassName = 'fi-expander-group_all-button';

type ButtonOrText = React.ReactElement<ButtonProps> | string;

interface OpenCloseAll {
  /** 'Open all'-component (Button) */
  OpenAll: ButtonOrText;
  /** 'Close all'-component (Button) */
  CloseAll: ButtonOrText;
}
export interface ExpanderGroupProps
  extends Omit<CompExpanderGroupProps, 'OpenAll' | 'CloseAll'>,
    TokensProp,
    OpenCloseAll {}

interface ExpanderOpenAllButtonProps extends ButtonProps, TokensProp {
  children: ButtonOrText;
}

const StyledExpanderGroup = styled(
  ({ tokens, ...passProps }: CompExpanderGroupProps & InternalTokensProp) => (
    <CompExpanderGroup {...passProps} />
  ),
)`
  ${(props) => baseStyles(props)};
`;

const OpenAllButton = ({
  children,
  ...passProps
}: ExpanderOpenAllButtonProps) => {
  if (typeof children === 'string' || children.type !== Button) {
    return (
      <Button.unstyled {...passProps} className={openAllButtonClassName}>
        {children}
      </Button.unstyled>
    );
  }
  return children;
};

const ExpanderGroupItems = (
  children: Array<React.ReactElement<CompExpanderProps>>,
) =>
  React.Children.map(
    children,
    (child: React.ReactElement<CompExpanderProps>, index) => {
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

const defaultProviderValue: CompExpanderProviderState = {
  onExpanderOpenChange: () => null,
  toggleAllExpanderState: {
    toState: false,
  },
};
const { Provider, Consumer: ExpanderGroupConsumer } = React.createContext(
  defaultProviderValue,
);

const InitialStateOfExpanders = (
  children: Array<React.ReactElement<CompExpanderProps>>,
) => {
  const openExpanders: number[] = [];
  React.Children.forEach(children, (child, index) => {
    if (React.isValidElement(child)) {
      if (child.props.defaultOpen || child.props.open) {
        openExpanders.push(index);
      }
    }
  });
  return openExpanders;
};

/**
 * <i class="semantics" />
 * Used for grouping expanders
 */
export class ExpanderGroup extends React.Component<ExpanderGroupProps> {
  state: ExpanderGroupState = {
    openExpanders: InitialStateOfExpanders(this.props.children),
    toggleAllExpanderState: {
      toState:
        InitialStateOfExpanders(this.props.children).length ===
          this.props.children.length && this.props.children.length > 0,
    },
  };

  handleExpanderOpenChange = (index: number = 0) => {
    this.setState((prevState: ExpanderGroupState) => {
      const { openExpanders: prevOpenExpanders } = prevState;
      const prevExpanderOpen = prevOpenExpanders.includes(index);
      const openExpanders = prevExpanderOpen
        ? prevOpenExpanders.filter((value) => value !== index)
        : Array.from(new Set([...prevOpenExpanders, index]));
      return {
        openExpanders,
      };
    });
  };

  handleAllToggleClick = () => {
    this.setState(
      (prevState: ExpanderGroupState, props: ExpanderGroupProps) => {
        return {
          toState: props.children.length > prevState.openExpanders.length,
        };
      },
    );
  };

  render() {
    const { toggleAllExpanderState } = this.state;
    const {
      OpenAll,
      CloseAll,
      children,
      ...passProps
    } = withSuomifiDefaultProps(this.props);

    return (
      <Provider
        value={{
          onExpanderOpenChange: this.handleExpanderOpenChange,
          toggleAllExpanderState,
        }}
      >
        <StyledExpanderGroup
          {...passProps}
          OpenAll={
            <OpenAllButton tokens={passProps.tokens}>{OpenAll}</OpenAllButton>
          }
          CloseAll={
            <OpenAllButton tokens={passProps.tokens}>{CloseAll}</OpenAllButton>
          }
          onClickAll={this.handleAllToggleClick}
        >
          {ExpanderGroupItems(children)}
        </StyledExpanderGroup>
      </Provider>
    );
  }
}

export { ExpanderGroupConsumer };
