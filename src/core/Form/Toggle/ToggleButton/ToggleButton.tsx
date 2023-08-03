import React, { Component, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { AutoId } from '../../../utils/AutoId/AutoId';
import { getConditionalAriaProp } from '../../../../utils/aria';
import { Text } from '../../../Text/Text';
import { HtmlSpan, HtmlButtonProps, HtmlButton } from '../../../../reset';
import { ToggleBaseProps, baseClassName } from '../ToggleBase/ToggleBase';
import { ToggleIcon } from '../ToggleBase/ToggleIcon';
import { baseStyles } from './ToggeButton.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../theme';

const toggleClassNames = {
  disabled: `${baseClassName}--disabled`,
  button: `${baseClassName}--button`,
  label: `${baseClassName}_label`,
  iconContainer: `${baseClassName}_icon-container`,
};

export interface ToggleButtonProps
  extends ToggleBaseProps,
    Omit<HtmlButtonProps, 'onClick' | 'type'> {
  /** Callback fired on click */
  onClick?: (checked: boolean) => void;
  /** Ref object is forwarded to the underlying button element. Alternative to React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLButtonElement>;
}
interface ToggleState {
  toggleState: boolean;
}

class BaseToggleButton extends Component<ToggleButtonProps> {
  state: ToggleState = {
    toggleState: !!this.props.checked || !!this.props.defaultChecked,
  };

  static getDerivedStateFromProps(
    nextProps: ToggleBaseProps,
    prevState: ToggleState,
  ) {
    const { checked } = nextProps;
    if (checked !== undefined && checked !== prevState.toggleState) {
      return { toggleState: checked };
    }
    return null;
  }

  handleClick = () => {
    const { checked, onClick } = this.props;
    const { toggleState } = this.state;
    if (checked === undefined) {
      this.setState({ toggleState: !toggleState });
    }
    if (!!onClick) {
      onClick(!toggleState);
    }
  };

  render() {
    const {
      children,
      disabled = false,
      onClick,
      id,
      className,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      checked,
      defaultChecked,
      toggleWrapperProps,
      ...passProps
    } = this.props;

    const { toggleState } = this.state;

    return (
      <HtmlSpan
        className={classnames(
          className,
          baseClassName,
          toggleClassNames.button,
          {
            [toggleClassNames.disabled]: !!disabled,
          },
          toggleClassNames.label,
        )}
        {...toggleWrapperProps}
      >
        <HtmlButton
          {...passProps}
          onClick={this.handleClick}
          aria-pressed={!!toggleState}
          disabled={disabled}
          id={id}
          tabIndex={0}
          {...getConditionalAriaProp('aria-label', [ariaLabel])}
          {...getConditionalAriaProp('aria-labelledby', [ariaLabelledBy])}
        >
          <HtmlSpan className={toggleClassNames.iconContainer}>
            <ToggleIcon disabled={disabled} checked={toggleState} />
          </HtmlSpan>
          <Text color={!!disabled ? 'depthBase' : 'blackBase'}>{children}</Text>
        </HtmlButton>
      </HtmlSpan>
    );
  }
}

const StyledToggleButton = styled(
  (props: ToggleBaseProps & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseToggleButton {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Use for toggling application state.
 * Additional props are passed to the button element.
 */
const ToggleButton = forwardRef(
  (props: ToggleButtonProps, ref: React.RefObject<HTMLButtonElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledToggleButton
                theme={suomifiTheme}
                id={id}
                forwardedRef={ref}
                {...passProps}
              />
            )}
          </AutoId>
        )}
      </SuomifiThemeConsumer>
    );
  },
);

ToggleButton.displayName = 'ToggleButton';
export { ToggleButton };
