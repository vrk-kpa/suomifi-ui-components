import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';
import { defaultPropsTheme } from '../utils';
import { suomifiTheme, ThemeComponent } from '../theme';
import { baseStyles as panelBaseStyles } from './Panel.baseStyles';
import { baseStyles } from './PanelExpansion.baseStyles';
import {
  PanelExpansion as CompPanelExpansion,
  PanelExpansionProps as CompPanelExpansionProps,
} from '../../components/Panel/Panel';
import { Icon } from '../Icon/Icon';
import classnames from 'classnames';

export interface PanelExpansionProps
  extends CompPanelExpansionProps,
    ThemeComponent {}

interface PanelExpansionState {
  open: boolean;
}

const StyledPanelExpansion = styled(({ ...passProps }: PanelExpansionProps) => {
  return <CompPanelExpansion {...passProps} />;
})`
  label: panel-expansion;
  ${props => panelBaseStyles(props)};
  ${props => baseStyles(props)};
`;

/**
 * Used for panel style and defined actions
 */
export class PanelExpansion extends Component<PanelExpansionProps> {
  static defaultProps = defaultPropsTheme(CompPanelExpansion);

  state: PanelExpansionState = { open: false };

  handleClick = ({ openState }: { openState: boolean }) => {
    const { onClick } = this.props;
    this.setState({ open: openState });
    if (typeof onClick === 'function') {
      onClick({ openState });
    }
  };

  render() {
    // TODO why default theme neede here when should be set by defaultProps??
    const {
      onClick: dismissOnClick,
      open: dismissOpen,
      title,
      titleTag,
      theme = suomifiTheme,
      ...passProps
    } = this.props;
    const { open } = this.state;
    return (
      <StyledPanelExpansion
        {...passProps}
        onClick={this.handleClick}
        open={open}
        theme={theme}
        titleTag={titleTag}
        title={
          <Fragment>
            {title}
            {!titleTag && (
              <Icon
                icon="chevronDown"
                className={classnames('fi-panel-expansion-title-icon', {
                  'fi-panel-expansion-title-icon--open': open,
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
