import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlDiv, HtmlFieldSet, HtmlLegend } from '../../../reset';
import { Label } from '../Label/Label';
import { HintText } from '../HintText/HintText';
import { CheckboxProps } from './Checkbox';
import { baseStyles } from './CheckboxGroup.baseStyles';
import { AutoId } from '../../utils/AutoId/AutoId';
import classnames from 'classnames';

const baseClassName = 'fi-checkbox-group';
const checkboxGroupClassNames = {
  container: `${baseClassName}_container`,
  labelIsVisible: `${baseClassName}_label--visible`,
};

export interface CheckboxGroupProps {
  /** Custom classname to extend or customize */
  className?: string;
  /** Checkbox or ReactNode */
  children: Array<React.ReactElement<CheckboxProps> | ReactNode>;
  /** Hint text to be displayed under the label. */
  groupHintText?: string;
  /** Label for the group */
  labelText: string;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: 'hidden' | 'visible';
  /** Text to mark a selection in group as optional. Will be wrapped in parentheses and shown after labelText. */
  optionalText?: string;
  /**
   * Unique id
   * If no id is specified, one will be generated
   */
  id?: string;
}

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
      ...passProps
    } = this.props;

    return (
      <HtmlDiv
        className={classnames(baseClassName, className)}
        id={id}
        {...passProps}
      >
        <HtmlFieldSet>
          <HtmlLegend>
            <Label
              htmlFor={id}
              labelMode={labelMode}
              optionalText={optionalText}
              className={classnames({
                [checkboxGroupClassNames.labelIsVisible]:
                  labelMode !== 'hidden',
              })}
            >
              {labelText}
            </Label>
            {groupHintText && <HintText>{groupHintText}</HintText>}
          </HtmlLegend>
          <HtmlDiv className={checkboxGroupClassNames.container}>
            {children}
          </HtmlDiv>
        </HtmlFieldSet>
      </HtmlDiv>
    );
  }
}

const StyledCheckboxGroup = styled(BaseCheckboxGroup)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * Use for grouping Checkboxes.
 */
export class CheckboxGroup extends Component<CheckboxGroupProps> {
  render() {
    const { id: propId, ...passProps } = this.props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledCheckboxGroup
                theme={suomifiTheme}
                id={id}
                {...passProps}
              />
            )}
          </AutoId>
        )}
      </SuomifiThemeConsumer>
    );
  }
}
