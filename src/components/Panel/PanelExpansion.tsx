import React, { Component, ReactNode, Fragment } from 'react';
import styled from '@emotion/styled';
import { Panel, PanelProps, baseClassName, StyledPanel } from './Panel';
import { Button, ButtonProps } from '../Button/Button';
import { allStates } from '../utils/pseudo';
import classnames from 'classnames';

const panelExpansionClassName = `${baseClassName}-expansion`;
const panelExpansionTitleClassName = `${baseClassName}-expansion-title`;
const panelExpansionTitleNoTagClassName = `${panelExpansionTitleClassName}--no-tag`;
const panelExpansionTitleTagClassName = `${baseClassName}-expansion-title-tag`;
const panelExpansionContentClassName = `${baseClassName}-expansion-content`;
const panelExpansionContentOpenClassName = `${panelExpansionContentClassName}--open`;

const StyledPanelExpansionContent = styled(
  ({ openState, ...passProps }: PanelProps & { openState: boolean }) => (
    <Panel {...passProps} />
  ),
)`
  display: ${({ openState }) => (!!openState ? 'block' : 'none')};
`;

const StyledPanelExpansionTitle = styled((props: ButtonProps) => (
  <Button {...props} mouseNoFocus={true} />
))`
  &,
  & * {
    cursor: pointer;
  }
  ${allStates('cursor: pointer;')}
`;

interface PanelExpansionState {
  openState: boolean;
}

export interface PanelExpansionProps extends PanelProps {
  /** Title for Panel */
  title: ReactNode;
  /** Title HTML-tag (h1, h2, h3 etc.)
   * @default none
   */
  titleTag?: string;
  /** Controlled open-state, use onClick to change  */
  open?: boolean;
  /** Properties for title-Button */
  titleProps?: ButtonProps;
  /** Default status of panel open when not using controlled 'open' state
   * @default false
   */
  defaultOpen?: boolean;
  /** Event handler to execute when clicked */
  onClick?: ({ openState }: { openState: boolean }) => void;
}

const IfTitleTag = ({
  titleTag,
  children,
}: {
  titleTag?: string;
  children: ReactNode;
}) => (
  <Fragment>
    {!!titleTag
      ? React.createElement(titleTag, {
          children,
          className: panelExpansionTitleTagClassName,
        })
      : children}
  </Fragment>
);

export class PanelExpansion extends Component<PanelExpansionProps> {
  state: PanelExpansionState = {
    openState:
      this.props.defaultOpen !== undefined ? this.props.defaultOpen : false,
  };

  handleClick = () => {
    const { open, onClick } = this.props;
    const { openState } = this.state;
    const notControlled = open === undefined;
    if (notControlled) {
      this.setState({ openState: !openState });
    }
    if (!!onClick) {
      onClick({ openState: notControlled ? !openState : !open });
    }
  };

  render() {
    const {
      open,
      defaultOpen,
      onClick,
      className,
      children,
      title,
      titleTag,
      titleProps,
      ...passProps
    } = this.props;
    const openState = open !== undefined ? open : this.state.openState;
    return (
      <StyledPanel
        {...passProps}
        className={classnames(className, panelExpansionClassName)}
      >
        <IfTitleTag titleTag={titleTag}>
          <StyledPanelExpansionTitle
            onClick={this.handleClick}
            className={classnames(panelExpansionTitleClassName, {
              [panelExpansionTitleNoTagClassName]: !titleTag,
            })}
            aria-expanded={!!openState}
            {...titleProps}
          >
            {title}
          </StyledPanelExpansionTitle>
        </IfTitleTag>
        <StyledPanelExpansionContent
          openState={openState}
          className={classnames(panelExpansionContentClassName, {
            [panelExpansionContentOpenClassName]: !!openState,
          })}
          aria-hidden={!openState}
        >
          {children}
        </StyledPanelExpansionContent>
      </StyledPanel>
    );
  }
}
