import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';
import { defaultPropsTheme } from '../utils';
import { suomifiTheme, ThemeComponent } from '../theme';
import { baseStyles as panelBaseStyles } from './Panel.baseStyles';
import { baseStyles } from './PanelExpansion.baseStyles';
import {
  PanelExpansion as CompPanelExpansion,
  PanelExpansionProps as CompPanelExpansionProps,
} from '../../components/Panel/PanelExpansion';
import { Icon } from '../Icon/Icon';
import classnames from 'classnames';

export interface PanelExpansionProps
  extends CompPanelExpansionProps,
    ThemeComponent {
  /** Remove padding from expandable content area (for background usage with padding in given container etc.) */
  noPadding?: boolean;
}

const StyledPanelExpansion = styled(
  ({ noPadding, ...passProps }: PanelExpansionProps) => {
    return <CompPanelExpansion {...passProps} />;
  },
)`
  ${props => panelBaseStyles(props)};
  ${props => baseStyles(props)};
`;

interface PanelExpansionState {
  openState: boolean;
}

/**
 * Used for panel style and defined actions
 */
export class PanelExpansion extends Component<PanelExpansionProps> {
  static defaultProps = defaultPropsTheme(CompPanelExpansion);

  /** State is only used to update the caret-icon */
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
      onClick({ openState: notControlled ? !openState : !!open });
    }
  };

  render() {
    // TODO why default theme neede here when should be set by defaultProps??
    const {
      open,
      title,
      titleTag,
      theme = suomifiTheme,
      ...passProps
    } = this.props;
    const notControlled = open === undefined;
    const openState = !notControlled ? open : this.state.openState;
    return (
      <StyledPanelExpansion
        {...passProps}
        theme={theme}
        onClick={this.handleClick}
        open={open}
        titleTag={titleTag}
        title={
          <Fragment>
            {title}
            {!titleTag && (
              <Icon
                icon="chevronDown"
                className={classnames('fi-panel-expansion-title-icon', {
                  'fi-panel-expansion-title-icon--open': openState,
                })}
                color={theme.colors.secondaryColor}
              />
            )}
          </Fragment>
        }
      />
    );
  }
}
