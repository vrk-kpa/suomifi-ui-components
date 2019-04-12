import React, { Component, ReactNode, Fragment } from 'react';
import styled from '@emotion/styled';
import { Panel, PanelProps, baseClassName, StyledPanel } from './Panel';
import { Button, ButtonProps } from '../Button/Button';
import { allStates } from '../../utils/css/pseudo';
import classnames from 'classnames';
import {
  PanelExpansionGroupConsumer,
  PanelExpansionProviderState,
} from './PanelExpansionGroup';

const panelExpansionClassName = `${baseClassName}-expansion`;
const openClassName = `${panelExpansionClassName}--open`;
const titleClassName = `${panelExpansionClassName}-title`;
const titleOpenClassName = `${titleClassName}--open`;
const titleNoTagClassName = `${titleClassName}--no-tag`;
const titleTagClassName = `${panelExpansionClassName}-title-tag`;
const contentClassName = `${panelExpansionClassName}-content`;
const contentOpenClassName = `${contentClassName}--open`;

const StyledPanelExpansionContent = styled(
  ({ openState, ...passProps }: PanelProps & { openState: boolean }) => (
    <Panel {...passProps} />
  ),
)`
  display: ${({ openState }) => (!!openState ? 'block' : 'none')};
`;

const StyledPanelExpansionTitle = styled(
  ({ open, className, ...passProps }: ButtonProps & { open?: boolean }) => (
    <Button
      {...passProps}
      mouseNoFocus={true}
      className={classnames(className, { [titleOpenClassName]: !!open })}
    />
  ),
)`
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
  titleProps?: ButtonProps & { open?: boolean };
  /** Default status of panel open when not using controlled 'open' state
   * @default false
   */
  defaultOpen?: boolean;
  /** Event handler to execute when clicked */
  onClick?: ({ openState }: { openState: boolean }) => void;
  index?: number;
  expansionGroup?: boolean;
  consumer?: PanelExpansionProviderState;
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
          className: titleTagClassName,
        })
      : children}
  </Fragment>
);

export class PanelExpansionItem extends Component<PanelExpansionProps> {
  state: PanelExpansionState = {
    openState:
      this.props.defaultOpen !== undefined ? this.props.defaultOpen : false,
  };

  handleClick = () => {
    const {
      open,
      onClick,
      consumer: { onClick: consumerOnClick } = { onClick: undefined },
      index,
      expansionGroup,
    } = this.props;
    if (!!expansionGroup && !!consumerOnClick && index !== undefined) {
      consumerOnClick(index);
    } else {
      const openState = !this.state.openState;
      const notControlled = open === undefined;
      if (notControlled) {
        this.setState({ openState });
      }
      if (!!onClick) {
        onClick({ openState: notControlled ? openState : !!open });
      }
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
      index,
      expansionGroup: dissmissExpansionGroup,
      consumer: { openPanels } = { openPanels: undefined },
      ...passProps
    } = this.props;
    const localOpenState = () =>
      open !== undefined ? !!open : this.state.openState;
    const openState =
      index !== undefined && !!openPanels
        ? openPanels.includes(index)
        : localOpenState();

    return (
      <StyledPanel
        {...passProps}
        className={classnames(className, panelExpansionClassName, {
          [openClassName]: !!openState,
        })}
      >
        <IfTitleTag titleTag={titleTag}>
          <StyledPanelExpansionTitle
            onClick={this.handleClick}
            className={classnames(titleClassName, {
              [titleNoTagClassName]: !titleTag,
            })}
            aria-expanded={!!openState}
            {...titleProps}
            open={openState}
          >
            {title}
          </StyledPanelExpansionTitle>
        </IfTitleTag>
        <StyledPanelExpansionContent
          openState={openState}
          className={classnames(contentClassName, {
            [contentOpenClassName]: !!openState,
          })}
          aria-hidden={!openState}
        >
          {children}
        </StyledPanelExpansionContent>
      </StyledPanel>
    );
  }
}

export class PanelExpansion extends Component<PanelExpansionProps> {
  render() {
    return !!this.props.expansionGroup ? (
      <PanelExpansionGroupConsumer>
        {PanelExpansionGroupConsumer => (
          <PanelExpansionItem
            {...this.props}
            consumer={PanelExpansionGroupConsumer}
          />
        )}
      </PanelExpansionGroupConsumer>
    ) : (
      <PanelExpansionItem {...this.props} />
    );
  }
}
