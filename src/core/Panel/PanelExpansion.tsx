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

/**
 * Used for panel style and defined actions
 */
export class PanelExpansion extends Component<PanelExpansionProps> {
  static defaultProps = defaultPropsTheme(CompPanelExpansion);

  render() {
    // TODO why default theme neede here when should be set by defaultProps??
    const { title, titleTag, theme = suomifiTheme, ...passProps } = this.props;
    return (
      <StyledPanelExpansion
        {...passProps}
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
