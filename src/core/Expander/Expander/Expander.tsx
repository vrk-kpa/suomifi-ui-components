import React, { Component, ReactNode, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { AutoId } from '../../utils/AutoId/AutoId';
import { HtmlDivWithRef } from '../../../reset';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import {
  ExpanderGroupConsumer,
  ExpanderGroupProviderState,
} from '../ExpanderGroup/ExpanderGroup';
import { baseStyles } from './Expander.baseStyles';

const baseClassName = 'fi-expander';
const openClassName = `${baseClassName}--open`;

export interface ExpanderProviderState {
  /** Callback for communicating ExpanderTitle button event to Expander  */
  onToggleExpander: () => void;
  /** Open state for expander */
  open: boolean;
  /** Id for expander button */
  titleId: string | undefined;
  /** Id for expander content */
  contentId: string | undefined;
}

const defaultProviderValue: ExpanderProviderState = {
  onToggleExpander: () => null,
  open: false,
  titleId: undefined,
  contentId: undefined,
};

const { Provider: ExpanderProvider, Consumer: ExpanderConsumer } =
  React.createContext(defaultProviderValue);

export interface ExpanderProps {
  /**
   * Children extend type ExpanderTitleBaseProps or ExpanderContentBaseProps
   * ExpanderProviderState context is used to communicate between title, content and expander
   */
  children: ReactNode;
  /** CSS class for custom styles */
  className?: string;
  /**
   * HTML id for Expander, must be unique. Duplicate id's break ExpanderGroup functionality.
   * If no id is provided, one will be generated automatically
   */
  id?: string;
  /** Initial open state
   * @default false
   */
  defaultOpen?: boolean;
  /** Controlled open property */
  open?: boolean;
  /** Callback fired on click */
  onOpenChange?: (open: boolean) => void;
  /** Ref is placed to the outermost div element of the component. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLDivElement>;
}

export interface ExpanderTitleBaseProps {
  /** CSS class for custom styles */
  className?: string;
  /** Expander consumer for open state and toggle open callback */
  consumer: ExpanderProviderState;
}

export interface ExpanderContentBaseProps {
  /** CSS class for custom styles */
  className?: string;
  /** Expander consumer for open state */
  consumer: ExpanderProviderState;
}

interface BaseExpanderProps extends ExpanderProps {
  id: string;
  consumer: ExpanderGroupProviderState;
}

class BaseExpander extends Component<BaseExpanderProps & SuomifiThemeProp> {
  state: ExpanderState = {
    openState: this.props.defaultOpen || false,
  };

  constructor(props: BaseExpanderProps & SuomifiThemeProp) {
    super(props);
    if (!!props.id) {
      const defaultOpen =
        props.open !== undefined ? props.open : props.defaultOpen || false;
      props.consumer.onExpanderOpenChange(props.id, defaultOpen);
    }
  }

  componentDidUpdate(prevProps: BaseExpanderProps, prevState: ExpanderState) {
    const { consumer, open } = this.props;
    const controlled = open !== undefined;
    const currentState = controlled ? !!open : this.state.openState;
    // update group state when id changes
    if (prevProps.id !== this.props.id) {
      if (!!prevProps.id) {
        consumer.onExpanderOpenChange(prevProps.id, undefined);
      }
      consumer.onExpanderOpenChange(this.props.id, currentState);
    }
    // handle consumer open change event
    if (
      consumer.expanderGroupOpenState !==
      prevProps.consumer?.expanderGroupOpenState
    ) {
      if (
        (!controlled &&
          !!this.state.openState !==
            consumer.expanderGroupOpenState.targetOpenState) ||
        (controlled && open !== consumer.expanderGroupOpenState.targetOpenState)
      ) {
        this.handleOpenChange();
      }
    }
    // handle expander open change event
    if (
      (!controlled && prevState.openState !== this.state.openState) ||
      (controlled && prevProps.open !== open)
    ) {
      if (!!this.props.id) {
        consumer.onExpanderOpenChange(this.props.id, currentState);
      }
    }
  }

  componentWillUnmount() {
    this.props.consumer.onExpanderOpenChange(this.props.id, undefined);
  }

  handleOpenChange = () => {
    const { open, onOpenChange } = this.props;
    const { openState } = this.state;
    const controlled = open !== undefined;
    const newOpenState = controlled ? !!open : !openState;
    if (!controlled) {
      this.setState({ openState: newOpenState });
    }
    if (!!onOpenChange) {
      onOpenChange(newOpenState);
    }
  };

  render() {
    const {
      id,
      open,
      defaultOpen,
      onOpenChange,
      className,
      theme,
      children,
      consumer,
      ...passProps
    } = this.props;
    const openState = open !== undefined ? !!open : this.state.openState;

    return (
      <HtmlDivWithRef
        id={id}
        {...passProps}
        className={classnames(className, baseClassName, {
          [openClassName]: !!openState,
        })}
      >
        <ExpanderProvider
          value={{
            open: openState,
            contentId: `${id}_content`,
            titleId: `${id}_title`,
            onToggleExpander: this.handleOpenChange,
          }}
        >
          {children}
        </ExpanderProvider>
      </HtmlDivWithRef>
    );
  }
}

const StyledExpander = styled(BaseExpander)`
  ${({ theme }) => baseStyles(theme)}
`;

interface ExpanderState {
  openState: boolean;
}

const Expander = forwardRef(
  (props: ExpanderProps, ref: React.Ref<HTMLDivElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <ExpanderGroupConsumer>
                {(consumer) => (
                  <StyledExpander
                    theme={suomifiTheme}
                    id={id}
                    forwardedRef={ref}
                    {...passProps}
                    consumer={consumer}
                  />
                )}
              </ExpanderGroupConsumer>
            )}
          </AutoId>
        )}
      </SuomifiThemeConsumer>
    );
  },
);

Expander.displayName = 'Expander';
export { Expander, ExpanderConsumer, ExpanderProvider };
