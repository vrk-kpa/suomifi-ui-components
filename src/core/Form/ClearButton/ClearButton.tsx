import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { baseStyles } from './ClearButton.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlButton, HtmlButtonProps } from '../../../reset';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { Icon } from '../../Icon/Icon';

const baseClassName = 'fi-clear-button';

const clearButtonClassNames = {
  icon: `${baseClassName}_icon`,
};

export interface ClearButtonProps extends HtmlButtonProps {
  /** SelectItem container div class name for custom styling. */
  label: string;
}

class BaseClearButton extends Component<ClearButtonProps & SuomifiThemeProp> {
  render() {
    const { className, label, theme, onClick, ...passProps } = this.props;

    return (
      <HtmlButton
        {...passProps}
        className={classnames(baseClassName, className)}
        onClick={onClick}
      >
        <VisuallyHidden>{label}</VisuallyHidden>
        <Icon
          aria-hidden={true}
          icon="close"
          className={clearButtonClassNames.icon}
        />
      </HtmlButton>
    );
  }
}

const StyledClearButton = styled(BaseClearButton)`
  ${({ theme }) => baseStyles(theme)}
`;

export class ClearButton extends Component<ClearButtonProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledClearButton theme={suomifiTheme} {...this.props} />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
