import React, { Component, ReactNode, Fragment } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { withSuomifiDefaultProps } from '../theme/utils';
import { idGenerator } from '../../utils/uuid';
import { TokensProp, InternalTokensProp } from '../theme';
import { HtmlDiv } from '../../reset';
import { baseStyles } from './Expander.baseStyles';
import { Icon } from '../Icon/Icon';
import { Button, ButtonProps } from '../../components/Button/Button';
import {
  ExpanderGroupProps,
  ExpanderGroup,
  ExpanderGroupConsumer,
  ExpanderProviderState,
} from './ExpanderGroup';

const baseClassName = 'fi-expander';
const openClassName = `${baseClassName}--open`;
const titleClassName = `${baseClassName}_title`;
const titleOpenClassName = `${titleClassName}--open`;
const titleNoTagClassName = `${titleClassName}--no-tag`;
const titleTagClassName = `${titleClassName}-tag`;
const iconClassName = `${titleClassName}-icon`;
const iconOpenClassName = `${iconClassName}--open`;
const contentBaseClassName = `${baseClassName}_content`;
const contentOpenClassName = `${contentBaseClassName}--open`;
const noPaddingClassName = `${contentBaseClassName}--no-padding`;

type ExpanderVariant = 'expander' | 'expanderGroup';

interface SharedExpanderProps {
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Expander element content
   */
  children?: ReactNode;
  /**
   * Id for expander button
   */
  id?: string;
}

interface StyledExpanderContentProps extends SharedExpanderProps {
  openState?: boolean;
}

const StyledExpanderContent = styled(
  ({ openState, className, ...passProps }: StyledExpanderContentProps) => (
    <HtmlDiv {...passProps} className={classnames(className)} role="region" />
  ),
)`
  display: ${({ openState }) => (!!openState ? 'block' : 'none')};
`;

interface InternalExpanderProps extends SharedExpanderProps {
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

export interface ExpanderProps extends InternalExpanderProps, TokensProp {
  /** Remove padding from expandable content area (for background usage with padding in given container etc.) */
  noPadding?: boolean;
  /**
   * 'expander' | 'expanderGroup'
   * @default expander
   */
  variant?: ExpanderVariant;
}

const IfTitleTag = ({
  titleTag,
  children,
}: {
  titleTag: string | undefined;
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

class BaseExpanderItem extends Component<InternalExpanderProps> {
  state: ExpanderState = {
    openState:
      this.props.defaultOpen !== undefined ? this.props.defaultOpen : false,
  };

  id = idGenerator(this.props.id);

  contentId = `${this.id}_content`;

  componentDidUpdate(prevProps: ExpanderProps, prevState: ExpanderState) {
    if (
      !!this.props.consumer &&
      !!prevProps.consumer &&
      this.props.consumer.toggleAllExpanderState !==
        prevProps.consumer.toggleAllExpanderState
    ) {
      const { openState } = this.state;
      const {
        expanderGroup,
        index,
        consumer: { toggleAllExpanderState },
        open,
      } = this.props;

      if (
        !!expanderGroup &&
        index !== undefined &&
        ((open === undefined &&
          !!openState !== toggleAllExpanderState.toState) ||
          (open !== undefined && !!open !== toggleAllExpanderState.toState))
      ) {
        this.handleClick();
      }
    }

    const { open } = this.props;
    const { openState } = this.state;
    const controlled = open !== undefined;
    if (
      (prevState.openState !== openState && !controlled) ||
      (prevProps.open !== open && controlled)
    ) {
      const {
        expanderGroup,
        index,
        consumer: { onExpanderOpenChange } = {
          onExpanderOpenChange: undefined,
        },
      } = this.props;
      if (!!expanderGroup && !!onExpanderOpenChange && index !== undefined) {
        const currentState = controlled ? !!open : openState;
        onExpanderOpenChange(index, currentState);
      }
    }
  }

  handleClick = () => {
    const { open, onClick } = this.props;
    const { openState } = this.state;
    const controlled = open !== undefined;
    const newOpenState = controlled ? !!open : !openState;

    if (!controlled) {
      this.setState({ openState: newOpenState });
    }
    if (!!onClick) {
      onClick({ openState: newOpenState });
    }
  };

  render() {
    const {
      id,
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
      consumer,
      contentProps: { className: contentClassName, ...contentPassProps } = {
        className: undefined,
      },
      ...passProps
    } = this.props;
    const openState = open !== undefined ? !!open : this.state.openState;

    return (
      <HtmlDiv
        {...passProps}
        className={classnames(className, baseClassName, {
          [openClassName]: !!openState,
        })}
      >
        <IfTitleTag titleTag={titleTag}>
          <Button
            {...titleProps}
            onClick={this.handleClick}
            open={openState}
            aria-expanded={!!openState}
            mouseNoFocus={true}
            className={classnames(titleClassName, {
              [titleNoTagClassName]: !titleTag,
              [titleOpenClassName]: !!openState,
            })}
            id={this.id}
            {...{ 'aria-controls': this.contentId }}
          >
            {title}
            {!titleTag && (
              <Icon
                icon="chevronDown"
                className={classnames(iconClassName, {
                  [iconOpenClassName]: openState,
                })}
              />
            )}
          </Button>
        </IfTitleTag>
        <StyledExpanderContent
          {...contentPassProps}
          {...{ 'aria-labelledby': this.id }}
          id={this.contentId}
          openState={openState}
          className={classnames(contentBaseClassName, contentClassName, {
            [contentOpenClassName]: !!openState,
          })}
          key={String(openState)}
          aria-hidden={!openState}
        >
          {children}
        </StyledExpanderContent>
      </HtmlDiv>
    );
  }
}

const StyledExpander = styled(
  ({ noPadding, tokens, ...passProps }: ExpanderProps & InternalTokensProp) => {
    return (
      <BaseExpanderItem
        {...passProps}
        contentProps={{
          className: classnames({ [noPaddingClassName]: noPadding }),
        }}
      />
    );
  },
)`
  ${(props) => baseStyles(props)};
`;

interface ExpanderState {
  openState: boolean;
}
export class Expander extends Component<ExpanderProps> {
  static group = (props: ExpanderGroupProps) => {
    return <ExpanderGroup {...withSuomifiDefaultProps(props)} />;
  };

  render() {
    return !!this.props.expanderGroup ? (
      <ExpanderGroupConsumer>
        {(consumer) => (
          <StyledExpander
            {...withSuomifiDefaultProps(this.props)}
            consumer={consumer}
          />
        )}
      </ExpanderGroupConsumer>
    ) : (
      <StyledExpander {...withSuomifiDefaultProps(this.props)} />
    );
  }
}
