import React, { Component, Fragment } from 'react';
import { default as styled } from 'styled-components';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp, InternalTokensProp } from '../theme';
import { baseStyles as panelBaseStyles } from './Panel.baseStyles';
import { baseStyles } from './PanelExpansion.baseStyles';
import {
  PanelExpansion as CompPanelExpansion,
  PanelExpansionProps as CompPanelExpansionProps,
} from '../../components/Panel/PanelExpansion';
import { Icon } from '../Icon/Icon';
import classnames from 'classnames';

const iconClassName = 'fi-panel-expansion_title-icon';
const iconOpenClassName = `${iconClassName}--open`;
const noPaddingClassName = `fi-panel-expansion_content--no-padding`;

export interface PanelExpansionProps
  extends CompPanelExpansionProps,
    TokensProp {
  /** Remove padding from expandable content area (for background usage with padding in given container etc.) */
  noPadding?: boolean;
}

const StyledPanelExpansion = styled(
  ({
    tokens,
    noPadding,
    ...passProps
  }: PanelExpansionProps & InternalTokensProp) => {
    return (
      <CompPanelExpansion
        {...passProps}
        contentProps={{
          className: classnames({ [noPaddingClassName]: noPadding }),
        }}
      />
    );
  },
)`
  ${props => panelBaseStyles(props)};
  ${props => baseStyles(props)};
`;

interface PanelExpansionState {
  openState: boolean;
}

/**
 * <i class="semantics" />
 * Used for openable panel
 */
export class PanelExpansion extends Component<PanelExpansionProps> {
  /** State is only used to update the caret-icon */
  state: PanelExpansionState = {
    openState:
      this.props.defaultOpen !== undefined ? this.props.defaultOpen : false,
  };

  handleClick = () => {
    const { onClick } = this.props;
    const { openState } = this.state;
    this.setState({ openState: !openState });
    if (!!onClick) {
      onClick({ openState: !openState });
    }
  };

  render() {
    const { title, titleTag, ...passProps } = withSuomifiDefaultProps(
      this.props,
    );
    const openState = this.state.openState;
    return (
      <StyledPanelExpansion
        {...passProps}
        onClick={this.handleClick}
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
