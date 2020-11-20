import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { idGenerator } from '../../../utils/uuid';
import { TokensProp, InternalTokensProp } from '../../theme';
import { HtmlDiv } from '../../../reset';
import { baseStyles } from './Expander.baseStyles';
import {
  ExpanderGroupConsumer,
  ExpanderGroupProviderState,
} from '../ExpanderGroup/ExpanderGroup';

const baseClassName = 'fi-expander';
const openClassName = `${baseClassName}--open`;

export interface ExpanderProviderState {
  onToggleExpander: () => void;
  open: boolean;
  /**
   * Id for expander button
   */
  titleId: string | undefined;
  /**
   * Id for expander content
   */
  contentId: string | undefined;
}

const defaultProviderValue: ExpanderProviderState = {
  onToggleExpander: () => null,
  open: false,
  titleId: undefined,
  contentId: undefined,
};

const {
  Provider: ExpanderProvider,
  Consumer: ExpanderConsumer,
} = React.createContext(defaultProviderValue);

interface InternalExpanderProps {
  /**
   * Children, extend type ExpanderTitleBaseProps or ExpanderContentBaseProps
   * ExpanderProviderState context is used to communicate between title, content and expander
   */
  children: ReactNode;
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Id for expander button
   */
  id?: string;
  /** Default status of expander open
   * @default false
   */
  defaultOpen?: boolean;
  /* Controlled open property */
  open?: boolean;
  /** Event handler to execute when clicked */
  onClick?: ({ openState }: { openState: boolean }) => void;
  index?: number;
  expanderGroup?: boolean;
  consumer?: ExpanderGroupProviderState;
}

export interface ExpanderProps extends InternalExpanderProps, TokensProp {}

export interface ExpanderTitleBaseProps {
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Expander consumer for open state and toggle open callback
   */
  consumer: ExpanderProviderState;
}

export interface ExpanderContentBaseProps {
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Expander consumer for open state
   */
  consumer: ExpanderProviderState;
}

class BaseExpander extends Component<InternalExpanderProps> {
  state: ExpanderState = {
    openState:
      this.props.defaultOpen !== undefined ? this.props.defaultOpen : false,
  };

  id = idGenerator(this.props.id);

  contentId = `${this.id}_content`;

  componentDidUpdate(prevProps: ExpanderProps, prevState: ExpanderState) {
    if (
      !!this.props.consumer &&
      !!prevProps.consumer &&
      this.props.consumer.toggleAllExpanderState !==
        prevProps.consumer.toggleAllExpanderState
    ) {
      const { openState } = this.state;
      const {
        expanderGroup,
        index,
        consumer: { toggleAllExpanderState },
        open,
      } = this.props;

      if (
        !!expanderGroup &&
        index !== undefined &&
        ((open === undefined &&
          !!openState !== toggleAllExpanderState.toState) ||
          (open !== undefined && !!open !== toggleAllExpanderState.toState))
      ) {
        this.handleClick();
      }
    }

    const { open } = this.props;
    const { openState } = this.state;
    const controlled = open !== undefined;
    if (
      (prevState.openState !== openState && !controlled) ||
      (prevProps.open !== open && controlled)
    ) {
      const {
        expanderGroup,
        index,
        consumer: { onExpanderOpenChange } = {
          onExpanderOpenChange: undefined,
        },
      } = this.props;
      if (!!expanderGroup && !!onExpanderOpenChange && index !== undefined) {
        const currentState = controlled ? !!open : openState;
        onExpanderOpenChange(index, currentState);
      }
    }
  }

  handleClick = () => {
    const { open, onClick } = this.props;
    const { openState } = this.state;
    const controlled = open !== undefined;
    const newOpenState = controlled ? !!open : !openState;
    if (!controlled) {
      this.setState({ openState: newOpenState });
    }
    if (!!onClick) {
      onClick({ openState: newOpenState });
    }
  };

  render() {
    const {
      id,
      open,
      defaultOpen,
      onClick,
      className,
      children,
      index,
      expanderGroup: dissmissExpanderGroup,
      consumer,
      ...passProps
    } = this.props;
    const openState = open !== undefined ? !!open : this.state.openState;

    return (
      <HtmlDiv
        {...passProps}
        className={classnames(className, baseClassName, {
          [openClassName]: !!openState,
        })}
      >
        <ExpanderProvider
          value={{
            open: openState,
            contentId: this.contentId,
            titleId: this.id,
            onToggleExpander: this.handleClick,
          }}
        >
          {children}
        </ExpanderProvider>
      </HtmlDiv>
    );
  }
}

const StyledExpander = styled(
  ({ tokens, ...passProps }: ExpanderProps & InternalTokensProp) => {
    return <BaseExpander {...passProps} />;
  },
)`
  ${(props) => baseStyles(props)};
`;

interface ExpanderState {
  openState: boolean;
}

export class Expander extends Component<ExpanderProps> {
  render() {
    return !!this.props.expanderGroup ? (
      <ExpanderGroupConsumer>
        {(consumer) => (
          <StyledExpander
            {...withSuomifiDefaultProps(this.props)}
            consumer={consumer}
          />
        )}
      </ExpanderGroupConsumer>
    ) : (
      <StyledExpander {...withSuomifiDefaultProps(this.props)} />
    );
  }
}

export { ExpanderConsumer };
