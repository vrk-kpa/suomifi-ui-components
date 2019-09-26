import React, { Component, ReactElement } from 'react';
import { default as styled } from 'styled-components';
import { HtmlDiv, HtmlDivProps } from '../../reset';
import classnames from 'classnames';
import { PanelExpansionProps } from './PanelExpansion';
import { ButtonProps } from '../Button/Button';

export const baseClassName = 'fi-panel-expansion-group';
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

interface PanelExpansionGroupState {
  /** Panels that are open */
  openPanels: number[];
}

export interface PanelExpansionGroupProps {
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Use PanelExpansion's here
   */
  children: Array<React.ReactElement<PanelExpansionProps>>;
  /** Properties for OpenAllButton */
  openAllButtonProps?: ButtonProps;
  /** 'Open all'-component (Button) */
  OpenAll: ReactElement<ButtonProps>;
  /** 'Close all'-component (Button) */
  CloseAll: ReactElement<ButtonProps>;
}

export interface PanelExpansionProviderState {
  onClick: (index: number) => void;
  openPanels: number[];
}

const PanelExpansionGroupItems = (
  children: Array<React.ReactElement<PanelExpansionProps>>,
) =>
  React.Children.map(
    children,
    (child: React.ReactElement<PanelExpansionProps>, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          index,
          expansionGroup: true,
        });
      }
      return child;
    },
  );

const defaultProviderValue: PanelExpansionProviderState = {
  onClick: () => null,
  openPanels: [],
};

const { Provider, Consumer: PanelExpansionGroupConsumer } = React.createContext(
  defaultProviderValue,
);

interface OpenAllButtonProps {
  allOpen: boolean;
  onClick: (event: React.MouseEvent<Element>) => void;
  OpenAll: ReactElement<ButtonProps>;
  CloseAll: ReactElement<ButtonProps>;
  openAllButtonProps?: ButtonProps;
}

const openAllButtonProps = (
  onClick: (event: React.MouseEvent<Element>) => void,
) => (children: ReactElement<ButtonProps>) => {
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

export class PanelExpansionGroup extends Component<PanelExpansionGroupProps> {
  state: PanelExpansionGroupState = {
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
            {PanelExpansionGroupItems(children)}
          </Provider>
        </HtmlDiv>
      </StyledPanel>
    );
  }
}

export { PanelExpansionGroupConsumer };
