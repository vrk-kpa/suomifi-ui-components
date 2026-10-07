import React, { ReactNode, forwardRef, useEffect } from 'react';
import { styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlButton, HtmlSpan, HtmlDivProps } from '../../../reset';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../../theme';
import {
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../../theme/utils/spacing';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { baseStyles } from './ExpanderGroup.baseStyles';
import {
  HTMLAttributesIncludingDataAttributes,
  filterDuplicateKeys,
} from '../../../utils/common/common';

const baseClassName = 'fi-expander-group';
const openClassName = `${baseClassName}--open`;
const expandersContainerClassName = `${baseClassName}_expanders`;
const openAllButtonClassName = `${baseClassName}_all-button`;

interface PartialExpanderGroupProps extends HtmlDivProps, MarginProps {
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
    HTMLAttributesIncludingDataAttributes<HTMLButtonElement>,
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

const BaseExpanderGroup = (props: ExpanderGroupProps) => {
  const {
    className,
    children,
    openAllText,
    ariaOpenAllText,
    closeAllText,
    ariaCloseAllText,
    showToggleAllButton = true,
    toggleAllButtonProps,
    forwardedRef,
    style,
    ...rest
  } = props;

  const [_marginProps, passProps] = separateMarginProps(rest);

  const [expanderGroupOpenState, setExpanderGroupOpenState] =
    React.useState<ExpanderGroupTargetOpenState>({
      targetOpenState: false,
    });
  const [expanders, setExpanders] = React.useState<ExpanderOpenStates>({});
  const [hasOpenExpander, setHasOpenExpander] = React.useState<
    boolean | undefined
  >(false);
  const [allOpen, setAllOpen] = React.useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (expanders && Object.keys(expanders).length > 0) {
      const allExpandersOpen = Object.values(expanders).every(
        (isOpen) => isOpen === true,
      );
      setAllOpen(allExpandersOpen);
      const someOpen = Object.values(expanders).some(
        (isOpen) => isOpen === true,
      );
      setHasOpenExpander(someOpen);
    } else {
      setHasOpenExpander(false);
      setAllOpen(false);
    }
  }, [expanders]);

  const handleExpanderOpenChange = (
    id: string,
    newState: boolean | undefined,
  ) => {
    setExpanders((prevExpanders) => {
      const next = { ...prevExpanders };
      if (newState !== undefined) {
        next[id] = newState;
      } else {
        delete next[id];
      }
      return next;
    });
  };

  const handleAllToggleClick = () => {
    setExpanderGroupOpenState(() => ({
      targetOpenState: !allOpen,
    }));
  };
  return (
    <HtmlDiv
      {...passProps}
      className={classnames(className, baseClassName, {
        [openClassName]: hasOpenExpander,
      })}
      style={style}
    >
      {!!showToggleAllButton && (
        <HtmlButton
          {...toggleAllButtonProps}
          onClick={handleAllToggleClick}
          className={classnames(
            toggleAllButtonProps?.className,
            openAllButtonClassName,
          )}
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
            onExpanderOpenChange: handleExpanderOpenChange,
            expanderGroupOpenState,
          }}
        >
          {children}
        </Provider>
      </HtmlDiv>
    </HtmlDiv>
  );
};

const StyledExpanderGroup = styled(
  (props: ExpanderGroupProps & SuomifiThemeProp & GlobalMarginProps) => {
    const { globalMargins, ...passProps } = props;
    return <BaseExpanderGroup {...passProps} />;
  },
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.expanderGroup,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const ExpanderGroup = forwardRef(
  (props: ExpanderGroupProps, ref: React.Ref<HTMLButtonElement>) => (
    <SpacingConsumer>
      {({ margins }) => (
        <SuomifiThemeConsumer>
          {({ suomifiTheme }) => (
            <StyledExpanderGroup
              theme={suomifiTheme}
              globalMargins={margins}
              forwardedRef={ref}
              {...props}
            />
          )}
        </SuomifiThemeConsumer>
      )}
    </SpacingConsumer>
  ),
);

ExpanderGroup.displayName = 'ExpanderGroup';

export { ExpanderGroup, ExpanderGroupConsumer };
