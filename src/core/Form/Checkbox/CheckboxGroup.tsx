import React, { Component, ReactNode, forwardRef, ReactElement } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { getConditionalAriaProp } from '../../../utils/aria';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../../theme';
import {
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../../theme/utils/spacing';
import {
  HtmlDiv,
  HtmlDivWithRef,
  HtmlDivWithRefProps,
  HtmlFieldSet,
  HtmlLegend,
} from '../../../reset';
import { InputStatus } from '../types';
import { Label } from '../Label/Label';
import { HintText } from '../HintText/HintText';
import { StatusText } from '../StatusText/StatusText';
import { CheckboxProps } from './Checkbox';
import { baseStyles } from './CheckboxGroup.baseStyles';
import { AutoId } from '../../utils/AutoId/AutoId';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { filterDuplicateKeys } from '../../../utils/common/common';

const baseClassName = 'fi-checkbox-group';
const checkboxGroupClassNames = {
  legend: `${baseClassName}_legend`,
  legendWithMargin: `${baseClassName}_legend--with-margin`,
  labelWithMargin: `${baseClassName}_label--with-margin`,
  container: `${baseClassName}_container`,
  statusTextHasContent: `${baseClassName}_statusText--has-content`,
};

type CheckboxGroupStatus = Exclude<InputStatus, 'success'>;

export interface CheckboxGroupProps extends MarginProps, HtmlDivWithRefProps {
  /** CSS class for custom styles */
  className?: string;
  /** Use Checkbox components as children */
  children: Array<React.ReactElement<CheckboxProps> | ReactNode>;
  /** Hint text to be displayed under the group label */
  groupHintText?: string;
  /** Label for the group */
  labelText: ReactNode;
  /** Hides or shows label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: 'hidden' | 'visible';
  /** Text to indicate a selection in the group as optional. Will be wrapped in parentheses and shown after `labelText`. */
  optionalText?: string;
  /**
   * HTML id attribute
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /**
   * `'default'` | `'error'`
   *
   * Status for the entire group. Will be passed to children. The status of an individual Checkbox overrides the one coming from the group.
   *
   * @default default
   */
  groupStatus?: CheckboxGroupStatus;
  /** Status text to be shown below the group. Use e.g. for validation error messages */
  groupStatusText?: string;
  /** Tooltip component for the group's label */
  tooltipComponent?: ReactElement;
  /** Ref is placed to the outermost div element of the component. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLDivElement>;
}

export interface CheckboxGroupProviderState {
  status?: CheckboxGroupStatus;
}

const defaultProviderValue: CheckboxGroupProviderState = {};

const { Provider, Consumer: CheckboxGroupConsumer } =
  React.createContext(defaultProviderValue);

class BaseCheckboxGroup extends Component<
  CheckboxGroupProps & SuomifiThemeProp
> {
  render() {
    const {
      children,
      className,
      theme,
      labelText,
      labelMode,
      optionalText,
      groupHintText,
      id,
      groupStatus = 'default',
      groupStatusText,
      tooltipComponent,
      style,
      ...rest
    } = this.props;
    const [_marginProps, passProps] = separateMarginProps(rest);

    const statusTextId = !!groupStatusText ? `${id}-statusText` : undefined;

    return (
      <HtmlDivWithRef
        className={classnames(baseClassName, className)}
        id={id}
        {...passProps}
        style={style}
      >
        <HtmlFieldSet>
          <HtmlLegend
            className={classnames(checkboxGroupClassNames.legend, {
              [checkboxGroupClassNames.legendWithMargin]:
                !!groupHintText || labelMode !== 'hidden',
            })}
          >
            <Label
              htmlFor={id}
              labelMode={labelMode}
              optionalText={optionalText}
              className={classnames({
                [checkboxGroupClassNames.labelWithMargin]:
                  groupHintText && labelMode !== 'hidden',
              })}
              tooltipComponent={tooltipComponent}
            >
              {labelText}
            </Label>
            {groupHintText && <HintText>{groupHintText}</HintText>}
            {groupStatusText && (
              <VisuallyHidden
                {...getConditionalAriaProp('aria-labelledby', [statusTextId])}
              />
            )}
          </HtmlLegend>
          <HtmlDiv className={checkboxGroupClassNames.container}>
            <Provider
              value={{
                status: groupStatus,
              }}
            >
              {children}
            </Provider>
          </HtmlDiv>
        </HtmlFieldSet>
        <StatusText
          className={classnames({
            [checkboxGroupClassNames.statusTextHasContent]: !!groupStatusText,
          })}
          id={statusTextId}
          status={groupStatus}
        >
          {groupStatusText}
        </StatusText>
      </HtmlDivWithRef>
    );
  }
}

const StyledCheckboxGroup = styled(
  ({
    globalMargins,
    ...passProps
  }: CheckboxGroupProps & SuomifiThemeProp & GlobalMarginProps) => (
    <BaseCheckboxGroup {...passProps} />
  ),
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.checkboxGroup,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const CheckboxGroup = forwardRef(
  (props: CheckboxGroupProps, ref: React.Ref<HTMLDivElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <AutoId id={propId}>
                {(id) => (
                  <StyledCheckboxGroup
                    theme={suomifiTheme}
                    id={id}
                    globalMargins={margins}
                    forwardedRef={ref}
                    {...passProps}
                  />
                )}
              </AutoId>
            )}
          </SuomifiThemeConsumer>
        )}
      </SpacingConsumer>
    );
  },
);

CheckboxGroup.displayName = 'CheckboxGroup';

export { CheckboxGroup, CheckboxGroupConsumer };
