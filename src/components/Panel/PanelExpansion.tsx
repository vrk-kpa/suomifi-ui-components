import React, { Component, ReactNode, Fragment } from 'react';
import { default as styled } from 'styled-components';
import { Panel, PanelProps, baseClassName, StyledPanel } from './Panel';
import { Button, ButtonProps } from '../Button/Button';
import { allStates } from '../../utils/css';
import classnames from 'classnames';
import {
  PanelExpansionGroupConsumer,
  PanelExpansionProviderState,
} from './PanelExpansionGroup';

const panelExpansionClassName = `${baseClassName}-expansion`;
const openClassName = `${panelExpansionClassName}--open`;
const titleClassName = `${panelExpansionClassName}_title`;
const titleOpenClassName = `${titleClassName}--open`;
const titleNoTagClassName = `${titleClassName}--no-tag`;
const titleTagClassName = `${panelExpansionClassName}_title-tag`;
const contentBaseClassName = `${panelExpansionClassName}_content`;
const contentOpenClassName = `${contentBaseClassName}--open`;

interface StyledPanelExpansionContentProps extends PanelProps {
  openState: boolean;
  hidden: boolean;
}

export const StyledPanelExpansionContent = styled(
  ({ openState, ...passProps }: StyledPanelExpansionContentProps) => (
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
  open?: boolean;
  /** Properties for title-Button */
  titleProps?: ButtonProps & { open?: boolean };
  /** Properties for the content div */
  contentProps?: PanelProps;
  /** Default status of panel open
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
      contentProps: { className: contentClassName, ...contentPassProps } = {
        className: undefined,
      },
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
          {...contentPassProps}
          openState={openState}
          className={classnames(contentBaseClassName, contentClassName, {
            [contentOpenClassName]: !!openState,
          })}
          hidden={!openState}
          key={String(openState)}
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
        {consumer => <PanelExpansionItem {...this.props} consumer={consumer} />}
      </PanelExpansionGroupConsumer>
    ) : (
      <PanelExpansionItem {...this.props} />
    );
  }
}
