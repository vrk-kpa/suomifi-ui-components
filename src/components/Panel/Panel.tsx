import React, { Component, ReactNode, Fragment } from 'react';
import styled from '@emotion/styled';
import { HtmlDiv, HtmlDivProps } from '../../reset';
import { Button, ButtonProps } from '../Button/Button';
import classnames from 'classnames';
import { allStates } from '../utils/pseudo';

const baseClassName = 'fi-panel';
const panelExpansionClassName = `${baseClassName}-expansion`;
const panelExpansionTitleClassName = `${baseClassName}-expansion-title`;
const panelExpansionTitleNoTagClassName = `${panelExpansionTitleClassName}--no-tag`;
const panelExpansionTitleTagClassName = `${baseClassName}-expansion-title-tag`;
const panelExpansionContentClassName = `${baseClassName}-expansion-content`;
const panelExpansionContentOpenClassName = `${panelExpansionContentClassName}--open`;

const StyledPanel = styled((props: HtmlDivProps) => <HtmlDiv {...props} />)`
  display: block;
  width: 100%;
  max-width: 100%;
`;

export interface PanelProps {
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Panel element content
   */
  children?: ReactNode;
}

export class Panel extends Component<PanelProps> {
  render() {
    const { className, ...passProps } = this.props;
    return (
      <StyledPanel
        {...passProps}
        className={classnames(className, baseClassName)}
      />
    );
  }
}

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
    openState: !!this.props.open || !!this.props.defaultOpen || false,
  };

  componentWillReceiveProps(nextProps: PanelExpansionProps) {
    const { open } = nextProps;
    this.setState({ openState: open });
  }

  handleClick = () => {
    const { open, onClick } = this.props;
    const { openState } = this.state;
    if (open === undefined) {
      this.setState({ openState: !openState });
    }
    if (!!onClick) {
      onClick({ openState: !openState });
    }
  };

  render() {
    const {
      open: dissMissOpen,
      defaultOpen,
      onClick,
      className,
      children,
      title,
      titleTag,
      ...passProps
    } = this.props;
    const { openState } = this.state;
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
