import React, { Component, ReactNode } from 'react';
import { styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlButton, HtmlDivProps, HtmlSpan } from '../../../reset';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { ExpanderConsumer, ExpanderTitleBaseProps } from '../Expander/Expander';
import { expanderTitleBaseStyles } from './ExpanderTitle.baseStyles';
import { IconChevronDown } from 'suomifi-icons';
import { HTMLAttributesIncludingDataAttributes } from '../../../utils/common/common';

const baseClassName = 'fi-expander_title';
const titleOpenClassName = `${baseClassName}--open`;
const titleContentClassName = `${baseClassName}-content`;
const titleButtonClassName = `${baseClassName}-button`;
const iconClassName = `${baseClassName}-icon`;
const iconOpenClassName = `${iconClassName}--open`;

export interface ExpanderTitleProps extends Omit<HtmlDivProps, 'className'> {
  /** CSS class for custom styles */
  className?: string;
  /** Title for Expander */
  children?: ReactNode;
  /** Screen reader action label for expander toggle button. E.g. "Additional information".
   * Will be read along with `toggleButtonAriaDescribedBy`. */
  toggleButtonAriaLabel: string;
  /** Expander title id for screen reader reference in expander toggle button.  Will be read along with `toggleButtonAriaLabel`. */
  toggleButtonAriaDescribedBy: string;
  /** Properties for title open/close toggle button */
  toggleButtonProps?: Omit<
    HTMLAttributesIncludingDataAttributes<HTMLButtonElement>,
    | 'onClick'
    | 'onMouseDown'
    | 'onMouseUp'
    | 'onKeyPress'
    | 'onKeyUp'
    | 'onKeyDown'
  >;
}

interface InternalExpanderTitleProps
  extends ExpanderTitleProps,
    ExpanderTitleBaseProps,
    SuomifiThemeProp {}

class BaseExpanderTitle extends Component<InternalExpanderTitleProps> {
  render() {
    const {
      toggleButtonAriaLabel,
      children,
      className,
      theme,
      toggleButtonAriaDescribedBy,
      toggleButtonProps,
      consumer,
      ...passProps
    } = this.props;

    return (
      <HtmlDiv
        {...passProps}
        className={classnames(className, baseClassName, {
          [titleOpenClassName]: !!consumer.open,
        })}
      >
        <HtmlSpan className={titleContentClassName} id={consumer.titleId}>
          {children}
        </HtmlSpan>
        <HtmlButton
          {...toggleButtonProps}
          onClick={consumer.onToggleExpander}
          aria-expanded={!!consumer.open}
          className={titleButtonClassName}
          aria-controls={consumer.contentId}
          aria-describedby={toggleButtonAriaDescribedBy}
        >
          <VisuallyHidden>{toggleButtonAriaLabel}</VisuallyHidden>
          <IconChevronDown
            className={classnames(iconClassName, {
              [iconOpenClassName]: consumer.open,
            })}
          />
        </HtmlButton>
      </HtmlDiv>
    );
  }
}

const StyledExpanderTitle = styled(BaseExpanderTitle)`
  ${({ theme }) => expanderTitleBaseStyles(theme)}
`;

const ExpanderTitle = (props: ExpanderTitleProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <ExpanderConsumer>
        {(consumer) => (
          <StyledExpanderTitle
            theme={suomifiTheme}
            consumer={consumer}
            {...props}
          />
        )}
      </ExpanderConsumer>
    )}
  </SuomifiThemeConsumer>
);

ExpanderTitle.displayName = 'ExpanderTitle';
export { ExpanderTitle };
