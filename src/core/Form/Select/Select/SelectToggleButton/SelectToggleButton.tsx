import React, { Component, RefObject } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlButtonProps, HtmlButton, HtmlSpan } from '../../../../../reset';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../../theme';
import { VisuallyHidden } from '../../../../VisuallyHidden/VisuallyHidden';
import { Icon } from '../../../../Icon/Icon';
import { baseStyles } from './SelectToggleButton.baseStyles';

const baseClassName = 'fi-select-toggle-button';

const selectToggleButtonClassNames = {
  button: `${baseClassName}_button`,
  icon: `${baseClassName}_icon`,
};

export interface SelectToggleButtonProps extends HtmlButtonProps {
  open: boolean;
  buttonRef?: RefObject<HTMLButtonElement>;
}

class BaseSelectToggleButton extends Component<
  SelectToggleButtonProps & SuomifiThemeProp
> {
  render() {
    const {
      className,
      label,
      theme,
      open,
      buttonRef,
      onClick,
      ...passProps
    } = this.props;

    return (
      <HtmlSpan className={classnames(baseClassName, className)}>
        <HtmlButton
          forwardedRef={buttonRef}
          {...passProps}
          className={selectToggleButtonClassNames.button}
          onClick={onClick}
        >
          <VisuallyHidden>{label}</VisuallyHidden>
          <Icon
            aria-hidden={true}
            icon={open ? 'arrowheadUp' : 'arrowheadDown'}
            className={selectToggleButtonClassNames.icon}
          />
        </HtmlButton>
      </HtmlSpan>
    );
  }
}

const StyledSelectEmptyItem = styled(BaseSelectToggleButton)`
  ${({ theme }) => baseStyles(theme)}
`;

export class SelectToggleButton extends Component<SelectToggleButtonProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledSelectEmptyItem theme={suomifiTheme} {...this.props} />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
