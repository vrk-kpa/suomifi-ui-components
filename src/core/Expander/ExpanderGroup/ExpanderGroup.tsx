import React, { Component, ReactNode, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlButton, HtmlButtonProps, HtmlSpan } from '../../../reset';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../../theme/utils/spacing';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { baseStyles } from './ExpanderGroup.baseStyles';

const baseClassName = 'fi-expander-group';
const openClassName = `${baseClassName}--open`;
const expandersContainerClassName = `${baseClassName}_expanders`;
const openAllButtonClassName = `${baseClassName}_all-button`;

interface PartialExpanderGroupProps extends MarginProps {
  /** Expanders (and optionally other ReactNodes) */
  children: ReactNode;
  /** 'Open all' button text for screen readers, hides `OpenAllText` for screen readers if provided */
  ariaOpenAllText?: string;
  /** 'Close all' button text for screen readers, hides `CloseAllText` for screen readers if provided */
  ariaCloseAllText?: string;
  /** CSS class for custom styles */
  className?: string;
  /** Props passed to the Open/Close all button */
  toggleAllButtonProps?: Omit<
    HtmlButtonProps,
    | 'onClick'
    | 'onMouseDown'
    | 'onMouseUp'
    | 'onKeyPress'
    | 'onKeyUp'
    | 'onKeyDown'
  >;
  /** Ref is forwarded to the Open/Close all button element. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLButtonElement>;
}

type ToggleAllProps =
  | {
      openAllText?: string;
      closeAllText?: string;
      showToggleAllButton?: false | never;
    }
  | {
      /** 'Open all' button text. Required when `showToggleAllButton` is true. */
      openAllText: string;
      /** 'Close all' button text. Required when `showToggleAllButton` is true. */
      closeAllText: string;
      /**
       * Shows Open/Close all button
       * @default true
       */
      showToggleAllButton: true;
    };

export type ExpanderGroupProps = PartialExpanderGroupProps & ToggleAllProps;

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

const { Provider, Consumer: ExpanderGroupConsumer } =
  React.createContext(defaultProviderValue);

class BaseExpanderGroup extends Component<
  ExpanderGroupProps & SuomifiThemeProp
> {
  state: ExpanderGroupState = {
    allOpen: undefined,
    expanderGroupOpenState: {
      targetOpenState: false,
    },
  };

  /** Expanders by id with current open state */
  private expanders: ExpanderOpenStates = {};

  /** Number of currently open Expanders */
  private openExpanderCount = 0;

  /** Number of Expanders inside the ExpanderGroup */
  private expanderCount = 0;

  /**
   * This function keeps track of number of expander, number of open expanders
   * and current state of each expander. Updating is done in granular level
   * for each change to avoid iterating over the whole Expander set on updates.
   */
  handleExpanderOpenChange = (id: string, newState: boolean | undefined) => {
    if (newState !== undefined) {
      // change or add new expander state
      if (this.expanders[id] !== undefined && this.expanders[id] !== newState) {
        if (newState === true) {
          this.openExpanderCount += 1;
        } else {
          this.openExpanderCount -= 1;
        }
      }
      // add new expander
      if (this.expanders[id] === undefined) {
        this.expanderCount += 1;
        if (newState === true) {
          this.openExpanderCount += 1;
        }
      }
      this.expanders[id] = newState;
    } else {
      // remove expander
      if (this.expanders[id] === true) {
        this.openExpanderCount -= 1;
      }
      this.expanderCount -= 1;
      delete this.expanders[id];
    }
    const allOpen = this.openExpanderCount === this.expanderCount;
    if (this.state.allOpen !== allOpen) {
      this.setState({ allOpen });
    }
  };

  handleAllToggleClick = () => {
    this.setState((prevState: ExpanderGroupState) => ({
      expanderGroupOpenState: {
        targetOpenState: !prevState.allOpen,
      },
    }));
  };

  render() {
    const {
      className,
      theme,
      children,
      openAllText,
      ariaOpenAllText,
      closeAllText,
      ariaCloseAllText,
      showToggleAllButton = true,
      toggleAllButtonProps,
      forwardedRef,
      ...rest
    } = this.props;
    const [marginProps, passProps] = separateMarginProps(rest);
    const marginStyle = spacingStyles(marginProps);
    const { expanderGroupOpenState, allOpen } = this.state;
    return (
      <HtmlDiv
        {...passProps}
        className={classnames(className, baseClassName, {
          [openClassName]: this.openExpanderCount > 0,
        })}
        style={marginStyle}
      >
        {!!showToggleAllButton && (
          <HtmlButton
            {...toggleAllButtonProps}
            onClick={this.handleAllToggleClick}
            className={classnames(
              toggleAllButtonProps?.className,
              openAllButtonClassName,
            )}
            aria-expanded={allOpen}
            forwardedRef={forwardedRef}
          >
            <HtmlSpan aria-hidden={true}>
              {allOpen ? closeAllText : openAllText}
            </HtmlSpan>
            <VisuallyHidden>
              {allOpen
                ? ariaCloseAllText || closeAllText
                : ariaOpenAllText || openAllText}
            </VisuallyHidden>
          </HtmlButton>
        )}
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
  ${({ theme }) => baseStyles(theme)}
`;

const ExpanderGroup = forwardRef(
  (props: ExpanderGroupProps, ref: React.Ref<HTMLButtonElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledExpanderGroup
          theme={suomifiTheme}
          forwardedRef={ref}
          {...props}
        />
      )}
    </SuomifiThemeConsumer>
  ),
);

ExpanderGroup.displayName = 'ExpanderGroup';

export { ExpanderGroup, ExpanderGroupConsumer };
