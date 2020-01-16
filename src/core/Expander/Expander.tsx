import React, { Component, Fragment } from 'react';
import { default as styled } from 'styled-components';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp, InternalTokensProp } from '../theme';
import { baseStyles } from './Expander.baseStyles';
import {
  Expander as CompExpander,
  ExpanderProps as CompExpanderProps,
} from '../../components/Expander/Expander';
import { Icon } from '../Icon/Icon';
import classnames from 'classnames';
import { ExpanderGroupProps, ExpanderGroup } from './ExpanderGroup';

const iconClassName = 'fi-expander_title-icon';
const iconOpenClassName = `${iconClassName}--open`;
const noPaddingClassName = `fi-expander_content--no-padding`;

type ExpanderVariant = 'expander' | 'expanderGroup';

export interface ExpanderProps extends CompExpanderProps, TokensProp {
  /** Remove padding from expandable content area (for background usage with padding in given container etc.) */
  noPadding?: boolean;
  /**
   * 'expander' | 'expanderGroup'
   * @default expander
   */
  variant?: ExpanderVariant;
}

const StyledExpander = styled(
  ({ tokens, noPadding, ...passProps }: ExpanderProps & InternalTokensProp) => {
    return (
      <CompExpander
        {...passProps}
        contentProps={{
          className: classnames({ [noPaddingClassName]: noPadding }),
        }}
      />
    );
  },
)`
  ${props => baseStyles(props)};
`;

interface ExpanderState {
  openState: boolean;
}

/**
 * <i class="semantics" />
 * Used for openable panel
 */
export class Expander extends Component<ExpanderProps> {
  static group = (props: ExpanderGroupProps) => {
    return <ExpanderGroup {...withSuomifiDefaultProps(props)} />;
  };

  /** State is only used to update the caret-icon */
  state: ExpanderState = {
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
      onClick({ openState: notControlled ? !openState : !!open });
    }
  };

  render() {
    const {
      variant = 'expander',
      open,
      title,
      titleTag,
      ...passProps
    } = withSuomifiDefaultProps(this.props);
    const notControlled = open === undefined;
    const openState = !notControlled ? open : this.state.openState;

    if (variant === 'expanderGroup' && 'openAll' in passProps) {
      return <ExpanderGroup {...(passProps as ExpanderGroupProps)} />;
    }

    return (
      <StyledExpander
        {...passProps}
        onClick={this.handleClick}
        open={open}
        titleTag={titleTag}
        title={
          <Fragment>
            {title}
            {!titleTag && (
              <Icon
                icon="chevronDown"
                className={classnames(iconClassName, {
                  [iconOpenClassName]: openState,
                })}
                color={passProps.tokens.colors.highlightBase}
              />
            )}
          </Fragment>
        }
      />
    );
  }
}
