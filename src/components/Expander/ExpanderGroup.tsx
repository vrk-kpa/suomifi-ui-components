import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { HtmlDiv, HtmlDivProps } from '../../reset';
import classnames from 'classnames';
import { ExpanderProps } from './Expander';
import { ButtonProps } from '../Button/Button';

export const baseClassName = 'fi-expander-group';
const openClassName = `${baseClassName}--open`;
const panelsContainerClassName = `${baseClassName}_panels`;
const openAllButtonClassName = `${baseClassName}_all-button`;

export const StyledPanel = styled((props: HtmlDivProps) => (
  <HtmlDiv {...props} />
))`
  display: block;
  width: 100%;
  max-width: 100%;
`;

interface ExpanderGroupState {
  /** Panels that are open */
  openPanels: number[];
}

interface OpenCloseAll {
  /** 'Open all'-component (Button) */
  OpenAll: React.ReactElement<ButtonProps>;
  /** 'Close all'-component (Button) */
  CloseAll: React.ReactElement<ButtonProps>;
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
  onClick: (index: number) => void;
  openPanels: number[];
}

const ExpanderGroupItems = (
  children: Array<React.ReactElement<ExpanderProps>>,
) =>
  React.Children.map(
    children,
    (child: React.ReactElement<ExpanderProps>, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          index,
          expanderGroup: true,
        });
      }
      return child;
    },
  );

const defaultProviderValue: ExpanderProviderState = {
  onClick: () => null,
  openPanels: [],
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
) => (children: React.ReactElement<ButtonProps>) => {
  return React.cloneElement(children, {
    onClick,
    className: classnames(openAllButtonClassName, children.props.className),
  });
};

const OpenAllButton = ({
  allOpen,
  onClick,
  OpenAll,
  CloseAll,
}: OpenAllButtonProps) => {
  return !!allOpen
    ? openAllButtonProps(onClick)(CloseAll)
    : openAllButtonProps(onClick)(OpenAll);
};

export class ExpanderGroup extends Component<ExpanderGroupProps> {
  state: ExpanderGroupState = {
    openPanels: [],
  };

  handleClick = (index: number = 0) => {
    const { openPanels: prevOpenPanels } = this.state;
    const prevPanelOpen = prevOpenPanels.includes(index);
    const openPanels = prevPanelOpen
      ? prevOpenPanels.filter(value => value !== index)
      : Array.from(new Set([...prevOpenPanels, index]));
    this.setState({ openPanels });
  };

  handleAllToggleClick = () => {
    const { children } = this.props;
    const { openPanels } = this.state;
    this.setState(
      openPanels.length === React.Children.count(children)
        ? { openPanels: [] }
        : {
            openPanels: Array.from(
              Array(React.Children.count(children)).keys(),
            ),
          },
    );
  };

  render() {
    const { className, children, OpenAll, CloseAll, ...passProps } = this.props;
    const { openPanels } = this.state;
    const allOpen = openPanels.length === React.Children.count(children);

    return (
      <StyledPanel
        {...passProps}
        className={classnames(className, baseClassName, {
          [openClassName]: openPanels.length > 0,
        })}
      >
        <OpenAllButton
          allOpen={allOpen}
          onClick={this.handleAllToggleClick}
          OpenAll={OpenAll}
          CloseAll={CloseAll}
        />
        <HtmlDiv className={panelsContainerClassName}>
          <Provider
            value={{
              openPanels,
              onClick: this.handleClick,
            }}
          >
            {ExpanderGroupItems(children)}
          </Provider>
        </HtmlDiv>
      </StyledPanel>
    );
  }
}

export { ExpanderGroupConsumer };
