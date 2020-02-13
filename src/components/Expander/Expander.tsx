import React, { Component, ReactNode, Fragment } from 'react';
import { default as styled } from 'styled-components';
import { Button, ButtonProps } from '../Button/Button';
import { allStates } from '../../utils/css';
import { HtmlDiv, HtmlDivProps } from '../../reset';
import classnames from 'classnames';
import { ExpanderGroupConsumer, ExpanderProviderState } from './ExpanderGroup';

const baseClassName = 'fi-expander';
const openClassName = `${baseClassName}--open`;
const titleClassName = `${baseClassName}_title`;
const titleOpenClassName = `${titleClassName}--open`;
const titleNoTagClassName = `${titleClassName}--no-tag`;
const titleTagClassName = `${baseClassName}_title-tag`;
const contentBaseClassName = `${baseClassName}_content`;
const contentOpenClassName = `${contentBaseClassName}--open`;

export const StyledDiv = styled((props: HtmlDivProps) => (
  <HtmlDiv {...props} />
))`
  display: block;
  width: 100%;
  max-width: 100%;
`;

interface SharedExpanderProps {
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Expander element content
   */
  children?: ReactNode;
}

interface StyledExpanderContentProps extends SharedExpanderProps {
  openState: boolean;
  hidden: boolean;
}

export const StyledExpanderContent = styled(
  ({ openState, className, ...passProps }: StyledExpanderContentProps) => (
    <StyledDiv
      {...passProps}
      className={classnames(className, baseClassName)}
    />
  ),
)`
  display: ${({ openState }) => (!!openState ? 'block' : 'none')};
`;

const StyledExpanderTitle = styled(
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

interface ExpanderState {
  openState: boolean;
}

export interface ExpanderProps extends SharedExpanderProps {
  /** Title for Expander */
  title: ReactNode;
  /** Title HTML-tag (h1, h2, h3 etc.)
   * @default none
   */
  titleTag?: string;
  open?: boolean;
  /** Properties for title-Button */
  titleProps?: ButtonProps & { open?: boolean };
  /** Properties for the content div */
  contentProps?: SharedExpanderProps;
  /** Default status of expander open
   * @default false
   */
  defaultOpen?: boolean;
  /** Event handler to execute when clicked */
  onClick?: ({ openState }: { openState: boolean }) => void;
  index?: number;
  expanderGroup?: boolean;
  consumer?: ExpanderProviderState;
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

export class ExpanderItem extends Component<ExpanderProps> {
  state: ExpanderState = {
    openState:
      this.props.defaultOpen !== undefined ? this.props.defaultOpen : false,
  };

  handleClick = () => {
    const {
      open,
      onClick,
      consumer: { onClick: consumerOnClick } = { onClick: undefined },
      index,
      expanderGroup,
    } = this.props;
    if (!!expanderGroup && !!consumerOnClick && index !== undefined) {
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
      expanderGroup: dissmissExpanderGroup,
      consumer: { openExpanders } = { openExpanders: undefined },
      contentProps: { className: contentClassName, ...contentPassProps } = {
        className: undefined,
      },
      ...passProps
    } = this.props;
    const localOpenState = () =>
      open !== undefined ? !!open : this.state.openState;
    const openState =
      index !== undefined && !!openExpanders
        ? openExpanders.includes(index)
        : localOpenState();

    return (
      <StyledDiv
        {...passProps}
        className={classnames(className, baseClassName, {
          [openClassName]: !!openState,
        })}
      >
        <IfTitleTag titleTag={titleTag}>
          <StyledExpanderTitle
            onClick={this.handleClick}
            className={classnames(titleClassName, {
              [titleNoTagClassName]: !titleTag,
            })}
            aria-expanded={!!openState}
            {...titleProps}
            open={openState}
          >
            {title}
          </StyledExpanderTitle>
        </IfTitleTag>
        <StyledExpanderContent
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
        </StyledExpanderContent>
      </StyledDiv>
    );
  }
}

export class Expander extends Component<ExpanderProps> {
  render() {
    return !!this.props.expanderGroup ? (
      <ExpanderGroupConsumer>
        {consumer => <ExpanderItem {...this.props} consumer={consumer} />}
      </ExpanderGroupConsumer>
    ) : (
      <ExpanderItem {...this.props} />
    );
  }
}
