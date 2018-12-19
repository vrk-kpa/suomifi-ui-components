import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { defaultPropsTheme } from '../utils';
import { IThemeComponent } from '../theme';
import { baseStyles } from './Button.baseStyles';
import {
  default as CompButton,
  IButtonProps as ICompButtonProps,
} from '../../components/Button/Button';
import { IconKeys } from '../theme/icons';
import Icon, { IIconProps } from '../Icon/Icon';

export interface IButtonProps extends ICompButtonProps, IThemeComponent {
  /**
   * Set width to grow all available space
   */
  wide?: boolean;
  /**
   * Icon from suomifi-theme
   */
  icon?: IconKeys;
}

const className = 'fi-button';

const StyledButton = styled(({ theme, wide, ...props }: IButtonProps) => (
  <CompButton {...props} />
))`
  label: ${({ disabled }) => (disabled ? `${className}--disabled` : className)};
  ${props => baseStyles(props)}
`;
const StyledIcon = styled((props: IIconProps) => <Icon {...props} />)`
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
`;

/**
 * Use for inside Application onClick events
 */
export default class Button extends Component<IButtonProps> {
  static defaultProps = defaultPropsTheme(CompButton);

  render() {
    const {
      icon,
      children,
      className: propsClassName,
      ...passProps
    } = this.props;
    const { theme } = passProps;

    const ButtonIcon = () => (
      <Fragment>
        <StyledIcon
          icon={icon}
          color={!!theme ? theme.colors.white : undefined}
        />
        {children}
      </Fragment>
    );

    return (
      <StyledButton
        {...passProps}
        className={classnames(propsClassName, className)}
      >
        {!!icon ? <ButtonIcon /> : children}
      </StyledButton>
    );
  }
}
